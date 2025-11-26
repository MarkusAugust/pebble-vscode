import { describe, expect, test } from "bun:test"
import { getOperatorCompletions } from "./completion-logic"

describe("Pebble Expression Completion", () => {
  test("CRITICAL: Provides operators in {{ }} expressions", () => {
    // Test our core fix - operators must work in expressions
    const linePrefix = "<p>{{ user.name "

    const operators = getOperatorCompletions(linePrefix)

    // Critical assertions - these operators MUST be available in expressions
    expect(operators).toContain("+")
    expect(operators).toContain("and")
    expect(operators).toContain("==")
    expect(operators).toContain("?")

    // Verify we get all expected operators (20 total: 7 logical + 5 math + 6 comparison + 2 ternary)
    expect(operators.length).toBe(20)

    // Verify specific operator categories
    expect(operators).toContain("or") // logical
    expect(operators).toContain("*") // math
    expect(operators).toContain("!=") // comparison
    expect(operators).toContain(":") // ternary
  })

  test("CRITICAL: Also works in {% %} statements (regression test)", () => {
    // Ensure we didn't break statement completion
    const linePrefix = "{% if user.active "

    const operators = getOperatorCompletions(linePrefix)

    // Should still work in statements
    expect(operators).toContain("and")
    expect(operators).toContain("==")
    expect(operators.length).toBe(20)
  })

  test("No operators outside Pebble blocks", () => {
    // Should not provide operators in plain HTML
    const linePrefix = "<p>Hello world "

    const operators = getOperatorCompletions(linePrefix)

    expect(operators).toHaveLength(0)
  })

  test("No operators inside closed blocks", () => {
    // Should not provide operators after closing
    const linePrefix = "<p>{{ user.name }} and more "

    const operators = getOperatorCompletions(linePrefix)

    expect(operators).toHaveLength(0)
  })
})
