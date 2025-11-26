# Pebble Template Support for VS Code

[Pebble Templates](https://pebbletemplates.io/) support for HTML files in VS Code.

*"What is best in template coding? To crush your syntax errors, see them driven before you, and to hear the lamentations of the improperly closed Pebble tags!"*

## Features

**Syntax Highlighting** - All tags, filters, functions, tests, and operators  
**Code Completion** - Smart autocomplete with snippets  
**Snippets** - Quick insertion for `{% %}`, `{{ }}`, `{# #}` and complete blocks  


## Quick Examples

```html
<!-- Control structures -->
{% if user.isActive %}
<p>Welcome, {{ user.name | upper }}!</p>
{% endif %}

<!-- Loops with variables -->
{% for item in items %} {{ loop.index }}: {{ item.name }} {% endfor %}

<!-- Filters and functions -->
{{ "Hello #{name}" | capitalize }} {{ max(score1, score2) }}

<!-- Template inheritance -->
{% extends "base.html" %} {% block content %}{{ parent() }}{% endblock %}
```

## Supported Features

- **16 Tags**: `if`, `for`, `block`, `extends`, `include`, `macro`, `set`, etc.
- **26 Filters**: `upper`, `date`, `join`, `base64encode`, `sha256`, etc.
- **6 Functions**: `max`, `min`, `range`, `block`, `parent`, `i18n`
- **6 Tests**: `empty`, `even`, `odd`, `null`, `map`, `iterable`
- **All Operators**: Math, comparison, logical, ternary
- **String interpolation**: `"Hello #{name}"`
- **Whitespace control**: `{{- content -}}`

##  Usage

Open any `.html` file and start writing Pebble template syntax!

### Available Snippets

| Trigger | Description | Result |
|---------|-------------|---------|
| `{{` | Expression block | `{{ expression }}` |
| `{%` | Statement block | `{% statement %}` |
| `{#` | Comment block | `{# comment #}` |
| `if` | If statement | `{% if condition %}...{% endif %}` |
| `for` | For loop | `{% for item in items %}...{% endfor %}` |
| `block` | Block definition | `{% block name %}...{% endblock %}` |
| `extends` | Extend template | `{% extends "parent.html" %}` |
| `include` | Include template | `{% include "template.html" %}` |
| `macro` | Macro definition | `{% macro name(args) %}...{% endmacro %}` |
| `set` | Set variable | `{% set variable = value %}` |

*Type the trigger word and press Tab or Ctrl+Space to use snippets*

## Contribution
I made this because I needed it. Feel free to submit any improvements!

## License

BSD-3-Clause




