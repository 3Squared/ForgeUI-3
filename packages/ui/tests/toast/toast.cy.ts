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
});
