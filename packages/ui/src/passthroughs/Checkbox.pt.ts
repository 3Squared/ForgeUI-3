import { CheckboxPassThroughMethodOptions } from "primevue/checkbox";

export default {
  checkbox: {
    root: () => ({
      class: [
        'form-check'
      ]
    }),
    input: (options: CheckboxPassThroughMethodOptions) => ({
      class: [
        'form-check-input px-2 py-2 rounded',
        {
          'bg-primary': options.context.checked,
          'form-check-input__focus': options.state.focused,
          'disabled': options.context.disabled
        }
      ],
    }),
  }
}