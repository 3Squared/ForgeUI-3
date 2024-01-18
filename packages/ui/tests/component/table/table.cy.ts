// @ts-ignore
import TableWrapper, { TableWrapperProps } from "./TableWrapper.vue";

function mountTable(dataTableProps : TableWrapperProps) {
  cy.mount(TableWrapper, {
    props: {
      ...dataTableProps
    },
  })
}

describe('<TabView />', () => {
  it("Mounts", () => {
    // Arrange

    // Act
    mountTable({ dataTableProps: { size: 'large'}, columnProps: {} })
  
    // Assert
  })
})