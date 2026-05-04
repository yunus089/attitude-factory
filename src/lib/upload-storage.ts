import path from "node:path";

export function uploadRoot() {
  const configuredRoot = process.env.UPLOAD_ROOT;

  if (configuredRoot) {
    return path.resolve(configuredRoot);
  }

  return path.join(process.cwd(), "uploads");
}

export function resolveUploadFilePath(root: string, relativePath: string) {
  const normalizedRelativePath = relativePath.replace(/\\/g, "/").replace(/^\/+/, "");
  const resolvedRoot = path.resolve(root);
  const resolvedPath = path.resolve(resolvedRoot, normalizedRelativePath);
  const relativeFromRoot = path.relative(resolvedRoot, resolvedPath);

  if (relativeFromRoot.startsWith("..") || path.isAbsolute(relativeFromRoot)) {
    throw new Error("Upload-Pfad verlaesst den erlaubten Speicherbereich.");
  }

  return resolvedPath;
}

export function uploadPublicUrlFor(relativePath: string) {
  const normalizedRelativePath = relativePath.replace(/\\/g, "/").replace(/^\/+/, "");
  return `/api/uploads/${normalizedRelativePath}`;
}
