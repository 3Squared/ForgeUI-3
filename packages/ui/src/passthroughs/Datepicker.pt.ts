//import { CalendarPassThroughMethodOptions, CalendarPassThroughOptions } from "primevue/calendar";
import { DatePickerPassThroughMethodOptions, DatePickerPassThroughOptions } from "primevue/datepicker";

export default {
  // More PassThrough options defined in ForgeDatepicker.
  datepicker: {
    root: 'd-inline-flex relative w-100',
    pcInputText: "form-control",
    dropdown: "d-none",
    panel: ({ props }: DatePickerPassThroughMethodOptions) => ({
      class: [
        "datepicker-panel bg-white",
        {
          'shadow border-0 position-absolute': !props.inline
        }
      ]
    }),
    groupContainer: "d-flex flex-wrap",
    header: 'd-flex align-items-center justify-content-between p-2 border-bottom',
    pcPrevButton:{ root: ({ props } : DatePickerPassThroughMethodOptions) => ({
      class: {
        "btn mb-1 ms-auto": props.numberOfMonths === undefined || props.numberOfMonths == 1,
        "btn p-0 btn-sm": props.numberOfMonths !== undefined && props.numberOfMonths > 1
      }
    })},
    tableHeaderCell: "pe-none",
    pcNextButton: { root:({ props }: DatePickerPassThroughMethodOptions) => ({
      class: {
        "btn mb-1 me-auto": props.numberOfMonths === undefined || props.numberOfMonths == 1,
        "btn p-0 btn-sm": props.numberOfMonths !== undefined && props.numberOfMonths > 1
      }
    })},
    group: ({ props } : DatePickerPassThroughMethodOptions) => ({
      class: [
        "d-flex flex-column",
        {
          "w-100": props.numberOfMonths === undefined || props.numberOfMonths == 1
        }
      ]
    }),
    selectYear: ({ props } : DatePickerPassThroughMethodOptions) => ({
      class: {
        "btn ps-0 pe-1 fw-bold": props.numberOfMonths === undefined || props.numberOfMonths == 1,
        "fw-bold text-black border-0 bg-white": props.numberOfMonths !== undefined && props.numberOfMonths > 1
      }
    }),
    selectMonth: ({ props } : DatePickerPassThroughMethodOptions) => ({
      class: {
        "btn ps-1 fw-bold": props.numberOfMonths === undefined || props.numberOfMonths == 1,
        "fw-bold text-black border-0 bg-white": props.numberOfMonths !== undefined && props.numberOfMonths > 1
      }
    }),
    title: "d-flex mx-auto",

    dayCell: ({ context} : DatePickerPassThroughMethodOptions) => {
      return {
       class: [
        {
          "selected": context.selected
        }
        ]
    }},
    day: ({ context, props } : DatePickerPassThroughMethodOptions) => {
      return {
       class: [
        "d-flex date date-primary justify-content-center align-items-center",
        {
          "text-white": context.selected && (!context.disabled || (context.disabled && context.otherMonth)),
          "opacity-50": context.otherMonth,
          "today": context.today,
          "selected": context.selected && (!context.disabled || (context.disabled && context.otherMonth)),
          "text-grey-300": (context.disabled && !context.otherMonth) || (props.minDate != undefined && new Date(context.date.year, context.date.month, context.date.day) < props.minDate) || (props.maxDate != undefined && new Date(context.date.year, context.date.month, context.date.day) > props.maxDate),
          "fw-500": (context.disabled && !context.otherMonth) || (props.minDate != undefined && new Date(context.date.year, context.date.month, context.date.day) < props.minDate) || (props.maxDate != undefined && new Date(context.date.year, context.date.month, context.date.day) > props.maxDate),
        }
        ]
    }},
    decade: "fw-bold",
    dayView: "datepicker-table",
    tableHeaderRow: "text-center",
    monthView: "d-flex flex-row flex-wrap m-2",
    yearView: "d-flex flex-row flex-wrap m-2",
    timePicker: 'd-flex justify-content-center align-items-center border-top p-2',
    separatorContainer: "d-flex flex-column align-items-center px-2",
    hourPicker: "px-2 d-flex flex-column",
    hour: "mx-auto",
    minutePicker: "px-2 d-flex flex-column",
    minute: "mx-auto",
    secondPicker: "px-2 d-flex flex-column",
    second: "mx-auto",
    buttonbar: ({ props }: DatePickerPassThroughMethodOptions) => ({
      class: [
        'p-2 d-flex',
        {
          'border-top': !props.showTime
        }
      ]
    }),
    pcDecrementButton:{ root: "btn btn-sm", label: "d-none"},
    pcIncrementButton:{ root: "btn btn-sm", label: "d-none"},
  } as DatePickerPassThroughOptions,
}