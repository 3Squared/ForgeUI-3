import { ForgeFileStatus } from "../../../types/forge-types";

export function addFiles(filesToUpload: File[], files : ForgeFileStatus[]) {
  // Get local version of the currently uploaded files.
  const uploadedFiles = files.flatMap(fileStatus => fileStatus.file)

  // Reset all the duplicate warnings.
  files = files.map(file => ({ ...file, duplicateWarning: false }))

  // Add any new files to Files array
  filesToUpload.forEach((file) => {
    const fileIndex = uploadedFiles.findIndex(uploadedFile => uploadedFile === file)
    if (fileIndex === -1) {
      files.unshift({
        file: file,
        status: "NotUploaded",
        blobFileName: null,
        duplicateWarning: false,
        customFileName: null
      })
    } else {
      files[fileIndex].duplicateWarning = true;
    }
  })
  
  return files
}

export function formatFileSize(bytes: number, si = true, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = si ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"] : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

  return bytes.toFixed(dp) + " " + units[u];
}

export function isImage(mimeType: string): boolean {
  return ['image/gif', 'image/png', 'image/jpeg'].includes(mimeType)
}

export function getThumbnailUrl(file: File) {
  return URL.createObjectURL(file)
}

