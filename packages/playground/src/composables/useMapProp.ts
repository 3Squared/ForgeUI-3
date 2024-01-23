import { computed, ref } from "vue";

function formatKey(key: string) {
  return key.replace(/[A-Z]/g, "-$&").toLowerCase();
}

function useStringifyProp(key: string, prop: string | number | boolean | object) {
  if (typeof prop === "string" || typeof prop === "number") {
    return `${formatKey(key)}="${prop}"`;
  } else if (typeof prop === "boolean") {
    if (!prop) {
      return `:${formatKey(key)}="${prop}"`;
    } else {
      return `${formatKey(key)}`;
    }
  } else if (typeof prop === "function") {
    return `:${formatKey(key)}="${key}Function"`;
  } else if (prop instanceof Array) {
    return `${formatKey(key)}="${key}Array"`;
  } else if (prop instanceof Object) {
    return `:${formatKey(key)}="${key}Object"`;
  }
}

interface PropDef {
  required?: boolean;
  disabled?: () => boolean;
}

export interface SelectPropDef extends PropDef {
  type: "select";
  options: [];
}

export type PropDefs = SelectPropDef | PropDef;

export function usePlayground<T extends Record<string, string | number | boolean | object>>(
  defaultProps: T,
  inConfig?: Partial<Record<keyof T, PropDefs>>,
  additionalReset?: () => void
) {
  const options = ref<T>({ ...defaultProps });
  const config = ref(inConfig ?? ({} as Partial<Record<keyof T, PropDefs>>));

  const propVals = computed(() => {
    return (
      Object.entries(options.value)
        // @ts-expect-error
        .filter(([key, value]) => defaultProps[key] !== value || (defaultProps[key] !== value && !value) || (config.value[key] && config.value[key].required))
        .map(([k, v]) => useStringifyProp(k, v))
    );
  });

  const reset = () => {
    // @ts-ignore
    options.value = { ...defaultProps };
    if (additionalReset) {
      additionalReset();
    }
  };

  return { options, config, propVals, reset };
}
