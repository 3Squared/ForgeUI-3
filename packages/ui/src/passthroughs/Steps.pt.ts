import { StepsPassThroughMethodOptions } from "primevue/steps";

export default {
  // More PT options defined in ForgeStepper.
  stepList: {
    root: "d-flex mb-2 w-100",
  },
  step: {
    root: "w-100 mx-2 ",
    header: "p-0 m-0 d-flex flex-column align-items-center border border-0 bg-transparent",
    number: ({ context }: StepsPassThroughMethodOptions) => ({
      class: [
        "step mb-2 d-flex align-items-center justify-content-center",
        {
          inactive: context.disabled,
          "bg-primary text-white": context.active,
        },
      ],
    }),
    title: ({ context }: StepsPassThroughMethodOptions) => ({
      class: [
        "h5",
        {
          inactive: context.disabled,
          "border-bottom border-2 border-primary": context.active,
        },
      ],
    }),
    separator: "border border-1 separator"
  },
};
