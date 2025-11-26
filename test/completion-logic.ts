// Extracted completion logic for testing
export function getOperatorCompletions(linePrefix: string): string[] {
  // Context detection logic (from extension.ts lines 18-28)
  const lastOpenStatement = linePrefix.lastIndexOf("{%")
  const lastCloseStatement = linePrefix.lastIndexOf("%}")
  const lastOpenExpression = linePrefix.lastIndexOf("{{")
  const lastCloseExpression = linePrefix.lastIndexOf("}}")

  const inStatement = lastOpenStatement > lastCloseStatement
  const inExpression = lastOpenExpression > lastCloseExpression

  if (!inStatement && !inExpression) {
    return []
  }

  // Operators available in both statements and expressions (our fix)
  if (inStatement || inExpression) {
    return [
      // Logical operators
      "and",
      "or",
      "not",
      "is",
      "as",
      "contains",
      "equals",
      // Math operators
      "+",
      "-",
      "*",
      "/",
      "%",
      // Comparison operators
      "==",
      "!=",
      "<",
      ">",
      "<=",
      ">=",
      // Ternary operators
      "?",
      ":",
    ]
  }

  return []
}

export function getFilterCompletions(linePrefix: string): string[] {
  const lastOpenStatement = linePrefix.lastIndexOf("{%")
  const lastCloseStatement = linePrefix.lastIndexOf("%}")
  const lastOpenExpression = linePrefix.lastIndexOf("{{")
  const lastCloseExpression = linePrefix.lastIndexOf("}}")

  const inStatement = lastOpenStatement > lastCloseStatement
  const inExpression = lastOpenExpression > lastCloseExpression

  if (!inStatement && !inExpression) {
    return []
  }

  // Check if we're after a pipe for filters
  const lastPipe = linePrefix.lastIndexOf("|")
  const afterPipe =
    lastPipe > -1 &&
    ((inStatement && lastPipe > lastOpenStatement) ||
      (inExpression && lastPipe > lastOpenExpression))

  if (!afterPipe) {
    return []
  }

  // Return filter names (extracted from extension.ts filter list)
  return [
    "abbreviate",
    "abs",
    "capitalize",
    "date",
    "default",
    "escape",
    "first",
    "join",
    "last",
    "length",
    "lower",
    "merge",
    "numberformat",
    "raw",
    "replace",
    "reverse",
    "rsort",
    "slice",
    "sort",
    "split",
    "title",
    "trim",
    "upper",
    "urlencode",
    "base64decode",
    "base64encode",
    "sha256",
  ]
}
