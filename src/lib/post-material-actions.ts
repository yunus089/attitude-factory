"use server";

import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

import type { AssetStatus, AssetType, ContentStatus } from "@prisma/client";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import {
  buildPostMaterialStoragePath,
  isPostMaterialAssetStatus,
  isPostMaterialAssetType,
  nextContentStatusAfterPostMaterialUpload,
  validatePostMaterialUpload
} from "@/src/domain/post-material-upload";
import { auth } from "@/src/lib/auth";
import { isAuthEnforced } from "@/src/lib/auth-guard";
import { prisma } from "@/src/lib/prisma";
import { resolveUploadFilePath, uploadRoot } from "@/src/lib/upload-storage";

export type PostMaterialUploadState = {
  status: "idle" | "success" | "error";
  message: string | null;
};

export async function uploadPostMaterialAsset(
  _previousState: PostMaterialUploadState,
  formData: FormData
): Promise<PostMaterialUploadState> {
  if (!(await hasActiveSession())) {
    return {
      status: "error",
      message: "Bitte neu anmelden."
    };
  }

  const contentItemId = stringField(formData, "contentItemId");
  const assetType = stringField(formData, "assetType");
  const assetStatus = stringField(formData, "assetStatus");
  const notes = optionalStringField(formData, "notes");
  const file = formData.get("file");

  if (!contentItemId) {
    return { status: "error", message: "Content-Slot fehlt." };
  }

  if (!isPostMaterialAssetType(assetType)) {
    return { status: "error", message: "Materialtyp ist ungueltig." };
  }

  if (!isPostMaterialAssetStatus(assetStatus)) {
    return { status: "error", message: "Materialstatus ist ungueltig." };
  }

  if (!isUploadedFile(file)) {
    return { status: "error", message: "Bitte eine Datei auswaehlen." };
  }

  const validation = validatePostMaterialUpload({
    assetType,
    mimeType: file.type,
    byteSize: file.size
  });

  if (!validation.ok) {
    return { status: "error", message: validation.error };
  }

  const contentItem = await prisma.contentItem.findUnique({
    where: { id: contentItemId },
    select: {
      id: true,
      personaId: true,
      status: true
    }
  });

  if (!contentItem) {
    return { status: "error", message: "Content-Slot wurde nicht gefunden." };
  }

  const relativePath = buildPostMaterialStoragePath({
    contentItemId: contentItem.id,
    fileId: randomUUID(),
    mimeType: file.type,
    originalFilename: file.name
  });
  const absolutePath = resolveUploadFilePath(uploadRoot(), relativePath);

  try {
    await mkdir(path.dirname(absolutePath), { recursive: true });
    await writeFile(absolutePath, Buffer.from(await file.arrayBuffer()));

    await prisma.$transaction([
      prisma.assetFile.create({
        data: {
          personaId: contentItem.personaId,
          contentItemId: contentItem.id,
          assetType: assetType as AssetType,
          sourceTool: "Operator OS Upload",
          storagePath: relativePath,
          originalFilename: file.name,
          mimeType: file.type,
          byteSize: file.size,
          status: assetStatus as AssetStatus,
          notes
        }
      }),
      prisma.contentItem.update({
        where: { id: contentItem.id },
        data: {
          status: nextContentStatusAfterPostMaterialUpload(
            contentItem.status as ContentStatus,
            assetStatus
          ) as ContentStatus
        }
      })
    ]);
  } catch (error) {
    await unlink(absolutePath).catch(() => undefined);
    console.error("Postmaterial-Upload fehlgeschlagen", error);

    return {
      status: "error",
      message: "Speichern fehlgeschlagen. Pruefe Datei und Datenbank."
    };
  }

  revalidatePath("/content-produktion");
  revalidatePath("/medien");

  return {
    status: "success",
    message: "Postmaterial gespeichert."
  };
}

async function hasActiveSession() {
  if (!isAuthEnforced()) {
    return true;
  }

  const session = await auth.api.getSession({
    headers: await headers()
  });

  return Boolean(session);
}

function stringField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function optionalStringField(formData: FormData, key: string) {
  const value = stringField(formData, key).trim();
  return value.length > 0 ? value : null;
}

function isUploadedFile(value: FormDataEntryValue | null): value is File {
  return (
    typeof value === "object" &&
    value !== null &&
    "arrayBuffer" in value &&
    "size" in value &&
    "type" in value &&
    "name" in value
  );
}
