import { MultiSelectOption } from "../types/forge-types.ts";

export function parseError(error: any) {
  const result = {
    errorMessage: "",
    errorDetails: [] as string[]
  };
  if (error.exception) {
    result.errorMessage = error.exception;
  }
  if (error.message) {
    if (Array.isArray(error.message)) {
      result.errorDetails = error.message;
    } else {
      result.errorMessage = error.message;
    }
  }
  if (error.response) {
    const parsedResponse = JSON.parse(error.response);
    if (parsedResponse.errors) {
      result.errorDetails = Object.values<string[]>(parsedResponse.errors).flat();
    }
    if (parsedResponse.message) {
      result.errorDetails = parsedResponse.message;
    }
  }
  if (result.errorMessage === "" && result.errorDetails.length === 0) {
    result.errorMessage = error;
  }
  return result;
}

export function enumToMultiSelectList<T>(items: readonly T[], formatter?: (val: T) => string): MultiSelectOption<T>[] {
  return items.map((i) => ({ id: i, label: formatter ? formatter(i) : `${i}` }));
}

export function convertToMultiSelectOption<T>(id: T & Pick<string, "toString">, label?: string, shortLabel?: string): MultiSelectOption<T> {
  return { id: id, label: label ?? id.toString(), shortLabel: shortLabel };
}