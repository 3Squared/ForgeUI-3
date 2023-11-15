import Calendar, { CalendarProps } from "primevue/calendar";

function mountCalendar(props : CalendarProps) {
  // @ts-ignore
  cy.mount(Calendar, {
    props
  })
}

describe("<Calendar />", () => {
  it('Mounts', () => {
    mountCalendar({ })
  });
})