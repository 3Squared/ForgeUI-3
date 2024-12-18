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
    toggleButton: () => ({
      class: ["border-0 bg-transparent mb-0 fw-semibold fs-6 fieldset-legend"]
    }),
    toggleIcon: () => ({
      class: [
        "me-1",
      ]
    }),
    content: () => ({
      class: [
        "px-2",
      ]
    }),
  }
}