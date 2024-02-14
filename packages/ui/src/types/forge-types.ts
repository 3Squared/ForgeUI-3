import { ColumnProps } from "primevue/column";
import { FilterMatchModeOptions, FilterOperatorOptions } from "primevue/api";

export type Severity = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | undefined
export type Size = 'sm' | 'md' | 'lg' | undefined
export type BarPosition = 'top' | 'left' | 'none'

export type ForgeFormFieldTypes = "text" | "number" | "checkbox" | "textarea" | "mask"
export type ForgeNavbarPosition = "fixed-top" | "fixed-bottom" | "sticky-top"

export type ForgeMultiSelectOrientation = "row" | "column"
export type ForgeColumnDataType = 'text' | 'numeric' | 'date' | 'select' | 'multiselect' | undefined
export type ForgeColumn = ColumnProps & { dataType?: ForgeColumnDataType }
export type ForgeTableFilter = { 
  value?: any,
  matchMode?: FilterMatchModeOptions,
  operator?: FilterOperatorOptions,
  constraints?: Array<ForgeTableFilterConstraint>
}

export type ForgeTableFilterConstraint = {
  value: unknown,
  matchMode: FilterMatchModeOptions
}

export interface MultiSelectOption<T> {
  id: T;
  label: string;
  shortLabel?: string;
}

export interface SelectListOption<T> {
  value: T;
  text: string;
}
