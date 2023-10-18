import ToastWrapper, { ToastWrapperProps } from "./ToastWrapper.vue";
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
      .and("have.text", " Hello World");

    cy.get(".iconify")
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
      .and("have.text", " Goodbye World");
    cy.get(".iconify")
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
      .and("have.text", " Warning World");
    cy.get(".iconify")
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
      .and("have.text", " Info World");
    cy.get(".iconify")
      .should("exist")
      .and("be.visible")
      .and("have.class", "text-info");
  });
});
