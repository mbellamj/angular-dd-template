export function getValidFiles(fileList?: FileList | null) {
  if (!fileList || (fileList?.length ?? 0) <= 0) return [];

  return Array.from(fileList);
}
