import HelloWorld from "./HelloWorld.vue";

describe('<HelloWorld />', () => {
  it("Mounts", () => {
    cy.mount(HelloWorld)
  })
})