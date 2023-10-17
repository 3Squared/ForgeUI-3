import { expect, test } from 'vitest'

test("Says Hello", () => {
  const string = "Hello"

  expect(string).toBe("Hello")
})