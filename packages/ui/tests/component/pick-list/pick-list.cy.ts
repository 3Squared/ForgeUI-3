import ForgePickList, { ForgePickListProps } from "@/components/ForgePickList.vue";
import { should } from "vitest";

const options = [
  { name: 'Germany', code: 'DE' },
  { name: 'Brazil', code: 'BR' },
  { name: 'Australia', code: 'AU' },
  { name: 'China', code: 'CN' }
];

const targetList = [
  { name: 'Norway', code: 'NOR' },
  { name: 'United Kingdom', code: 'GBR' }
];

function mountPickList(props: ForgePickListProps) {
  return cy.mount(ForgePickList, {
    props
  })
}

describe("<ForgePickList />", () => {
  it("Displays source and target headers in a heading", () => {
    // Act
    mountPickList({       
      options,
      filterBy: 'name',
      sourceTitle: 'Available',
      targetTitle: 'Selected',
      modelValue: [options, []],
    })
    
    // Assert
    cy.contains('Available').should('exist');
    cy.contains('Selected').should('exist');
  })

  it('Displays all source items initially', () => {
    mountPickList({
      filterBy: 'name',
      sourceTitle: 'Available',
      targetTitle: 'Selected',
      modelValue: [options, []],
    })
    
    options.forEach(opt => {
      cy.contains(opt.name).should('exist');
    });
  });
  
  it('Displays all preselected target items initially', () => {
    mountPickList({
      filterBy: 'name',
      sourceTitle: 'Available',
      targetTitle: 'Selected',
      modelValue: [options, targetList],
    })

    targetList.forEach(opt => {
      cy.contains(opt.name).should('exist');
    });
  });


  it('Shows target and source filters', () => {
    mountPickList({
      filterBy: 'name',
      modelValue: [options, []],
    })
    
    cy.get('[data-cy="source-search"]').should('exist').and('be.visible');
    cy.get('[data-cy="target-search"]').should('exist').and('be.visible');
  });  
})
