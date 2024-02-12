
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
const datatableId = '[data-pc-section="table"]'
const tableRowId = '[data-pc-section="bodyrow"]'
const footerId = '[data-pc-section="footer"]'
const loadingSpinnerId = '[data-pc-section="loadingoverlay"]'

//Filter
const filterId = '[data-pc-section="filterinput"]'
const filterMenuId = '[data-pc-section="filtermenuicon"]'
const filterMenuItemsId = '[data-pc-section="filterrowitems"]'
const dropdownFilterLabelId = '[data-pc-section="item"]'
const datePickerDayLabelId = '[data-pc-section="daylabel"]'
const clearAllButtonId = '[data-cy="clear-all"]'

// Pagination Header
const paginationHeaderId = '[data-cy="pagination-header"]'
const totalId = '[data-cy="total"]'
const exporterId = '[data-cy="exporter"]'

// Pagination Footer
const legacyPageSizeId = '[data-cy="legacy-page-size"]'
const legacyTotalId = '[data-cy="legacy-total"]'

const aboveTableSlotId = '[data-cy="above-table-slot"]'

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
  { column1: "column", column2: 5, column3: new Date(new Date().setDate(new Date().getDate() + 3)), column4: 'column', column5: 'Column' },
  { column1: "column", column2: 5, column3: new Date(new Date().setDate(new Date().getDate() + 3)), column4: 'column', column5: 'Column' },
  { column1: "column", column2: 5, column3: new Date(new Date().setDate(new Date().getDate() + 3)), column4: 'column', column5: 'Column' },
  { column1: "column", column2: 5, column3: new Date(new Date().setDate(new Date().getDate() + 3)), column4: 'column', column5: 'Column' },
  { column1: "column", column2: 5, column3: new Date(new Date().setDate(new Date().getDate() + 3)), column4: 'column', column5: 'Column' },
  { column1: "column", column2: 5, column3: new Date(new Date().setDate(new Date().getDate() + 3)), column4: 'column', column5: 'Column' },
  { column1: "column", column2: 5, column3: new Date(new Date().setDate(new Date().getDate() + 3)), column4: 'column', column5: 'Column' },
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
    it("Should export a csv of the table when the 'Export' button is clicked", () => {
      //Act
      mountTable({ tableProps: { value: items, showExporter: true }, columns: columns })
      cy.get(exporterId).click()

      //Assert
      cy.readFile('cypress\\Downloads\\download.csv').should('exist')
    })

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
      // Act
      cy.get(filterId).eq(2).click()
      cy.get(datePickerDayLabelId).contains(new RegExp('^' + new Date().getDate() + '$')).click()

      // Assert
      cy.get(tableRowId).should('contain.text', new Date().getDate()).and('have.length', 1)
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

      // Act
      cy.get(filterId).eq(0).type(stringFilter)

      cy.get(filterId).eq(1).type(`${numericFilter.toString()}{enter}`)

      cy.get(filterId).eq(2).click()
      cy.get(datePickerDayLabelId).contains(new RegExp('^' + new Date().getDate() + '$')).click()

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
