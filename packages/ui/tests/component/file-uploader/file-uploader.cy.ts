import ForgeFileUploader, { ForgeFileUploaderProps } from "../../../src/components/file-uploader/ForgeFileUploader.vue";

const fileUploaderId = '[data-cy="file-uploader"]'
const fileUploaderInputId = '#file-input'
const fileUploaderButtonId = '#file-input-button'
const dragDropAreaId = '#drag-drop-area'
const fileInfoId = '[data-cy="file-info-testFile.json"]'
const fileEarmarkId = '#file-earmark'
const thumbnailImageId = '#thumbnail-image'
const previewIcon = '[data-pc-section="previewicon"]'
const previewContainer = '[data-pc-section="originalcontainer"]'
const fileTypeId = '#file-type'
const fileSizeId = '#file-size'
const maxFileSizeId = '#max-file-size'
const maxFileInputId = '#max-file-input'
const acceptedFileTypesId = '#accepted-file-types'
const dragDropAreaPlaceholderId = '#placeholder-message'
const editableFileNameInputId = '#edit-file-name'
const inlineEditorInputId = '[data-cy="input"]'
const deleteButtonId = '#delete-button'
const uploadStatusAlertId = '#upload-status-alert'
const acceptedFileTypesOverlay = '#accepted-file-types-overlay'

function mountFileUploader(props : ForgeFileUploaderProps) {
  cy.mount(ForgeFileUploader, {
    props
  })
}

describe("<ForgeFileUploader />", () => {
  it("Mounts", () => {
    // Arrange
    const acceptedFileTypes = [{ fileType: 'image/jpeg' }]
    const maxFileSize = 5420000
    
    // Act
    mountFileUploader({ 
      acceptedFileTypes: acceptedFileTypes, 
      getFileUrlAction: (fileName: string): Promise<[string, string]> => Promise.resolve([fileName, 'sdfsd']), 
      maxFileSize: maxFileSize
    })
    
    // Assert
    cy.get(fileUploaderId)
  })
  
  describe("Interactions", () => {
    it("Should show placeholder text if there are no files uploaded", () => {
      // Arrange
      const acceptedFileTypes = [{ fileType: 'application/json' }]
      const maxFileSize = 5420000
      const placeholder = 'Drag and drop files here'

      // Act
      mountFileUploader({
        acceptedFileTypes: acceptedFileTypes,
        getFileUrlAction: (fileName: string): Promise<[string, string]> => Promise.resolve([fileName, 'sdfsd']),
        maxFileSize: maxFileSize
      })
      
      // Assert
      cy.get(dragDropAreaPlaceholderId)
        .should('exist')
        .and('be.visible')
        .and('contain.text', placeholder)
    });

    it("Should upload a file when uploading using the button", () => {
      // Arrange
      const acceptedFileTypes = [ { fileType: 'application/json' }]
      const maxFileSize = 5420000
      const fileLocation = 'cypress/fixtures/testFile.json'
      const fileName = 'testFile.json'

      // Act
      mountFileUploader({
        acceptedFileTypes: acceptedFileTypes,
        getFileUrlAction: (fileName: string): Promise<[string, string]> => Promise.resolve([fileName, 'sdfsd']),
        maxFileSize: maxFileSize
      })

      cy.get(fileUploaderInputId).selectFile(fileLocation, { force: true})

      // Assert
      cy.get(fileInfoId)
        .should('exist')
        .and('be.visible')
        .and("contain.text", fileName)
    })

    it('Should upload a file by dragging and dropping it into the Drag Drop area', () => {
      // Arrange
      const acceptedFileTypes = [{ fileType: 'application/json' }]
      const maxFileSize = 5420000
      const fileLocation = 'cypress/fixtures/testFile.json'
      const fileName = 'testFile.json'

      // Act
      mountFileUploader({
        acceptedFileTypes: acceptedFileTypes,
        getFileUrlAction: (fileName: string): Promise<[string, string]> => Promise.resolve([fileName, 'sdfsd']),
        maxFileSize: maxFileSize
      })

      cy.get(dragDropAreaId).selectFile(fileLocation, { action: 'drag-drop' })

      // Assert
      cy.get(fileInfoId)
        .should('exist')
        .and('be.visible')
        .and("contain.text", fileName)
    });

    it('Should delete a file on click on the trash icon', () => {
      // Arrange
      const acceptedFileTypes = [{ fileType: 'application/json' }]
      const maxFileSize = 5420000
      const fileLocation = 'cypress/fixtures/testFile.json'

      // Act
      mountFileUploader({
        acceptedFileTypes: acceptedFileTypes,
        getFileUrlAction: (fileName: string): Promise<[string, string]> => Promise.resolve([fileName, 'sdfsd']),
        maxFileSize: maxFileSize
      })

      cy.get(dragDropAreaId).selectFile(fileLocation, { action: 'drag-drop' })

      cy.get(fileInfoId)
        .should('exist')
        .and('be.visible')
      
      cy.get(deleteButtonId).click()
      
      // Assert
      cy.get(dragDropAreaPlaceholderId)
        .should('exist')
        .and('be.visible')
    });
  })
  
  describe("File Info", () => {
    it("Should display file-earmark icon if the file isn't an image", () => {
      // Arrange
      const acceptedFileTypes = [{ fileType: 'application/json' }]
      const maxFileSize = 5420000
      const fileLocation = 'cypress/fixtures/testFile.json'

      // Act
      mountFileUploader({
        acceptedFileTypes: acceptedFileTypes,
        getFileUrlAction: (fileName: string): Promise<[string, string]> => Promise.resolve([fileName, 'sdfsd']),
        maxFileSize: maxFileSize
      })

      cy.get(dragDropAreaId).selectFile(fileLocation, { action: 'drag-drop' })

      // Assert
      cy.get(fileEarmarkId)
        .should('exist')
        .and('be.visible')

      cy.get(thumbnailImageId)
        .should('not.exist')
    });

    it(`Should display json next to the File Type heading`, () => {
      // Arrange
      const acceptedFileTypes = [{ fileType: 'application/json' }]
      const expectedFileType = 'json'
      const maxFileSize = 5420000
      const fileLocation = 'cypress/fixtures/testFile.json'

      // Act
      mountFileUploader({
        acceptedFileTypes: acceptedFileTypes,
        getFileUrlAction: (fileName: string): Promise<[string, string]> => Promise.resolve([fileName, 'sdfsd']),
        maxFileSize: maxFileSize
      })

      cy.get(dragDropAreaId).selectFile(fileLocation, { action: 'drag-drop' })

      // Assert
      cy.get(fileTypeId)
        .should('exist')
        .and('be.visible')
        .and('contain.text', expectedFileType)
    })
    
    it("Should display file size next to File Size heading", () => {
      // Arrange
      const acceptedFileTypes = [{ fileType: 'application/json' }]
      const maxFileSize = 5420000
      const fileLocation = 'cypress/fixtures/testFile.json'

      // Act
      mountFileUploader({
        acceptedFileTypes: acceptedFileTypes,
        getFileUrlAction: (fileName: string): Promise<[string, string]> => Promise.resolve([fileName, 'sdfsd']),
        maxFileSize: maxFileSize
      })

      cy.get(dragDropAreaId).selectFile(fileLocation, { action: 'drag-drop' })

      // Assert
      cy.get(fileSizeId)
        .should('exist')
        .and('be.visible')
        .and('not.be.empty')
    })

    ;[
      { fileType: 'jpeg' },
      { fileType: 'png' },
      { fileType: 'gif' }
    ].forEach(({ fileType }) => {
      it(`Should display thumbnail image if file type is a ${fileType}`, () => {
        // Arrange
        const acceptedFileTypes = [{ fileType: `image/${fileType}` }]
        const maxFileSize = 5420000
        const fileLocation = `cypress/fixtures/3squaredLogo.${fileType}`

        // Act
        mountFileUploader({
          acceptedFileTypes: acceptedFileTypes,
          getFileUrlAction: (fileName: string): Promise<[string, string]> => Promise.resolve([fileName, 'sdfsd']),
          maxFileSize: maxFileSize
        })

        cy.get(dragDropAreaId).selectFile(fileLocation, { action: 'drag-drop' })

        // Assert
        cy.get(thumbnailImageId)
          .should('exist')
          .and('be.visible')

        cy.get(fileEarmarkId)
          .should('not.exist')
      })

      it(`Should display image preview when clicking on the thumbnail image if file type is a ${fileType}`, () => {
        // Arrange
        const acceptedFileTypes = [{ fileType: `image/${fileType}` }]
        const maxFileSize = 5420000
        const fileLocation = `cypress/fixtures/3squaredLogo.${fileType}`

        // Act
        mountFileUploader({
          acceptedFileTypes: acceptedFileTypes,
          getFileUrlAction: (fileName: string): Promise<[string, string]> => Promise.resolve([fileName, 'sdfsd']),
          maxFileSize: maxFileSize
        })

        cy.get(dragDropAreaId).selectFile(fileLocation, { action: 'drag-drop' })

        cy.get(previewIcon)
          .click()

        // Assert
        cy.get(previewContainer)
          .should('exist')
          .and('be.visible')
      });
    })
  })
  
  describe('Props', () => {
    it("Should display the maximum file size", () => {
      // Arrange
      const acceptedFileTypes = [{ fileType: 'application/json' }]
      const maxFileSize = 5420000
      const parsedFileSize = '5.4 MB'
      
      // Act
      mountFileUploader({
        acceptedFileTypes: acceptedFileTypes,
        getFileUrlAction: (fileName: string): Promise<[string, string]> => Promise.resolve([fileName, 'sdfsd']),
        maxFileSize: maxFileSize
      })
      
      // Assert
      cy.get(maxFileSizeId)
        .should('exist')
        .and('be.visible')
        .and('contain.text', parsedFileSize)
    })
    
    it("Should display the maximum file count", () => {
      // Arrange
      const acceptedFileTypes = [{ fileType: 'application/json' }]
      const maxFileInput = 4
      const maxFileSize = 5420000
      
      // Act
      mountFileUploader({
        acceptedFileTypes: acceptedFileTypes,
        getFileUrlAction: (fileName: string): Promise<[string, string]> => Promise.resolve([fileName, 'sdfsd']),
        maxFileSize: maxFileSize,
        maxFileInput: maxFileInput
      })
      
      // Assert
      cy.get(maxFileInputId)
        .should('exist')
        .and('be.visible')
        .and('contain.text', maxFileInput)
    })
    
    it("Should stop accepting files if number of uploaded files is greater than maxFileInput", () => {
      // Arrange
      const acceptedFileTypes = [{ fileType: 'application/json' }]
      const maxFileSize = 5420000
      const maxFileInput = 1
      const file1Location = 'cypress/fixtures/testFile.json'
      const file2Location = 'cypress/fixtures/3squaredLogo.png'
      const file2InfoId = '#file-info-3squaredLogo.png'
      
      // Act
      mountFileUploader({
        acceptedFileTypes: acceptedFileTypes,
        getFileUrlAction: (fileName: string): Promise<[string, string]> => Promise.resolve([fileName, 'sdfsd']),
        maxFileSize: maxFileSize,
        maxFileInput: maxFileInput
      })

      cy.get(dragDropAreaId).selectFile(file1Location, { action: 'drag-drop' })

      cy.get(dragDropAreaId).selectFile(file2Location, { action: 'drag-drop' })

      // Assert
      cy.get(fileInfoId)
        .should('exist')
        .and('be.visible')
      
      cy.get(file2InfoId)
        .should('not.exist')
      
      cy.get(fileUploaderButtonId)
        .should('have.class', 'disabled')
    })
    
    it("Should display a list of accepted file types and prioritise custom labels", () => {
      // Arrange
      const acceptedFileTypes = [ { fileType: 'application/json', label: "JSON" }, { fileType: 'image/jpeg' }]
      const maxFileSize = 5420000
      const parsedFileTypes = 'JSON, jpeg'

      // Act
      mountFileUploader({
        acceptedFileTypes: acceptedFileTypes,
        getFileUrlAction: (fileName: string): Promise<[string, string]> => Promise.resolve([fileName, 'sdfsd']),
        maxFileSize: maxFileSize
      })
      
      // Assert
      cy.get(acceptedFileTypesId)
        .click()
        
      cy.get(acceptedFileTypesOverlay)
        .should('exist')
        .and('be.visible')
        .and('contain.text', parsedFileTypes)
    })
    
    it("Should only display the upload button if showDragDropArea is false", () => {
      // Arrange
      const acceptedFileTypes = [{ fileType: 'application/json', label: "JSON" }, { fileType: 'image/jpeg' }]
      const maxFileSize = 5420000

      // Act
      mountFileUploader({
        acceptedFileTypes: acceptedFileTypes,
        getFileUrlAction: (fileName: string): Promise<[string, string]> => Promise.resolve([fileName, 'sdfsd']),
        maxFileSize: maxFileSize,
        showDragDropArea: false
      })

      // Assert
      cy.get(fileUploaderButtonId)
        .should('exist')
        .and('be.visible')
      
      cy.get(acceptedFileTypesId)
        .should('not.exist')
      
      cy.get(maxFileSizeId)
        .should('not.exist')
      
      cy.get(dragDropAreaId)
        .should('not.exist')
    })
    
    it("Should allow for a file name to be updated if editableFileName is true", () => {
      // Arrange
      const acceptedFileTypes = [{ fileType: 'application/json', label: "JSON" }, { fileType: 'image/jpeg' }]
      const maxFileSize = 5420000
      const fileLocation = 'cypress/fixtures/testFile.json'
      const expectedFileName = 'newFileName.json'

      // Act
      mountFileUploader({
        acceptedFileTypes: acceptedFileTypes,
        getFileUrlAction: (fileName: string): Promise<[string, string]> => Promise.resolve([fileName, 'sdfsd']),
        maxFileSize: maxFileSize,
        editableFileName: true
      })
      cy.get(dragDropAreaId).selectFile(fileLocation, { action: 'drag-drop' })

      // Assert
      cy.get(editableFileNameInputId)
        .should('exist')
        .and('be.visible')

      cy.get(editableFileNameInputId)
        .click()
      
      cy.get(inlineEditorInputId)
        .clear()
        .type(`${expectedFileName}{enter}`)
      
      cy.get(editableFileNameInputId)
        .should('contain.text', expectedFileName)
    })
  })
  
  describe("Validation", () => {
    ;[
      { title: 'Should show error message if FileSize is greater than the maxFileSize', fileLocation: 'cypress/fixtures/testFile.json', expectedErrorMessage: `Upload Failed: File size exceeds the 1 B limit.`, expectedSeverity: 'alert-danger'},
      { title: "Should show error message if file's type isn't included in the array of accepted file types", fileLocation: 'cypress/fixtures/3squaredLogo.png', expectedErrorMessage: `Upload Failed: File type is not accepted.`, expectedSeverity: 'alert-danger' },
    ].forEach(({ title, fileLocation, expectedErrorMessage, expectedSeverity}) => {
      it(title, () => {
        // Arrange
        const acceptedFileTypes = [{ fileType: 'application/json' }]
        const maxFileSize = 1

        // Act
        mountFileUploader({
          acceptedFileTypes: acceptedFileTypes,
          getFileUrlAction: (fileName: string): Promise<[string, string]> => Promise.resolve([fileName, 'sdfsd']),
          maxFileSize: maxFileSize
        })

        cy.get(dragDropAreaId).selectFile(fileLocation, { action: 'drag-drop' })

        // Assert
        cy.get(uploadStatusAlertId)
          .should('exist')
          .and('be.visible')
          .and('contain.text', expectedErrorMessage)

        cy.get(`${uploadStatusAlertId} > [data-pc-section="root"]`)
          .should('have.class', expectedSeverity)
      });
    })
  })
})