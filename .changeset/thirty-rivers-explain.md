---
"@3squared/forge-ui-3": major
"forge-ui-3-styleguide": minor
---

Update FileUploader so that:
- Accepted file types appear in an overlay instead of inline.
- File types can be configured with custom labels.

**BREAKING CHANGE MIGRATION GUIDE**

File Uploaders `acceptedFileTypes` prop will now be required to use the custom `ForgeFileType` interface provided by the import `@3squared/forge-ui-3/src/types/forge-types.ts`. 

In order to fix the breaking change, you will simply have to update your accepted file type array to use the interface. For example:

`['image/jpeg'] -> [{ fileType: 'image/jpeg' }] as ForgeFileType[]`