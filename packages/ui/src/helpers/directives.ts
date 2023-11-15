import { ObjectDirective } from "vue";

export const clickOutside : ObjectDirective = {
  beforeMount(el, binding) {
    el.clickOutsideEvent = function (event : Event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event)
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent);
  }
}