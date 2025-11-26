# Pebble Template in HTML Support for VS Code

Compatible with Pebble Templates 4.0+

[Pebble Templates](https://pebbletemplates.io/) support for HTML files in VS Code.

*"What is best in template coding? To crush your syntax errors, see them driven before you, and to hear the lamentations of the improperly closed Pebble tags!"*

## Features

**Syntax Highlighting** - Complete Pebble syntax support  
**Smart Completion** - Context-aware IntelliSense for tags, filters, functions, and operators  
**Code Snippets** - Quick insertion templates for common patterns  


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

## Supported Pebble Features

- **Tags**: `if`, `for`, `block`, `extends`, `include`, `macro`, `set`, etc.
- **Filters**: `upper`, `date`, `join`, `base64encode`, `sha256`, etc.
- **Functions**: `max`, `min`, `range`, `block`, `parent`, `i18n`
- **Tests**: `empty`, `even`, `odd`, `null`, `map`, `iterable`
- **All Operators**: Math, comparison, logical, ternary
- **String interpolation**: `"Hello #{name}"`
- **Whitespace control**: `{{- content -}}`

##  Usage

Open any `.html` file and start writing Pebble template syntax!

**Snippets:**
- Type `pebble-statement` for a complete `{% %}` 
- Use specific triggers like `if`, `for`, `block` for full template constructs
- All snippets support Tab completion and parameter navigation

**Auto-completion:**
- IntelliSense appears automatically when typing inside Pebble blocks
- Filter suggestions after `|` with parameter hints
- Loop variables after `loop.` (index, first, last, etc.)

### Available Snippets

| Trigger | Description | Result |
|---------|-------------|---------|
| `pebble-expression` | Expression block | `{{ expression }}` |
| `pebble-statement` | Statement block | `{% statement %}` |
| `pebble-comment` | Comment block | `{# comment #}` |
| `if` | If statement | `{% if condition %}...{% endif %}` |
| `ifelse` | If-else statement | `{% if condition %}...{% else %}...{% endif %}` |
| `for` | For loop | `{% for item in items %}...{% endfor %}` |
| `block` | Block definition | `{% block name %}...{% endblock %}` |
| `extends` | Extend template | `{% extends "parent.html" %}` |
| `include` | Include template | `{% include "template.html" %}` |
| `macro` | Macro definition | `{% macro name(args) %}...{% endmacro %}` |
| `set` | Set variable | `{% set variable = value %}` |
| `filter` | Filter block | `{% filter name %}...{% endfilter %}` |
| `verbatim` | Verbatim block | `{% verbatim %}...{% endverbatim %}` |
| `cache` | Cache block | `{% cache name %}...{% endcache %}` |

*Type the trigger word and press Tab or Ctrl+Space to use snippets*

## Contribution
I made this because I needed it. Feel free to submit any improvements!

## License

BSD-3-Clause




