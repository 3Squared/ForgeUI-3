import Fieldset, {FieldsetProps} from "primevue/fieldset";
import FieldsetWrapper from "./fieldsetWrapper.vue";

const fieldsetId = "fieldset";
const fieldsetRoot = '[data-pc-section="root"]'
const fieldsetLegend = '[data-pc-section="legend"]'

function mountFieldset(props: FieldsetProps) {
  //@ts-ignore
  cy.mount(Fieldset, {
    props: {
      id: fieldsetId,
      ...props
    }
  });
}

function mountFieldsetWrapper(props: FieldsetProps) {
  //@ts-ignore
  cy.mount(FieldsetWrapper, {
    props: {
      id: fieldsetId,
      ...props
    }
  });
}

describe("<Fieldset />", () => {
  it("Mounts", () => {
    // Act
    mountFieldsetWrapper({});

    // Assert
    cy.get(`#${fieldsetId}`).should("exist").and("be.visible");
  });
  
  it("Displays content", () => {
    // Act
    mountFieldsetWrapper({});

    // Assert
    cy.get(`#${fieldsetId}`).should("exist").and("contain.text", " Here is some content!");
  });

  it("Have classes to make it look like a fieldset", () => {
    // Arrange
    const expectedRootClasses = "border rounded p-2 w-100";  
    const expectedLegendClasses = "float-none w-auto px-2 mb-0 fw-semibold fs-6 fieldset-legend";

    // Act
    mountFieldset({ });
    
    // Assert
    cy.get(fieldsetRoot).should("exist").and("have.class", expectedRootClasses);
    cy.get(fieldsetLegend).should("exist").and("have.class", expectedLegendClasses);
  });
  
  it("Should show legend", () => {
    // Arrange
    const legend = "Fieldset legend";

    // Act
    mountFieldset({ legend: legend});
    
    // Assert
    cy.get('[data-pc-section="legendtitle"]')
      .should("exist")
      .and("contain.text", legend);
  });
});
