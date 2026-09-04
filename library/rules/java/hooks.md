---
paths:
  - "**/*.java"
  - "**/pom.xml"
  - "**/build.gradle"
  - "**/build.gradle.kts"
---
# Java Hooks

> This file extends [common/hooks.md](../common/hooks.md) with Java-specific content.

## PostToolUse Hooks

Configure in `~/.claude/settings.json`:

- **google-java-format**: Auto-format `.java` files after edit
- **checkstyle**: Run style checks after editing Java files
- **./mvnw compile** or **./gradlew compileJava**: Verify compilation after changes

---
<!-- ecc-icm-notes -->
ECC-ICM notes: ECC's hooks are not installed by ecc-icm. Their scripts ship under `$PLUGIN/library/scripts/hooks/` with `$PLUGIN/library/hooks/hooks.json` for opt-in use; they expect ECC's layout and npm dependencies (`$PLUGIN/library/package.json`). ecc-icm's own hooks are the five in its README.
