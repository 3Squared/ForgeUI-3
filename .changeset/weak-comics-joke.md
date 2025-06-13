---
"@3squared/forge-ui-3": patch
---

Fix issue with file upload size being validated against the number of allowed files to upload when using the file input button.

Add the extra prop for the file size to be added to the Upload button and passed into the addFiles method to validate the file size correctly.
