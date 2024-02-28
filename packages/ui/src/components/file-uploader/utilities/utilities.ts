import { ForgeFileStatus } from "../../../types/forge-types";
import { BlockBlobClient } from "@azure/storage-blob";

export type FileUploadStatus =
  "Not Uploaded"
  | "Preparing"
  | "Uploading"
  | "Uploaded"
  | "Failed"
  | "Aborted"
  | "Duplicate"
  | "DeleteFileFailed"
  | "InvalidFileType"
  | "InvalidFileSize";
export function addFiles(filesToUpload: File[], files : ForgeFileStatus[], acceptedFileTypes: string[], maxFileSize: number) {
  
  // Get local version of the currently uploaded files.
  const uploadedFiles = files.flatMap(fileStatus => fileStatus.file)

  // Reset all the duplicate warnings.
  files = files.map(file => ({ ...file, status: file.status == 'Duplicate' ? 'Not Uploaded' : file.status }))
  
  // Add any new files to Files array
  filesToUpload.forEach((file) => {
    const fileIndex = uploadedFiles.findIndex(uploadedFile => uploadedFile.name === file.name)
    let status: FileUploadStatus = 'Not Uploaded'
    if (fileIndex === -1) {
      if (!acceptedFileTypes.includes(file.type) || !(file.size <= maxFileSize)) {
        status = !acceptedFileTypes.includes(file.type) ? 'InvalidFileType' : 'InvalidFileSize'
      }
      
      files.unshift({
        file: file,
        status: status,
        blobFileName: null
      })
    } else {
      files[fileIndex].status = 'Duplicate';
    }
  })
  
  return files
}

export async function deleteFile(uploadStatus : FileUploadStatus, blobUploadUrl : string) {
  if (uploadStatus === 'Uploaded') {
    if (blobUploadUrl !== null) {
      try {
        const blockBlobClient = new BlockBlobClient(blobUploadUrl)
        await blockBlobClient.delete()
      } catch (exception) {
        if (exception !== 'BlobNotFound') {
          uploadStatus = 'DeleteFileFailed'
          return;
        }
      }
    }
  }
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
  return ['image/gif', 'image/png', 'image/jpeg', 'image/svg'].includes(mimeType)
}

export function getThumbnailUrl(file: File) {
  return URL.createObjectURL(file)
}

