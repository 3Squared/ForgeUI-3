import { CalendarPassThroughMethodOptions, CalendarPassThroughOptions } from "primevue/calendar";

export default {
  // More PassThrough options defined in ForgeDatepicker.
  calendar: {
    root: 'd-inline-flex relative',
    input: "form-control",
    panel: ({ props }: CalendarPassThroughMethodOptions) => ({
      class: [
        "datepicker-panel bg-white",
        {
          'shadow border-0 position-absolute': !props.inline
        }
      ]
    }),
    groupContainer: "d-flex flex-wrap",
    header: 'd-flex align-items-center justify-content-between p-2 border-bottom',
    previousButton: ({ props } : CalendarPassThroughMethodOptions) => ({
      class: {
        "btn mb-1 ms-auto": props.numberOfMonths === undefined || props.numberOfMonths == 1,
        "btn p-0 btn-sm": props.numberOfMonths !== undefined && props.numberOfMonths > 1
      }
    }),
    tableheadercell: "pe-none",
    nextButton: ({ props }: CalendarPassThroughMethodOptions) => ({
      class: {
        "btn mb-1 me-auto": props.numberOfMonths === undefined || props.numberOfMonths == 1,
        "btn p-0 btn-sm": props.numberOfMonths !== undefined && props.numberOfMonths > 1
      }
    }),
    group: ({ props } : CalendarPassThroughMethodOptions) => ({
      class: [
        "d-flex flex-column",
        {
          "w-100": props.numberOfMonths === undefined || props.numberOfMonths == 1
        }
      ]
    }),
    yearTitle: ({ props }) => ({
      class: {
        "btn ps-0 pe-1 fw-bold": props.numberOfMonths === undefined || props.numberOfMonths == 1,
        "fw-bold text-black border-0 bg-white": props.numberOfMonths !== undefined && props.numberOfMonths > 1
      }
    }),
    monthTitle: ({ props }) => ({
      class: {
        "btn ps-1 fw-bold": props.numberOfMonths === undefined || props.numberOfMonths == 1,
        "fw-bold text-black border-0 bg-white": props.numberOfMonths !== undefined && props.numberOfMonths > 1
      }
    }), 
    title: "d-flex mx-auto",
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