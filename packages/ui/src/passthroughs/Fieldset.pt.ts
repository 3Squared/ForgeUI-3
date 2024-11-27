export default {
  fieldset: {
    root: () => ({
      class: [
        "border rounded p-2 w-100",
      ]
    }),
    legend: () => ({
      class: [
        "float-none w-auto px-2 mb-0 fw-semibold fs-6 fieldset-legend",
      ]
    }),
    togglerIcon: () => ({
      class: [
        "me-1",
      ]
    }),
    toggleableContent: () => ({
      class: [
        "px-2",
      ]
    }),
  }
}