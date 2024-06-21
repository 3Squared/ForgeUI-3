import { CalendarPassThroughMethodOptions } from "primevue/calendar";

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
    previousButton: "btn mb-1",
    nextButton: "btn mb-1",
    yearTitle: "btn",
    monthTitle: "btn",
    table: "m-2",
    tableHeaderRow: "text-center",
    monthPicker: 'my-2',
    month: 'btn w-25',
    yearPicker: "my-2",
    year: "btn w-25",
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
  },
}