export const severities = ['primary', 'secondary', 'warning', 'danger', 'success', 'info']

export const formFieldTypes = ["text", "number", "checkbox", "textarea", "mask"]
export const inputTextSizes = ['small', 'large']

export const stringFilterTypes = ['contains', 'startsWith', 'notContains', 'endsWith', 'notEquals', 'in', 'between']
export const numberFilterTypes = ['lt', 'lte', 'gt', 'gte']
export const dateFilterTypes = ['dateIs', 'dateIsNot', 'dateBefore', 'dateAfter']

export const filterTypes = [...stringFilterTypes, ...numberFilterTypes, ...dateFilterTypes]