// @ts-ignore
import ToastWrapper, { ToastWrapperProps } from "./ToastWrapper.vue";

const containerId = '[data-pc-section="container"]'

describe("<Toast />", () => {
  function mountToast(props: ToastWrapperProps) {
    return cy.mount(ToastWrapper, {
      props
    });
  }

  it("Shows a success toast", () => {
    // Act
    mountToast({
      message: "Hello World",
      severity: "success",
    });

    // Assert
    cy.get(`button`).click();

    cy.get('[data-pc-name="toast"]')
      .should("exist")
      .and("be.visible")
      .and("have.text", "Hello World");

    cy.get('[data-pc-section="icon"]')
      .should("exist")
      .and("be.visible")
      .and("have.class", "text-success");
  });

  it("Shows an error toast", () => {
    // Act
    mountToast({
      message: "Goodbye World",
      severity: "error",
    });

    // Assert
    cy.get(`button`).click();

    cy.get('[data-pc-name="toast"]')
      .should("exist")
      .and("be.visible")
      .and("have.text", "Goodbye World");

    cy.get('[data-pc-section="icon"]')
      .should("exist")
      .and("be.visible")
      .and("have.class", "text-danger");
  });

  it("Shows an warning toast", () => {
    // Act
    mountToast({
      message: "Warning World",
      severity: "warn",
    });

    // Assert
    cy.get(`button`).click();

    cy.get('[data-pc-name="toast"]')
      .should("exist")
      .and("be.visible")
      .and("have.text", "Warning World");
    
    cy.get('[data-pc-section="icon"]')
      .should("exist")
      .and("be.visible")
      .and("have.class", "text-warning");
  });
  
  it("Shows an info toast", () => {
    // Act
    mountToast({
      message: "Info World",
      severity: "info",
    });

    // Assert
    cy.get(`button`).click();

    cy.get('[data-pc-name="toast"]')
      .should("exist")
      .and("be.visible")
      .and("have.text", "Info World");
    
    cy.get('[data-pc-section="icon"]')
      .should("exist")
      .and("be.visible")
      .and("have.class", "text-primary");
  });

  it("Wraps text when message content is too long", () => {
    // Arrange
    const message = "I am a really really really really long string that will have to wrap in a toast notification!"
    const expectedClasses = "overflow-hidden text-break"
    
    // Act
    mountToast({ severity: "info", message })

    cy.get(`button`).click();

    // Assert
    cy.get(containerId)
      .should("have.class", expectedClasses)
  })
});
