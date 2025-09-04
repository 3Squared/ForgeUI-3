import DialogWrapper from "./DialogWrapper.vue";
// @ts-ignore
import { ForgeModalProps } from "../../../src/components/ForgeModal.vue";
import { Size } from "../../../src/types/forge-types.ts";

const modalId = "modal"
const dialog = '[data-pc-name="dialog"]'
const content = '[data-pc-section="content"]'
const maximiseButton = '[data-pc-name="pcmaximizebutton"]'
const closeButton = '[data-pc-name="pcclosebutton"]'

const submitButtonId = "#submit-button"
const cancelButtonId = "#cancel-button"

function mountDialog(props : ForgeModalProps) {
  cy.mount(DialogWrapper, {
    props
  })

  cy.get("#show-modal").click()
}

describe('<Dialog />', () => {
  it('Mounts', () => {
    // Act
    mountDialog({})
    
    // Assert
    cy.get(`#${modalId}`)
      .should('exist')
      .and('be.visible')
  })
  
  it('Greys out background when the modal is open', () => {
    // Arrange
    const expectedBackgroundClass = "modal-open"

    // Act
    mountDialog({})
    
    // Assert
    cy.get(`[data-pc-section="mask"]`)
      .should('be.visible')
      .and('have.class', expectedBackgroundClass)
  })
  
  it("Hides header when showHeader is set to false", () => {
    // Act
    mountDialog({ showHeader: false })

    // Assert
    cy.get(`[data-pc-section="header"]`)
      .should('not.exist')
  })

  it("Displays close icon in the top right corner", () => {
    // Arrange
    const iconClass = "iconify iconify--bi"
    const buttonClass = 'btn'
    const positionClass = 'd-flex ms-auto'
    
    // Act
    mountDialog({ closable: true })

    // Assert
    cy.get(`[data-pc-section="headeractions"]`)
      .should('have.class', positionClass)

    cy.get(closeButton)
      .should('exist')
      .and('be.visible')
      .and('have.class', buttonClass)
    
    cy.get(`[data-cy="close-icon"]`)
      .should('exist')
      .and('be.visible')
      .and('have.class', iconClass)
  })
  
  it("Displays maximisable icon when maximizable prop is true", () => {
    // Arrange
    const iconClass = "iconify iconify--bi"
    const buttonClass = 'btn'
    const positionClass = 'd-flex ms-auto'
    
    // Act
    mountDialog({ maximizable: true })

    // Assert
    cy.get(`[data-pc-section="headeractions"]`)
      .should('have.class', positionClass)
    
    cy.get(maximiseButton)
      .should('exist')
      .and('be.visible')
      .and('have.class', buttonClass)
    
    cy.get(`[data-cy="maximisable-icon"]`)
      .should('exist')
      .and('be.visible')
      .and('have.class', iconClass)
  })
  
  it("Should take up the entire screen when maximised", () => {
    // Arrange
    const fullscreenClass = 'mw-100 vh-100 vw-100 top-0 start-0'
    
    // Act
    mountDialog({ maximizable: true })
    
    cy.get(maximiseButton).click()
    
    // Assert
    cy.get(dialog)
      .should('exist')
      .and('be.visible')
      .and('have.class', fullscreenClass)
  })
  
  it("Content should limit to correct height when maxHeight prop is passed in", () => {
    // Arrange
    const contentClass = 'p-dialog-content modal-body overflow-y-auto mh-50px'
    const maxHeightClass = 'mh-50px'
    
    // Act
    mountDialog({ maxHeight: maxHeightClass })
    
    // Assert
    cy.get(content)
      .should('exist')
      .and('be.visible')
      .and('have.class', contentClass)
  })

  it("Should remove the max height class on content when modal is maximised", () => {
    // Arrange
    const fullscreenClass = 'mw-100 vh-100 vw-100 top-0 start-0'
    const maxHeightClass = 'mh-50px'

    // Act
    mountDialog({ maximizable: true, maxHeight: maxHeightClass })

    cy.get(maximiseButton).click()

    // Assert
    cy.get(dialog)
      .should('exist')
      .and('be.visible')
      .and('have.class', fullscreenClass)
  })


  it('Displays custom title which is passed in via props', () => {
    // Arrange
    const expectedTitle = "Custom Title"

    // Act
    mountDialog({ header: expectedTitle })

    // Assert
    cy.get(`[data-pc-section="title"]`)
      .and('have.text', expectedTitle)
  })
  
  it("Runs the onConfirm function on click of the submit button", () => {
    // Arrange
    const alertMessage = "I am an Alert!"
    const onConfirm = () => { window.alert(alertMessage)}

    // Act
    mountDialog({ onConfirm: onConfirm })
    cy.get(submitButtonId).click()

    // Assert
    cy.on("window:alert", (str) => {
      return expect(str).to.equal(alertMessage)
    })
  })
  
  describe("Errors", () => {
    const errorMessage = "I am an Error!";

    beforeEach(() => {
      const onConfirm = () => {
        throw new Error(errorMessage);
      };
      mountDialog({ onConfirm });
      cy.get(submitButtonId).click();
    });

    it("Displays an error alert if onConfirm throws an error", () => {
      cy.get('[data-cy="error"]')
        .should("exist")
        .and("be.visible")
        .and("contain.text", errorMessage);
    });

    it("Sets error to be sticky", () => {
      cy.get('[data-cy="error-wrapper"]').should(
        "have.class",
        "sticky-top py-3 error-bg"
      );
    });
  });

    describe("Hide Errors", () => {
    const errorMessage = "I am an Error!";

    beforeEach(() => {
      const onConfirm = () => {
        throw new Error(errorMessage);
      };
      mountDialog({ onConfirm, hideErrorBanner: true });
      cy.get(submitButtonId).click();
    });

    it("Hides Error alert if onConfirm throws an error and hideErrorBanner is true", () => {
      cy.get('[data-cy="error"]')
        .should("not.exist");
    });
  });

  it("Shows loading spinner whilst waiting for the function to complete", () => {
    // Arrange
    const onConfirm = () => new Promise((resolve) => setTimeout(resolve, 10000))

    // Act
    mountDialog({ onConfirm: onConfirm })
    cy.get(submitButtonId).click()

    // Assert
    cy.get(`[data-cy="loader"]`)
      .should('exist')
      .and('be.visible')
  })

  it("Closes modal on click of the cancel button", () => {
    // Arrange
    const onConfirm = () => {
      window.alert("I am an Alert!")
    }

    // Act
    mountDialog({ onConfirm: onConfirm })
    cy.get(cancelButtonId).click()

    // Assert
    cy.get(`#${modalId}`)
      .should('not.exist')
  })

  it("Updates cancel button text when passed in as a prop", () => {
    // Arrange
    const cancelButtonText = "Custom Cancel"
    const onConfirm = () => {
      window.alert("I am an Alert!")
    }

    // Act
    mountDialog({ onConfirm: onConfirm, cancelText: cancelButtonText })
    
    // Assert
    cy.get(cancelButtonId)
      .should('contain.text', cancelButtonText)
  })

  it("Updates cancel button text when passed in as a prop", () => {
    // Arrange
    const submitButtonText = "Custom Submit"
    const onConfirm = () => {
      window.alert("I am an Alert!")
    }

    // Act
    mountDialog({ onConfirm: onConfirm, submitText: submitButtonText })

    // Assert
    cy.get(submitButtonId)
      .should('contain.text', submitButtonText)
  })
  
  it('Hides footer when showFooter is false', () => {
    // Arrange
    const onConfirm = () => {
      window.alert("I am an Alert!")
    }

    // Act
    mountDialog({ onConfirm: onConfirm, showFooter: false })

    // Assert
    cy.get(`[data-cy="footer"]`)
      .should('not.exist')
  })
  
  describe("Sizes", () => {
    ;[
      { title: "Should show medium sized modal when size is undefined", size: undefined, expectedClass: "modal" },
      { title: "Should show medium sized modal when size is md", size: "md", expectedClass: "modal" },
      { title: "Should show small sized modal when size is sm", size: "sm", expectedClass: "modal-sm"},
      { title: "Should show large sized modal when size is lg", size: "lg", expectedClass: "modal-lg" },
      { title: "Should show extra large sized modal when size is xl", size: "xl", expectedClass: "modal-xl" },
    ].forEach(({ title, size, expectedClass}) => {
      it(title, () => {
        // Act
        mountDialog({ size: size as Size | 'xl' })
        
        // Assert
        cy.get(`#${modalId}`)
          .should('exist')
          .and('have.class', expectedClass)
      })
    })
  })
})