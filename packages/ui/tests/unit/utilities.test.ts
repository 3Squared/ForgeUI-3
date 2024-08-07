import { expect, test, describe } from 'vitest'
import { enumToMultiSelectList, convertToMultiSelectOption } from '../../src/helpers/index'


describe("enumToMultiSelectList", () => {
  test("Should convert array of strings to multiSelect list format", () => {
    expect(enumToMultiSelectList(["a", "b", "c"])).toStrictEqual([
      { label: "a", id: "a" },
      { label: "b", id: "b" },
      { label: "c", id: "c" }
    ]);
  })

  test("convert array of strings to select list format and formatters apply to label", () => {
    const result = enumToMultiSelectList(["a", "b", "c"], (v) => {
      if (v === "a") {
        return "This was a";
      }
      return v;
    });
    const [a, b, c] = result;
    expect(a).toStrictEqual({ id: "a", label: "This was a" });
    expect(b).toStrictEqual({ id: "b", label: "b" });
    expect(c).toStrictEqual({ id: "c", label: "c" });
  });
})

describe("convertToMultiSelectOption", () => {
  test("should convert the parameters passed in to a multiselect option", () => {
    expect(convertToMultiSelectOption("a", "a - label", "a - short label")).toStrictEqual({ id: "a", label: "a - label", shortLabel: "a - short label" });
  });

  test("should set the id as the label and short label if they aren't specified", () => {
    expect(convertToMultiSelectOption("a")).toStrictEqual({ id: "a", label: "a", shortLabel: undefined });
  });
});