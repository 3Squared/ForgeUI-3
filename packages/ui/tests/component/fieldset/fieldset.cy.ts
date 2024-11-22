import Fieldset, {FieldsetProps} from "primevue/fieldset";

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

describe("<Fieldset />", () => {
  it("Mounts", () => {
    // Act
    mountFieldset({});

    // Assert
    cy.get(`#${fieldsetId}`).should("exist").and("be.visible");
  });

  it("Have classes to make it look like a fieldset", () => {
    // Arrange
    const expectedRootClasses = "border rounded p-2 w-100";  
    const expectedLegendClasses = "float-none w-auto px-2 mb-0 fw-semibold fs-6 fieldset-legend";

    // Act
    mountFieldset({ });
    
    // Assert
    cy.get(fieldsetRoot).and("have.class", expectedRootClasses);
    cy.get(fieldsetLegend).and("have.class", expectedLegendClasses);
  });
  
  it("Should show legend", () => {
    // Arrange
    const legend = "Fieldset legend";

    // Act
    mountFieldset({ legend: legend});
    
    // Assert
    cy.get('[data-pc-section="legendtitle"]').and("contain.text", legend);
  });
});
