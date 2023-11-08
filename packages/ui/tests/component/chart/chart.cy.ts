import Chart, { ChartProps } from "primevue/chart";
import { ChartData } from "chart.js";

const id = "chart"

function mountChart(props : ChartProps) {
  // @ts-ignore
  cy.mount(Chart, {
    props,
    attrs: {
      id: id
    }
  })
}

describe("<Chart />", () => {
  it("Mount", () => {
    // Arrange
    let chartData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Sales',
          data: [540, 325, 702, 620],
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    } as ChartData
    
    // Act
    mountChart({ type: "bar", data: chartData })
    
    // Assert
    cy.get(`#${id}`)
      .should('exist')
      .and('be.visible')
  })
})