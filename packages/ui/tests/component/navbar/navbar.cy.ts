// @ts-ignore
import ForgeNavbar, { ForgeNavbarProps } from "@/components/ForgeNavbar.vue";

function mountNavbar(props : ForgeNavbarProps) {
  cy.mount(ForgeNavbar, {
    props
  })
}

describe("<ForgeNavbar />", () => {
  it("Mounts", () => {
    // Arrange
    const items = [
      { label: "Link 1" },
      { label: "Link 2", disabled: true },
      { label: "Link 3", items: [ { label: "Sublink 1" }] }
    ]
    
    mountNavbar({ model: items })
  })
})