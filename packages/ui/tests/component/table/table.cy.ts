
import { ForgeColumn } from "../../../src/types/forge-types";
//@ts-ignore
import TableWrapper, { TableWrapperProps } from './TableWrapper.vue'
import { FilterMatchMode } from "@primevue/core/api";

function mountTable(props : TableWrapperProps) {
  cy.mount(TableWrapper, {
    props
  })
}

const tableId = '[data-cy="table"]'
const datatableId = '[data-pc-section="table"]'
const tableRowId = '[data-pc-section="bodyrow"]'
const footerId = '[data-pc-section="footer"]'
const loadingSpinnerId = '[data-pc-section="mask"]'

//Filter
const filterId = '[data-pc-section="filterelementcontainer"]'
const filterMenuId = '[data-pc-section="filtermenuicon"]'
const filterMenuItemsId = '[data-pc-section="filterconstraintlist"]'
const dropdownFilterLabelId = '[data-pc-section="option"]'
const datePickerDayLabelId = '[data-pc-section="day"]'
const clearAllButtonId = '[data-cy="clear-all"]'

// Pagination Header
const paginationHeaderId = '[data-cy="pagination-header"]'
const totalId = '[data-cy="total"]'

// Pagination Footer
const legacyPageSizeId = '[data-cy="legacy-page-size"]'
const legacyTotalId = '[data-cy="legacy-total"]'

const aboveTableSlotId = '[data-cy="above-table-slot"]'
const emptyTableSlotId = '[data-cy="empty-message"]'

const columns = [
  { header: "Column 1", field: 'column1' },
  { header: "Column 2", field: 'column2', dataType: 'numeric' },
  { header: "Column 3", field: 'column3', dataType: 'date' },
  { header: "Column 4", field: 'column4', dataType: 'select' },
  { header: "Column 5", field: 'column5', dataType: 'multiselect' },

] as ForgeColumn[]

const items = [
  { column1: "column 1", column2: 2, column3: new Date(), column4: 'Column 4', column5: 'Column 4' },
  { column1: "column i", column2: 3, column3: new Date(new Date().setDate(new Date().getDate() + 1)), column4: 'Column Four', column5: 'Column Four' },
  { column1: "column one", column2: 4, column3: new Date(new Date().setDate(new Date().getDate() + 2)), column4: 'column iiii', column5: 'Column iiii' },
  { column1: "column", column2: 5, column3: new Date(new Date().setDate(new Date().getDate() + 4)), column4: 'column', column5: 'Column' },
  { column1: "column", column2: 5, column3: new Date(new Date().setDate(new Date().getDate() + 4)), column4: 'column', column5: 'Column' },
  { column1: "column", column2: 5, column3: new Date(new Date().setDate(new Date().getDate() + 4)), column4: 'column', column5: 'Column' },
  { column1: "column", column2: 5, column3: new Date(new Date().setDate(new Date().getDate() + 4)), column4: 'column', column5: 'Column' },
  { column1: "column", column2: 5, column3: new Date(new Date().setDate(new Date().getDate() + 4)), column4: 'column', column5: 'Column' },
  { column1: "column", column2: 5, column3: new Date(new Date().setDate(new Date().getDate() + 4)), column4: 'column', column5: 'Column' },
  { column1: "column", column2: 5, column3: new Date(new Date().setDate(new Date().getDate() + 4)), column4: 'column', column5: 'Column' },
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
  
  describe('Header Pagination', () => {
    it("Should show total number of items if specified", () => {
      // Arrange
      const total = 10

      // Act
      mountTable({ tableProps: { value: items, total: total }, columns: columns })

      // Assert
      cy.get(totalId)
        .should('exist')
        .and('be.visible')
        .and('contain.text', total)
    })
    
    it("Should display the total number of items in the array if the total prop isn't specified", () => {
      // Act
      mountTable({ tableProps: { value: items }, columns: columns })

      // Assert
      cy.get(totalId)
        .should('exist')
        .and('be.visible')
        .and('contain.text', items.length)
    })
  })
  
  describe('Legacy Pagination', () => {
    it("Should show total number of items if specified in the legacy footer", () => {
      // Arrange
      const total = 10

      // Act
      mountTable({ tableProps: { value: items, total: total, legacyPaginationFooter: true }, columns: columns })

      // Assert
      cy.get(legacyTotalId)
        .should('exist')
        .and('be.visible')
        .and('contain.text', total)
    })

    it("Should display the total number of items in the array in the legacy footer if the total prop isn't specified", () => {
      // Act
      mountTable({ tableProps: { value: items, legacyPaginationFooter: true }, columns: columns })

      // Assert
      cy.get(legacyTotalId)
        .should('exist')
        .and('be.visible')
        .and('contain.text', items.length)
    })
  })
  
  describe('Global Buttons', () => {
    it('Should show legacy pagination in the footer when "legacyPaginationFooter" is true', () => {
      //Act
      mountTable({ tableProps: { value: items, legacyPaginationFooter: true }, columns: columns })

      //Assert
      cy.get(legacyTotalId).should('exist').and('be.visible')
      cy.get(legacyPageSizeId).should('exist').and('be.visible')
      cy.get(paginationHeaderId).should('not.exist')
    });
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
    
    it("Displays a default empty slot if empty message prop isn't defined or the slot isn't defined", () => {
      // Arrange
      const expectedContent = "No items Found."

      // Act
      mountTable({ tableProps: { value: [] }, columns: columns })

      // Assert
      cy.get(emptyTableSlotId)
        .should('exist')
        .and('be.visible')
        .and('contain.text', expectedContent)
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

  it('Should display custom empty message if table has no items and the empty message prop is passed', () => {
    // Arrange
    const expectedContent = "Empty!."

    // Act
    mountTable({ tableProps: { value: [], emptyMessage: expectedContent }, columns: columns })

    // Assert
    cy.get(emptyTableSlotId)
      .should('exist')
      .and('be.visible')
      .and('contain.text', expectedContent)
  });

  describe("Filters", () => {
    beforeEach(() => {
      const filters = {
        column1: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        column2: { value: null, matchMode: FilterMatchMode.EQUALS },
        column3: { value: null, matchMode: FilterMatchMode.DATE_IS },
        column4: { value: null, matchMode: FilterMatchMode.EQUALS },
        column5: { value: null, matchMode: FilterMatchMode.IN }
      }
      
      mountTable({ tableProps: { value: items, filters: filters, showClearButton: true }, columns: columns })
    })
    
    
    
    it('Displays filters', () => {
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
      it(`Hides the match mode menu when data type is ${dataType}`, () => {
        // Assert
        cy.get(filterId).eq(columnIndex).should('be.visible')
        cy.get(filterMenuId).eq(columnIndex).should('not.be.visible')
      })
    })
    
    
    it("Filters out rows based on string value", () => {
      // Arrange
      const filter = 'column 1'
      
      // Act
      cy.get(filterId).eq(0).type(filter)
      
      // Assert
      cy.get(tableRowId).should('contain.text', filter).and('have.length', 1)
    })
    
    it("Filters out rows based on numerical value", () => {
      // Arrange
      const filter = 2

      // Act
      cy.get(filterId).eq(1).type(`${filter.toString()}{enter}`)

      // Assert
      cy.get(tableRowId).should('contain.text', filter).and('have.length', 1)
    })

    it('Filters out rows based on date value', () => {
      // Arrange
      const expectedDate = new Date().getDate();
      
      // Act
      cy.get(filterId).eq(2).click()
      cy.get(datePickerDayLabelId).not(".disabled").contains(expectedDate).click()

      // Assert
      cy.get(tableRowId).should('contain.text', expectedDate).and('have.length', 1)
    });
    
    it('Filters out rows based on singular selection', () => {
      // Arrange
      const filter = 'Column 4'
      
      // Act
      cy.get(filterId).eq(3).click()
      cy.contains(dropdownFilterLabelId, filter).click()

      // Assert
      cy.get(tableRowId).should('contain.text', filter).and('have.length', 1)
    })

    it('Filters out rows based on multiple selection', () => {
      // Arrange
      const filter = ['Column 4', 'Column Four']

      // Act
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
    
    it('Clears all filters when the "Clear" button is clicked', () => {
      // Arrange
      const stringFilter = "Column 4"
      const numericFilter = "3"
      const multiselectFilter = ['Column 4', 'Column Four']
      const dateToSelect = "19"

      // Act
      cy.get(filterId).eq(0).type(stringFilter)

      cy.get(filterId).eq(1).type(`${numericFilter.toString()}{enter}`)

      cy.get(filterId).eq(2).click()
      cy.get(datePickerDayLabelId).not(".disabled").contains(dateToSelect).click()

      cy.get(filterId).eq(3).click()
      cy.contains(dropdownFilterLabelId, stringFilter).click()
      
      cy.get(filterId).eq(4).click()
      multiselectFilter.forEach((option) => {
        cy.contains(dropdownFilterLabelId, option).click()
      })
      
      cy.get(clearAllButtonId).click()
      
      // Assert
      cy.get(filterId).eq(0).should('contain.text', '')
      cy.get(filterId).eq(1).should('contain.text', '')
      cy.get(filterId).eq(2).should('contain.text', '')
      cy.get(filterId).eq(3).should('contain.text', '')
      cy.get(filterId).eq(4).should('contain.text', '')
    })
  })
  
  describe("Styling", () => {
    describe("Datatable", () => {

      ;[
        { title: "Shouldn't add ForgeTable class when severity is undefined", severity: undefined, expectedClass: 'forge-table' },
        { title: "Should add forge-table-primary class when severity is primary", severity: "primary", expectedClass: "forge-table-primary" },
        { title: "Should add forge-table-brand class when severity is brand", severity: "brand", expectedClass: "forge-table-brand" },
        { title: "Should add forge-table-secondary class when severity is secondary", severity: "secondary", expectedClass: "forge-table-secondary" },
        { title: "Should add forge-table-success class when severity is success", severity: "success", expectedClass: "forge-table-success" },
        { title: "Should add forge-table-warning class when severity is warning", severity: "warning", expectedClass: "forge-table-warning" },
        { title: "Should add forge-table-danger class when severity is danger", severity: "danger", expectedClass: "forge-table-danger" },
        { title: "Should add forge-table-info class when severity is info", severity: "info", expectedClass: "forge-table-info" },
      ].forEach(({ title, expectedClass, severity }) => {
        it(title, () => {
          // Act
          mountTable({ tableProps: { value: items, severity: severity }, columns: columns })
          
          // Asset
          if(!severity) {
            cy.get(tableId).should("not.have.class", expectedClass)
          } else {
            cy.get(tableId).should("have.class", expectedClass)
          }
        })
      })
      
      ;[
        { title: "Should display a striped table when stripedRows is true", props: { stripedRows: true }, expectedClass: "table-striped" },
        { title: "Should show hover state when rowHover is true", props: { rowHover: true }, expectedClass: "table-hover" },
        { title: "Should display table borders when showGridlines is true", props: { showGridlines: true }, expectedClass: "table-bordered" },
        { title: "Should display small table when size equals small", props: { size: "small" }, expectedClass: "table-sm" },
        { title: "Should display large table when size equals large", props: { size: "large" }, expectedClass: "table-lg" },
        { title: "Should set opacity to 50% when the table is in a loading state", props: { loading: true }, expectedClass: "opacity-50" },
      ].forEach(({ title, props, expectedClass }) => {
        it(title, () => {
          // Act
          mountTable({ tableProps: { value: items, ...props }, columns: columns })

          // Assert
          cy.get(datatableId).should('have.class', expectedClass)
        })
      })
    })

    describe("Loading", () => {
      it("Should display loading spinner when loading is true", () => {
        // Arrange
        const loading = true
        const expectedClasses = "table-overlay table-spinner"
        
        // Act
        mountTable({ tableProps: { value: items, loading: loading }, columns: columns })
        
        // Assert
        cy.get(loadingSpinnerId).should('have.class', expectedClasses)
      })
    })
  })
})
