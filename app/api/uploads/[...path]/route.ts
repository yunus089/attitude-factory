import { readFile } from "node:fs/promises";
import path from "node:path";

import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/src/lib/auth";
import { isAuthEnforced } from "@/src/lib/auth-guard";
import { resolveUploadFilePath, uploadRoot } from "@/src/lib/upload-storage";

export async function GET(
  _request: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  if (isAuthEnforced()) {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) {
      return new NextResponse("Nicht angemeldet.", { status: 401 });
    }
  }

  const params = await context.params;
  const relativePath = params.path.join("/");

  try {
    const filePath = resolveUploadFilePath(uploadRoot(), relativePath);
    const file = await readFile(filePath);

    return new NextResponse(file, {
      headers: {
        "Content-Type": mimeTypeForPath(relativePath),
        "Cache-Control": "private, max-age=60"
      }
    });
  } catch {
    return new NextResponse("Datei nicht gefunden.", { status: 404 });
  }
}

function mimeTypeForPath(filePath: string) {
  switch (path.extname(filePath).toLowerCase()) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    case ".mp4":
      return "video/mp4";
    case ".mov":
      return "video/quicktime";
    default:
      return "application/octet-stream";
  }
}
