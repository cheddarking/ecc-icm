---
paths:
  - "**/*.dart"
  - "**/pubspec.yaml"
  - "**/analysis_options.yaml"
---
# Dart/Flutter Hooks

> This file extends [common/hooks.md](../common/hooks.md) with Dart and Flutter-specific content.

## PostToolUse Hooks

Configure in `~/.claude/settings.json`:

- **dart format**: Auto-format `.dart` files after edit
- **dart analyze**: Run static analysis after editing Dart files and surface warnings
- **flutter test**: Optionally run affected tests after significant changes

## Recommended Hook Configuration

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": { "tool_name": "Edit", "file_paths": ["**/*.dart"] },
        "hooks": [
          { "type": "command", "command": "dart format $CLAUDE_FILE_PATHS" }
        ]
      }
    ]
  }
}
```

## Pre-commit Checks

Run before committing Dart/Flutter changes:

```bash
dart format --set-exit-if-changed .
dart analyze --fatal-infos
flutter test
```

## Useful One-liners

```bash
# Format all Dart files
dart format .

# Analyze and report issues
dart analyze

# Run all tests with coverage
flutter test --coverage

# Regenerate code-gen files
dart run build_runner build --delete-conflicting-outputs

# Check for outdated packages
flutter pub outdated

# Upgrade packages within constraints
flutter pub upgrade
```

---
<!-- ecc-icm-notes -->
ECC-ICM notes: ECC's hooks are not installed by ecc-icm. Their scripts ship under `$PLUGIN/library/scripts/hooks/` with `$PLUGIN/library/hooks/hooks.json` for opt-in use; they expect ECC's layout and npm dependencies (`$PLUGIN/library/package.json`). ecc-icm's own hooks are the five in its README.
