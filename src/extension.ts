import * as vscode from "vscode"

export function activate(context: vscode.ExtensionContext) {

  // Completion provider for HTML files with Pebble
  const completionProvider = vscode.languages.registerCompletionItemProvider(
    { scheme: "file", language: "html" },
    {
      provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
      ) {
        const linePrefix = document
          .lineAt(position)
          .text.substr(0, position.character)

        // Check if we're inside {% %} or {{ }}
        const lastOpenStatement = linePrefix.lastIndexOf("{%")
        const lastCloseStatement = linePrefix.lastIndexOf("%}")
        const lastOpenExpression = linePrefix.lastIndexOf("{{")
        const lastCloseExpression = linePrefix.lastIndexOf("}}")

        const inStatement = lastOpenStatement > lastCloseStatement
        const inExpression = lastOpenExpression > lastCloseExpression

        if (!inStatement && !inExpression) {
          return undefined
        }

        const completions: vscode.CompletionItem[] = []

        // Keywords (for statements)
        if (inStatement) {
          const keywords = [
            {
              name: "if",
              detail: "Conditional statement",
              snippet: "if ${1:condition}\n\t$0\n{% endif %}",
            },
            { name: "else", detail: "Else clause" },
            {
              name: "elseif",
              detail: "Else if clause",
              snippet: "elseif ${1:condition}",
            },
            { name: "endif", detail: "End if statement" },
            {
              name: "for",
              detail: "For loop",
              snippet: "for ${1:item} in ${2:items}\n\t$0\n{% endfor %}",
            },
            { name: "endfor", detail: "End for loop" },
            { name: "in", detail: "In operator (for loops)" },
            {
              name: "block",
              detail: "Define a block",
              snippet: "block ${1:name}\n\t$0\n{% endblock %}",
            },
            { name: "endblock", detail: "End block" },
            {
              name: "extends",
              detail: "Extend parent template",
              snippet: 'extends "${1:parent.html}"',
            },
            {
              name: "include",
              detail: "Include another template",
              snippet: 'include "${1:template.html}"',
            },
            {
              name: "import",
              detail: "Import macros",
              snippet: 'import "${1:macros.html}"',
            },
            {
              name: "from",
              detail: "Import specific macros",
              snippet: 'from "${1:macros.html}" import ${2:macroName}',
            },
            {
              name: "macro",
              detail: "Define a macro",
              snippet: "macro ${1:name}(${2:args})\n\t$0\n{% endmacro %}",
            },
            { name: "endmacro", detail: "End macro" },
            {
              name: "set",
              detail: "Set a variable",
              snippet: "set ${1:varName} = ${2:value}",
            },
            {
              name: "filter",
              detail: "Apply filter to block",
              snippet: "filter ${1:filterName}\n\t$0\n{% endfilter %}",
            },
            { name: "endfilter", detail: "End filter block" },
            {
              name: "autoescape",
              detail: "Enable autoescaping",
              snippet: 'autoescape "${1:html}"\n\t$0\n{% endautoescape %}',
            },
            { name: "endautoescape", detail: "End autoescape" },
            {
              name: "verbatim",
              detail: "Verbatim block (no processing)",
              snippet: "verbatim\n\t$0\n{% endverbatim %}",
            },
            { name: "endverbatim", detail: "End verbatim" },
            {
              name: "cache",
              detail: "Cache block",
              snippet: "cache ${1:cacheName}\n\t$0\n{% endcache %}",
            },
            { name: "endcache", detail: "End cache" },
            {
              name: "parallel",
              detail: "Parallel execution",
              snippet: "parallel\n\t$0\n{% endparallel %}",
            },
            { name: "endparallel", detail: "End parallel" },
            {
              name: "embed",
              detail: "Embed template with overrides",
              snippet: 'embed "${1:template.html}"\n\t$0\n{% endembed %}',
            },
            { name: "endembed", detail: "End embed" },
            { name: "flush", detail: "Flush output buffer" },
          ]

          keywords.forEach((keyword) => {
            const item = new vscode.CompletionItem(
              keyword.name,
              vscode.CompletionItemKind.Keyword,
            )
            item.detail = keyword.detail
            if (keyword.snippet) {
              item.insertText = new vscode.SnippetString(keyword.snippet)
            }
            completions.push(item)
          })
        }

        // Operators (available in both statements and expressions)
        if (inStatement || inExpression) {
          // Logical operators
          const operators = [
            "and",
            "or",
            "not",
            "is",
            "as",
            "contains",
            "equals",
          ]
          operators.forEach((op) => {
            const item = new vscode.CompletionItem(
              op,
              vscode.CompletionItemKind.Operator,
            )
            item.detail = "Logical operator"
            completions.push(item)
          })

          // Additional operators available in both statements and expressions
          const additionalOperators = [
            { name: "+", desc: "Addition" },
            { name: "-", desc: "Subtraction" },
            { name: "*", desc: "Multiplication" },
            { name: "/", desc: "Division" },
            { name: "%", desc: "Modulus" },
            { name: "==", desc: "Equality comparison" },
            { name: "!=", desc: "Inequality comparison" },
            { name: "<", desc: "Less than" },
            { name: ">", desc: "Greater than" },
            { name: "<=", desc: "Less than or equal" },
            { name: ">=", desc: "Greater than or equal" },
            { name: "?", desc: "Ternary operator (condition)" },
            { name: ":", desc: "Ternary operator (else)" },
          ]
          additionalOperators.forEach((op) => {
            const item = new vscode.CompletionItem(
              op.name,
              vscode.CompletionItemKind.Operator,
            )
            item.detail = op.desc
            completions.push(item)
          })
        }

        // Check if we're after a pipe for filters
        const lastPipe = linePrefix.lastIndexOf("|")
        const afterPipe =
          lastPipe > -1 &&
          ((inStatement && lastPipe > lastOpenStatement) ||
            (inExpression && lastPipe > lastOpenExpression))

        if (afterPipe) {
          const filters = [
            {
              name: "abbreviate",
              desc: "Abbreviate string to length",
              snippet: "abbreviate(${1:length})",
            },
            { name: "abs", desc: "Absolute value" },
            { name: "capitalize", desc: "Capitalize first letter" },
            {
              name: "date",
              desc: "Format date",
              snippet: 'date("${1:yyyy-MM-dd}")',
            },
            {
              name: "default",
              desc: "Default value if null",
              snippet: 'default("${1:defaultValue}")',
            },
            {
              name: "escape",
              desc: "Escape HTML",
              snippet: 'escape(strategy="${1:html}")',
            },
            { name: "first", desc: "Get first element" },
            {
              name: "join",
              desc: "Join array elements",
              snippet: 'join("${1:,}")',
            },
            { name: "last", desc: "Get last element" },
            { name: "length", desc: "Get length" },
            { name: "lower", desc: "Convert to lowercase" },
            { name: "merge", desc: "Merge arrays/maps" },
            {
              name: "numberformat",
              desc: "Format number",
              snippet: 'numberformat("${1:#,##0.00}")',
            },
            { name: "raw", desc: "Output raw (no escaping)" },
            {
              name: "replace",
              desc: "Replace text",
              snippet: 'replace({"${1:search}": "${2:replace}"})',
            },
            { name: "reverse", desc: "Reverse array or string" },
            { name: "rsort", desc: "Reverse sort" },
            {
              name: "slice",
              desc: "Extract slice",
              snippet: "slice(${1:start}, ${2:length})",
            },
            { name: "sort", desc: "Sort array" },
            { name: "split", desc: "Split string", snippet: 'split("${1:,}")' },
            { name: "title", desc: "Convert to title case" },
            { name: "trim", desc: "Remove whitespace" },
            { name: "upper", desc: "Convert to uppercase" },
            { name: "urlencode", desc: "URL encode string" },
            { name: "base64decode", desc: "Decode base64 string" },
            { name: "base64encode", desc: "Encode string to base64" },
            { name: "sha256", desc: "Generate SHA256 hash" },
            { name: "base64decode", desc: "Decode base64 string" },
            { name: "base64encode", desc: "Encode string to base64" },
            { name: "sha256", desc: "Generate SHA256 hash" },
            { name: "base64decode", desc: "Decode base64 string" },
            { name: "base64encode", desc: "Encode string to base64" },
            { name: "sha256", desc: "Generate SHA256 hash" },
          ]

          filters.forEach((filter) => {
            const item = new vscode.CompletionItem(
              filter.name,
              vscode.CompletionItemKind.Function,
            )
            item.detail = filter.desc
            item.documentation = new vscode.MarkdownString(
              `**${filter.name}** filter\n\n${filter.desc}`,
            )
            if (filter.snippet) {
              item.insertText = new vscode.SnippetString(filter.snippet)
            }
            completions.push(item)
          })
        }

        // Functions (available in both statements and expressions)
        if (inStatement || inExpression) {
          // Check if we might be typing a function (not after a pipe)
          const afterVariable = /[a-zA-Z_][a-zA-Z0-9_]*$/.test(linePrefix)

          if (afterVariable && !afterPipe) {
            const functions = [
              {
                name: "block",
                desc: "Reference parent block",
                snippet: 'block("${1:blockName}")',
              },
              {
                name: "i18n",
                desc: "Internationalization/translation",
                snippet: 'i18n("${1:key}")',
              },
              {
                name: "max",
                desc: "Maximum value",
                snippet: "max(${1:value1}, ${2:value2})",
              },
              {
                name: "min",
                desc: "Minimum value",
                snippet: "min(${1:value1}, ${2:value2})",
              },
              {
                name: "parent",
                desc: "Reference parent block content",
                snippet: "parent()",
              },
              {
                name: "range",
                desc: "Generate range of numbers",
                snippet: "range(${1:start}, ${2:end})",
              },
            ]

            functions.forEach((func) => {
              const item = new vscode.CompletionItem(
                func.name,
                vscode.CompletionItemKind.Function,
              )
              item.detail = func.desc
              item.documentation = new vscode.MarkdownString(
                `**${func.name}** function\n\n${func.desc}`,
              )
              if (func.snippet) {
                item.insertText = new vscode.SnippetString(func.snippet)
              }
              completions.push(item)
            })
          }
        }

        // Tests (after "is" keyword)
        if (/\bis\s+(not\s+)?[a-zA-Z]*$/.test(linePrefix)) {
          const tests = [
            { name: "empty", desc: "Test if empty" },
            { name: "even", desc: "Test if even number" },
            { name: "odd", desc: "Test if odd number" },
            { name: "null", desc: "Test if null" },
            { name: "map", desc: "Test if map/object" },
            { name: "iterable", desc: "Test if iterable" },
          ]

          tests.forEach((test) => {
            const item = new vscode.CompletionItem(
              test.name,
              vscode.CompletionItemKind.Keyword,
            )
            item.detail = test.desc
            item.documentation = new vscode.MarkdownString(
              `**${test.name}** test\n\n${test.desc}`,
            )
            completions.push(item)
          })
        }

        // Loop variables (when typing "loop.")
        if (/\bloop\.$/.test(linePrefix)) {
          const loopVars = [
            { name: "index", desc: "Zero-based index" },
            { name: "length", desc: "Total number of items" },
            { name: "first", desc: "True if first iteration" },
            { name: "last", desc: "True if last iteration" },
            { name: "revindex", desc: "Iterations from the end" },
          ]

          loopVars.forEach((loopVar) => {
            const item = new vscode.CompletionItem(
              loopVar.name,
              vscode.CompletionItemKind.Property,
            )
            item.detail = loopVar.desc
            completions.push(item)
          })
        }

        return completions
      },
    },
    " ",
    "|",
    ".", // Trigger completion on space, pipe, and dot
  )

  context.subscriptions.push(completionProvider)
}

export function deactivate() {}
