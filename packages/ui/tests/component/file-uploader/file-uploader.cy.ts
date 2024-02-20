import ForgeFileUploader, { ForgeFileUploaderProps } from "../../../src/components/file-uploader/ForgeFileUploader.vue";

const fileUploaderId = '[data-cy="file-uploader"]'

function mountFileUploader(props : ForgeFileUploaderProps) {
  cy.mount(ForgeFileUploader, {
    props
  })
}

describe("<ForgeFileUploader />", () => {
  it("Mounts", () => {
    // Act
    mountFileUploader({ acceptedFileTypes: ['.jpg'], getFileUrlAction: () => {}, maxFileSize: 5420000})
    
    // Assert
    cy.get(fileUploaderId)
  })
})