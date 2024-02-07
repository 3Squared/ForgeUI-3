
import { ForgeColumn } from "../../../src/types/forge-types";
//@ts-ignore
import TableWrapper, { TableWrapperProps } from './TableWrapper.vue'
import { FilterMatchMode } from "primevue/api";

function mountTable(props : TableWrapperProps) {
  cy.mount(TableWrapper, {
    props
  })
}

const tableId = '[data-cy="table"]'
const tableRowId = '[data-pc-section="bodyrow"]'
const footerId = '[data-pc-section="footer"]'
const filterId = '[data-pc-section="filterinput"]'
const filterMenuId = '[data-pc-section="filtermenuicon"]'
const filterMenuItemsId = '[data-pc-section="filterrowitems"]'
const dropdownFilterLabelId = '[data-pc-section="item"]'
const datePickerDayLabelId = '[data-pc-section="daylabel"]'


const aboveTableSlotId = '[data-cy="above-table-slot"]'

const column3Date = new Date()

const columns = [
  { header: "Column 1", field: 'column1' },
  { header: "Column 2", field: 'column2', dataType: 'numeric' },
  { header: "Column 3", field: 'column3', dataType: 'date' },
  { header: "Column 4", field: 'column4', dataType: 'select' },
  { header: "Column 5", field: 'column5', dataType: 'multiselect' },

] as ForgeColumn[]

const items = [
  { column1: "column 1", column2: 2, column3: new Date(), column4: 'Column 4', column5: 'Column 4' },
  { column1: "column i", column2: 3, column3: new Date(column3Date.setDate(column3Date.getDate() + 1)), column4: 'Column Four', column5: 'Column Four' },
  { column1: "column one", column2: 4, column3: new Date(column3Date.setDate(column3Date.getDate() + 3)), column4: 'column iiii', column5: 'Column iiii' },
]

describe('<ForgeTable />', () => {
  it("Mounts", () => {
    // Act
    mountTable({ tableProps: { value: items }, columns: columns })
    
    // Assert
    cy.get(tableId)
      .should('exist')
      .and('be.visible')
  })
  
  describe('Slots', () => {
    it("Displays content above the table when passed into the 'above-table' slot", () => {
      // Arrange
      const content = "I'm above the table!"

      // Act
      mountTable({ tableProps: { value: items }, columns: columns, aboveTableContent: content })

      // Assert
      cy.get(aboveTableSlotId)
        .should('exist')
        .and('be.visible')
        .and('contain.text', content)
    })
    it("Displays content in a pre-defined slot", () => {
      // Arrange
      const content = "I'm in the footer!"

      // Act
      mountTable({ tableProps: { value: items }, columns: columns, footerContent: content })

      // Assert
      cy.get(footerId)
        .should('exist')
        .and('be.visible')
        .and('contain.text', content)
    })
  })
  
  describe("Filters", () => {
    const filters = {
      column1: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      column2: { value: null, matchMode: FilterMatchMode.EQUALS },
      column3: { value: null, matchMode: FilterMatchMode.DATE_IS },
      column4: { value: null, matchMode: FilterMatchMode.EQUALS },
      column5: { value: null, matchMode: FilterMatchMode.IN }
    }
    
    it('Displays filters', () => {
      // Act
      mountTable({ tableProps: { value: items, filters: filters }, columns: columns })

      // Assert
      cy.get(filterId).should('be.visible').and('have.length', 5)
    })
    
    ;[
      { columnIndex: 0, expectedMatchMode: 'Starts with', dataType: null },
      { columnIndex: 0, expectedMatchMode: 'Starts with', dataType: 'text' },
      { columnIndex: 1, expectedMatchMode: 'Equals', dataType: 'numeric' },
      { columnIndex: 2, expectedMatchMode: 'Date is', dataType: 'date' },
    ].forEach(({ columnIndex, expectedMatchMode, dataType}) => {
      it(`Displays the match mode menu when data type is ${dataType}`, () => {
        // Act
        mountTable({ tableProps: { value: items, filters: filters }, columns: columns })

        // Assert
        cy.get(filterId).eq(columnIndex).should('be.visible')
        
        cy.get(filterMenuId).eq(columnIndex).click()
        cy.get(`${filterMenuItemsId} > .active`).should('have.text', expectedMatchMode)
      });
    })
    
    ;[
      { columnIndex: 3, dataType: 'select' },
      { columnIndex: 4, dataType: 'multiselect' }
    ].forEach(({ columnIndex, dataType }) => {
      it(`Hides the match mode meny when data type is ${dataType}`, () => {
        // Act
        mountTable({ tableProps: { value: items, filters: filters }, columns: columns })

        // Assert
        cy.get(filterId).eq(columnIndex).should('be.visible')
        cy.get(filterMenuId).eq(columnIndex).should('not.be.visible')
      })
    })
    
    
    it("Filters out rows based on string value", () => {
      // Arrange
      const filter = 'column 1'
      
      // Act
      mountTable({ tableProps: { value: items, filters: filters }, columns: columns })
      cy.get(filterId).eq(0).type(filter)
      
      // Assert
      cy.get(tableRowId).should('contain.text', filter).and('have.length', 1)
    })
    
    it("Filters out rows based on numerical value", () => {
      // Arrange
      const filter = 2

      // Act
      mountTable({ tableProps: { value: items, filters: filters }, columns: columns })
      cy.get(filterId).eq(1).type(filter.toString())

      // Assert
      cy.get(tableRowId).should('contain.text', filter).and('have.length', 1)
    })

    it('Filters out rows based on date value', () => {
      // Act
      mountTable({ tableProps: { value: items, filters: filters }, columns: columns })
      cy.get(filterId).eq(2).click()
      cy.get(datePickerDayLabelId).contains(new RegExp('^' + column3Date.getDate() + '$')).click()

      // Assert
      cy.get(tableRowId).should('contain.text', column3Date).and('have.length', 1)
    });
    
    it('Filters out rows based on singular selection', () => {
      // Arrange
      const filter = 'Column 4'
      
      // Act
      mountTable({ tableProps: { value: items, filters: filters }, columns: columns })
      cy.get(filterId).eq(3).click()
      cy.contains(dropdownFilterLabelId, filter).click()

      // Assert
      cy.get(tableRowId).should('contain.text', filter).and('have.length', 1)
    })

    it('Filters out rows based on multiple selection', () => {
      // Arrange
      const filter = ['Column 4', 'Column Four']

      // Act
      mountTable({ tableProps: { value: items, filters: filters }, columns: columns })

      cy.get(filterId).eq(4).click()
      
      filter.forEach((option) => {
        cy.contains(dropdownFilterLabelId, option).click()
      })
      
      // Assert
      cy.get(tableRowId)
        .should('have.length', 2)
        .and('contain.text', filter[0])
        .and('contain.text', filter[1])
    })
  })
})
