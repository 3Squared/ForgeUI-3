import ForgeLink, { ForgeLinkProps, LinkOpacity, Target, UnderlineOffset } from "../../../src/components/ForgeLink.vue";
import { Severity } from "../../../src/types/forge-types.ts";

const linkId = "#link"
const linkIconId = '#link-icon'

const url = "IAMAURL"
const label = "Click Me!"

function mountLink(props : ForgeLinkProps) {
  //@ts-ignore
  cy.mount(ForgeLink, {
    props
  })
}

describe("<ForgeLink />", () => {
  it("Mounts", () => {
    // Arrange
    const tag = "A"
    const expectedClass = 'link-primary'
    
    // Act
    mountLink({ label, url })
    
    // Assert
    cy.get(linkId)
      .should("exist")
      .and("be.visible")
      .and("have.class", expectedClass)
      .and('have.prop', 'tagName')
      .should('eq', tag)
  })
  
  describe("Severity", () => {
    ;[
      { severity: undefined },
      { severity: "primary" },
      { severity: "secondary" },
      { severity: "success" },
      { severity: "warning" },
      { severity: "danger" },
      { severity: "info" },
    ].forEach(({ severity }) => {
      
      it(`Displays ${ severity ?? 'primary' } link when severity is ${ severity }`, () => {
        // Arrange
        const expectedClass = `link-${ severity ?? 'primary' }`

        // Act
        mountLink({ label, url, severity: severity as Severity })

        // Assert
        cy.get(linkId)
          .should("exist")
          .and("be.visible")
          .and("have.class", expectedClass)
      })
      
      if(severity !== undefined) {
        it(`Displays ${severity ?? 'primary'} underline when underlineSeverity is ${severity}`, () => {
          // Arrange
          const linkSeverity = severity === 'primary' ? 'secondary' : 'primary'
          const expectedClass = `link-underline-${severity ?? 'primary'}`

          // Act
          mountLink({ label, url, severity: linkSeverity, underlineSeverity: severity as Severity })

          // Assert
          cy.get(linkId)
            .should("exist")
            .and("be.visible")
            .and("have.class", expectedClass)
        })
      }
      
    })
  })
  
  describe("Opacity", () => {
    ;[
      { opacity: '10' },
      { opacity: '25' },
      { opacity: '50' },
      { opacity: '75' },
      { opacity: '100' }
    ].forEach(({ opacity }) => {
      
      it(`Displays link at ${opacity}% opacity when opacity is ${opacity}`, () => {
        // Arrange
        const expectedClass = `link-opacity-${opacity} link-underline-opacity-${opacity}`

        // Act
        mountLink({ label, url, opacity: opacity as LinkOpacity })

        // Assert
        cy.get(linkId)
          .should("exist")
          .and("be.visible")
          .and("have.class", expectedClass)
      })
      
      it(`Displays link at ${opacity}% opacity on hover when hoverOpacity is ${opacity}`, () => {
        // Arrange
        const expectedClass = `link-opacity-${opacity}-hover link-underline-opacity-${opacity}-hover`

        // Act
        mountLink({ label, url, hoverOpacity: opacity as LinkOpacity })

        // Assert
        cy.get(linkId)
          .should("exist")
          .and("be.visible")
          .and("have.class", expectedClass)
      })
      
      it(`Displays link underline at ${opacity}% opacity when underlineOpacity is ${opacity}`, () => {
        // Arrange
        const expectedClass = `link-underline-opacity-${opacity}`

        // Act
        mountLink({ label, url, underlineOpacity: opacity as LinkOpacity })

        // Assert
        cy.get(linkId)
          .should("exist")
          .and("be.visible")
          .and("have.class", expectedClass)
      })

      it(`Displays link underline at ${opacity}% opacity on hover when underlineHoverOpacity is ${opacity}`, () => {
        // Arrange
        const expectedClass = `link-underline-opacity-${opacity}-hover`

        // Act
        mountLink({ label, url, underlineHoverOpacity: opacity as LinkOpacity })

        // Assert
        cy.get(linkId)
          .should("exist")
          .and("be.visible")
          .and("have.class", expectedClass)
      });
    })

    it(`Displays link underline at 0% opacity when underlineOpacity is 0`, () => {
      // Arrange
      const opacity = '0'
      const expectedClass = `link-underline-opacity-${opacity}`

      // Act
      mountLink({ label, url, underlineOpacity: opacity as LinkOpacity })

      // Assert
      cy.get(linkId)
        .should("exist")
        .and("be.visible")
        .and("have.class", expectedClass)
    })
    
    it("Displays link and underline at different opacities when opacity and underlineOpacity are defined", () => {
      // Arrange
      const linkOpacity = '25'
      const underlineOpacity = '75'
      const expectedClass = `link-opacity-${linkOpacity} link-underline-opacity-${underlineOpacity}`

      // Act
      mountLink({ label, url, opacity: linkOpacity, underlineOpacity: underlineOpacity })

      // Assert
      cy.get(linkId)
        .should("exist")
        .and("be.visible")
        .and("have.class", expectedClass)
    })

    it("Displays link hover and underline hover at different opacities when hoverOpacity and underlineHoverOpacity are defined", () => {
      // Arrange
      const linkOpacity = '25'
      const underlineOpacity = '75'
      const expectedClass = `link-opacity-${linkOpacity}-hover link-underline-opacity-${underlineOpacity}-hover`

      // Act
      mountLink({ label, url, hoverOpacity: linkOpacity, underlineHoverOpacity: underlineOpacity })

      // Assert
      cy.get(linkId)
        .should("exist")
        .and("be.visible")
        .and("have.class", expectedClass)
    })
  })
  
  describe("Offset", () => {
    ;[
      { offset: '1', textUnderlineOffset: '2px' },
      { offset: '2', textUnderlineOffset: '4px' },
      { offset: '3', textUnderlineOffset: '6px' }
    ].forEach(({ offset, textUnderlineOffset }) => {
      it(`Displays underline offset at ${textUnderlineOffset} when underlineOffset is ${offset}`, () => {
        // Arrange
        const cssName = `text-underline-offset`

        // Act
        mountLink({ label, url, underlineOffset: offset as UnderlineOffset })

        // Assert
        cy.get(linkId)
          .should("exist")
          .and("be.visible")
          .and("have.css", cssName, textUnderlineOffset)
      })
    })
    
    it("Displays no underline offset when underlineOffset is undefined", () => {
      // Arrange
      const expectedOffset = 'auto'
      const cssName = `text-underline-offset`

      // Act
      mountLink({ label, url })

      // Assert
      cy.get(linkId)
        .should("exist")
        .and("be.visible")
        .and("have.css", cssName, expectedOffset)
    })
  })
  
  describe("Icon", () => {
    it("Displays Icon when IconName is not undefined", () => {
      // Arrange
      const iconName = "bi:arrow-right"
      const expectedClass = 'iconify iconify--bi'

      // Act
      mountLink({ label, url, iconName })

      // Assert
      cy.get(linkIconId)
        .should("exist")
        .and("be.visible")
        .and("have.class", expectedClass)
    })
    
    it("Animates icon when animateIconOnHover is true", () => {
      // Arrange
      const iconName = "bi:arrow-right"
      const expectedClass = 'icon-link icon-link-hover'

      // Act
      mountLink({ label, url, iconName, animateIconOnHover: true })

      // Assert
      cy.get(linkId)
        .should("exist")
        .and("be.visible")
        .and("have.class", expectedClass)
    })

    it("Displays Icon after the label when positionIconEnd is true", () => {
      // Arrange
      const iconName = "bi:arrow-right"
      const expectedClass = 'order-2'

      // Act
      mountLink({ label, url, iconName, positionIconEnd: true })

      // Assert
      cy.get(linkIconId)
        .should("exist")
        .and("be.visible")
        .and("have.class", expectedClass)
    });
    
    describe("Margin", () => {
      it("Adds margin to the end of icon when positionIconEnd and animateIconOnHover are false", () => {
        // Arrange
        const iconName = "bi:arrow-right"
        const expectedClass = 'me-1'

        // Act
        mountLink({ label, url, iconName })

        // Assert
        cy.get(linkIconId)
          .should("exist")
          .and("be.visible")
          .and("have.class", expectedClass)
      })

      it("Adds margin to the start of icon when positionIconEnd is true and animateIconOnHover is false", () => {
        // Arrange
        const iconName = "bi:arrow-right"
        const expectedClass = 'ms-1'

        // Act
        mountLink({ label, url, iconName, positionIconEnd: true })

        // Assert
        cy.get(linkIconId)
          .should("exist")
          .and("be.visible")
          .and("have.class", expectedClass)
      })

      it("Adds no margin to the start of the icon when positionIconEnd and animateIconOnHover are true", () => {
        // Arrange
        const iconName = "bi:arrow-right"
        const expectedClass = 'ms-0'

        // Act
        mountLink({ label, url, iconName, positionIconEnd: true, animateIconOnHover: true })

        // Assert
        cy.get(linkIconId)
          .should("exist")
          .and("be.visible")
          .and("have.class", expectedClass)
      })

      it("Adds no margin to the end of the icon when animateIconOnHover is true", () => {
        // Arrange
        const iconName = "bi:arrow-right"
        const expectedClass = 'me-0'

        // Act
        mountLink({ label, url, iconName, animateIconOnHover: true })

        // Assert
        cy.get(linkIconId)
          .should("exist")
          .and("be.visible")
          .and("have.class", expectedClass)
      })
    })
  })

  describe("Target", () => {
    ;[
      { target: undefined },
      { target: '_blank' },
      { target: '_parent' },
      { target: '_self' },
      { target: '_top' },
    ].forEach(({ target }) => {
      it(`Adds ${ target ?? '_blank' } to target attribute when target is ${ target }`, () => {
        // Arrange
        const expectedTarget = target ?? '_blank'
        
        // Act
        mountLink({ label, url, target: target as Target})

        // Assert
        cy.get(linkId)
          .should("exist")
          .and("be.visible")
          .and('have.attr', 'target', expectedTarget)
      })
    })
  })
})