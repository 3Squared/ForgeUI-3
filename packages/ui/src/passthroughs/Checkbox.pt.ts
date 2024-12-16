import { CheckboxPassThroughMethodOptions } from "primevue/checkbox";

export default {
  checkbox: {
    root: () => ({
      class: ["form-check"],
    }),
    input: ({ context, state }: CheckboxPassThroughMethodOptions) => ({
      class: [
        "form-check-input px-2 py-2 rounded",
        {
          "bg-primary": context?.checked,
          "cursor-pointer": !context?.disabled,
          "form-check-input__focus": state.focused,
        },
      ],
    }),
  },
};