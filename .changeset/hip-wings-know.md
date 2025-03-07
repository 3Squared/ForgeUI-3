---
"@3squared/forge-ui-3": minor
"forge-ui-3-styleguide": minor
---

Changes:
- Add `inLine` version of  `ForgeLoader`: a smaller version so it can for showing the uploading status of each file in the file uploader.
- `ForgeFileUploader`:
  - Fix functionality to stop file upload
  - Stop files from uploading again if new files are added
- Make severity optional for `ForgeTile`