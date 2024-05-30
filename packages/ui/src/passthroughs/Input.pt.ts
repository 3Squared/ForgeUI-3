import { InputTextPassThroughMethodOptions } from "primevue/inputtext";

export default {
  inputtext: {
    root: (options: InputTextPassThroughMethodOptions) => ({
      class: [
        'form-control',
        {
          'form-control-lg': options.props.size?.toLowerCase() == 'large',
          'form-control-sm': options.props.size?.toLowerCase() == 'small'
        }
      ]
    })
  },

}