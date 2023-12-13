export type Severity = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | undefined
export type Size = 'sm' | 'md' | 'lg' | undefined
export type BarPosition = 'top' | 'left' | 'none'

export type ForgeFormFieldTypes = "text" | "number" | "checkbox" | "textarea" | "mask" 
export type ForgeNavbarPosition = "fixed-top" | "fixed-bottom" | "sticky-top"

export type ForgeMultiSelectOrientation = "row" | "column"

export interface MultiSelectOption<T> {
  id: T;
  label: string;
  shortLabel?: string;
}

export interface SelectListOption<T> {
  value: T;
  text: string;
}
