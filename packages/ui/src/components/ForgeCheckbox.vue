<template>
  <div class="d-flex flex-column">
    <div
      class="d-flex"
      data-cy="checkbox-container"
      @click="evt => onChange(evt, value)"
      v-bind="{ ...$attrs }"
    >
      <Checkbox
        v-bind="{ ...props }"
        binary
        v-model="value"
        :input-id="props.name"
        :input-class="{ 'is-invalid': hasErrors }"
        :class="(props.disabled || props.readonly) ? '' : 'cursor-pointer'"
      />
      <label
        :for="props.name"
        @click="evt => onChange(evt, !value)"
        :class="`${(props.disabled || props.readonly) ? 'opacity-50' : 'cursor-pointer'} ${
          hasErrors ? 'text-danger-dark' : ''
        }`"
        class="w-100 my-auto"
      >
        <slot>{{ props.label }}</slot>
      </label>
    </div>
    <small data-cy="error" class="text-invalid" v-show="hasErrors">{{
      errorMessage
    }}</small>
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { computed } from "vue";
import { CheckboxProps } from "primevue/checkbox";

type CheckProps = Omit<CheckboxProps, "aria-label" | "aria-labelledby">;

export interface ForgeCheckProps extends CheckProps {
  label: string;
}

const props = withDefaults(defineProps<ForgeCheckProps>(), {
  binary: true,
  label: "",
});

const value = defineModel<boolean>({ required: true });

const { handleChange, errors, errorMessage } = useField(
  () => props.name ?? "",
  undefined,
  {
    type: "checkbox",
    checkedValue: value.value,
  }
);

const onChange = (event: MouseEvent, checkValue: boolean) => {
  if(props.disabled || props.readonly) {
    event.preventDefault();
  }
  if(props.name) handleChange(checkValue)
  else value.value = checkValue
}

const hasErrors = computed(() => errors.value.length > 0);
</script>
