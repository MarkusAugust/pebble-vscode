# Changelog

All notable changes to the Pebble Template Support extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.3] - 2025-11-26

### Fixed
- Replaced deprecated `substr` method with `substring`

### Added
- Filter completion tests to ensure quality
- Snippets category in package.json

## [0.3.2] - 2025-11-26

### Added
- Semantic versioning workflow with git tags
- Version scripts for patch, minor, and major releases
- Proper changelog documentation

### Changed
- Improved development workflow with structured versioning

## [0.3.1] - 2025-11-26

### Added
- Comprehensive test suite for completion provider
- Critical test for expression operator completion
- Tests now run before publishing (prepublish script)

### Fixed
- Operator completion now works in `{{ }}` expressions (major fix!)
- Fixed snippet auto-closing conflicts by updating prefixes

### Changed
- Updated README with accurate snippet documentation
- Improved Usage section with clearer instructions
- Enhanced IntelliSense description

## [0.3.0] - Previous

### Added
- Enhanced completion provider with operators and functions
- Improved syntax highlighting
- Better snippet support

## [0.2.x] - Earlier versions

### Added
- Initial Pebble template support
- Basic syntax highlighting
- Core snippet functionality