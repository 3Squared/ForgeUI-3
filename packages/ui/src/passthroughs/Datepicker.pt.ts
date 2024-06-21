import { CalendarPassThroughMethodOptions, CalendarPassThroughOptions } from "primevue/calendar";

export default {
  // More PassThrough options defined in ForgeDatepicker.
  calendar: {
    root: 'd-inline-flex relative',
    input: "form-control",
    panel: ({ props } : CalendarPassThroughMethodOptions) => ({
      class: [
        "datepicker-panel bg-white",
        {
          'shadow border-0 position-absolute': !props.inline
        }
      ]
    }),
    header: 'd-flex align-items-center justify-content-between p-2 border-bottom',
    previousButton: "btn mb-1 ms-auto",
    tableheadercell: "pe-none",
    nextButton: "btn mb-1 me-auto",
    yearTitle: "btn ps-0 pe-1 fw-bold",
    monthTitle: "btn ps-1 fw-bold",
    decadetitle: "fw-bold",
    table: "datepicker-table",
    tableHeaderRow: "text-center",
    monthPicker: "d-flex flex-row flex-wrap m-2",
    yearPicker: "d-flex flex-row flex-wrap m-2",
    timePicker: 'd-flex justify-content-center align-items-center border-top p-2',
    separatorContainer: "d-flex flex-column align-items-center px-2",
    hourPicker: "px-2 d-flex flex-column",
    hour: "mx-auto",
    minutePicker: "px-2 d-flex flex-column",
    minute: "mx-auto",
    secondPicker: "px-2 d-flex flex-column",
    second: "mx-auto",
    buttonbar: ({ props }: CalendarPassThroughMethodOptions) => ({
      class: [
        'p-2 d-flex',
        {
          'border-top': !props.showTime
        }
      ]
    }),
    decrementButton: "btn btn-sm",
    incrementButton: "btn btn-sm",
  } as CalendarPassThroughOptions,
}