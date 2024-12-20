import { ColumnProps } from "primevue/column";
import { FilterMatchModeOptions } from "@primevue/core/api";
import { FileUploadStatus } from "../components/file-uploader/utilities/utilities";
import { DataTableFilterMeta } from "primevue/datatable";

export type Severity = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'brand' | undefined
export type Size = 'sm' | 'md' | 'lg' | undefined
export type BarPosition = 'top' | 'left' | 'none'

export type ForgeFormFieldTypes = "text" | "number" | "checkbox" | "textarea" | "mask" | "select" | "multiselect" | "datepicker"
export type ForgeNavbarPosition = "fixed-top" | "fixed-bottom" | "sticky-top"

export type ForgeMultiSelectOrientation = "row" | "column"
export type ForgeColumnDataType = 'text' | 'numeric' | 'date' | 'select' | 'multiselect' | undefined
export type ForgeColumn = ColumnProps & { dataType?: ForgeColumnDataType }

export interface ForgeFileType {
  fileType: string,
  label?: string
}

export interface ForgeFileStatus {
  file: File;
  status: FileUploadStatus;
  blobFileName: string | null;
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

export interface ForgeTableContext {
  total: number,
  page: number,
  perPage: number,
  sortField: string,
  sortDirection: 'Asc' | 'Desc' | 'None',
  filters: DataTableFilterMeta | undefined
}