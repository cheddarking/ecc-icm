# Build-Fix Map

When the build, typecheck or test runner breaks during 04-implement, load the general role and the one language file. Minimal changes; never touch linter or formatter config.

| Load first | `$PLUGIN/library/roles/build-error-resolver.md`, sections "Workflow" and "DO and DON'T" |
|---|---|

| Language or stack | Role file |
|---|---|
| C or C++ | `$PLUGIN/library/roles/cpp-build-resolver.md` |
| Dart or Flutter | `$PLUGIN/library/roles/dart-build-resolver.md` |
| Django | `$PLUGIN/library/roles/django-build-resolver.md` |
| Go | `$PLUGIN/library/roles/go-build-resolver.md` |
| HarmonyOS or ArkTS | `$PLUGIN/library/roles/harmonyos-app-resolver.md` |
| Java, Maven or Gradle | `$PLUGIN/library/roles/java-build-resolver.md` |
| Kotlin | `$PLUGIN/library/roles/kotlin-build-resolver.md` |
| PyTorch | `$PLUGIN/library/roles/pytorch-build-resolver.md` |
| React or Next.js | `$PLUGIN/library/roles/react-build-resolver.md` |
| Rust | `$PLUGIN/library/roles/rust-build-resolver.md` |
| Swift | `$PLUGIN/library/roles/swift-build-resolver.md` |
| Anything else | the general role only |

Record every build break and its fix in `$RUN/04-implement/log.md` under "Build breaks".
