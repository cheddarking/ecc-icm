# Roles index

Converted from the 68 ECC agent definitions. A role is reference material (Layer 3) that the single agent loads when a stage contract names it; nothing here is a sub-agent. Load one file and the section the contract points at, never the whole folder.

| Role | Former model | Lines | Description |
|---|---|---:|---|
| `a11y-architect.md` | sonnet | 143 | Accessibility Architect specializing in WCAG 2.2 compliance for Web and Native platforms. Use PROACTIVELY when designing UI components, establishing design syst |
| `agent-evaluator.md` | sonnet | 211 | Evaluates agent output against 5-axis quality rubric (accuracy, completeness, clarity, actionability, conciseness). Use after any non-trivial task when the user |
| `architect.md` | opus | 214 | Software architecture specialist for system design, scalability, and technical decision-making. Use PROACTIVELY when planning new features, refactoring large sy |
| `build-error-resolver.md` | sonnet | 115 | Build and TypeScript error resolution specialist. Use PROACTIVELY when build fails or type errors occur. Fixes build/type errors only with minimal diffs, no arc |
| `chief-of-staff.md` | sonnet | 154 | Personal communication chief of staff that triages email, Slack, LINE, and Messenger. Classifies messages into 4 tiers (skip/info_only/meeting_info/action_requi |
| `code-architect.md` | sonnet | 72 | Designs feature architectures by analyzing existing codebase patterns and conventions, then providing implementation blueprints with concrete files, interfaces, |
| `code-explorer.md` | sonnet | 70 | Deeply analyzes existing codebase features by tracing execution paths, mapping architecture layers, and documenting dependencies to inform new development. |
| `code-reviewer.md` | sonnet | 317 | Expert code review specialist. Proactively reviews code for quality, security, and maintainability. Use immediately after writing or modifying code. MUST BE USE |
| `code-simplifier.md` | sonnet | 48 | Simplifies and refines code for clarity, consistency, and maintainability while preserving behavior. Focus on recently modified code unless instructed otherwise |
| `comment-analyzer.md` | haiku | 46 | Analyze code comments for accuracy, completeness, maintainability, and comment rot risk. |
| `conversation-analyzer.md` | haiku | 53 | Use this agent when analyzing conversation transcripts to find behaviors worth preventing with hooks. Triggered by `hookify` procedure without arguments. |
| `cpp-build-resolver.md` | sonnet | 91 | C++ build, CMake, and compilation error resolution specialist. Fixes build errors, linker issues, and template errors with minimal changes. Use when C++ builds  |
| `cpp-reviewer.md` | sonnet | 69 | Expert C++ code reviewer specializing in memory safety, modern C++ idioms, concurrency, and performance. Use for all C++ code changes. MUST BE USED for C++ proj |
| `csharp-reviewer.md` | sonnet | 98 | Expert C# code reviewer specializing in .NET conventions, async patterns, security, nullable reference types, and performance. Use for all C# code changes. MUST |
| `dart-build-resolver.md` | sonnet | 202 | Dart/Flutter build, analysis, and dependency error resolution specialist. Fixes `dart analyze` errors, Flutter compilation failures, pub dependency conflicts, a |
| `database-reviewer.md` | sonnet | 92 | PostgreSQL database specialist for query optimization, schema design, security, and performance. Use PROACTIVELY when writing SQL, creating migrations, designin |
| `django-build-resolver.md` | sonnet | 242 | Django/Python build, migration, and dependency error resolution specialist. Fixes pip/Poetry errors, migration conflicts, import errors, Django configuration is |
| `django-reviewer.md` | sonnet | 154 | Expert Django code reviewer specializing in ORM correctness, DRF patterns, migration safety, security misconfigurations, and production-grade Django practices.  |
| `doc-updater.md` | haiku | 108 | Documentation and codemap specialist. Use PROACTIVELY for updating codemaps and documentation. Generates docs/CODEMAPS/*, updates READMEs and guides. Backs the  |
| `docs-lookup.md` | haiku | 69 | When the user asks how to use a library, framework, or API or needs up-to-date code examples, use Context7 MCP to fetch current documentation and return answers |
| `e2e-runner.md` | sonnet | 108 | End-to-end testing specialist using Vercel Agent Browser (preferred) with Playwright fallback. Use PROACTIVELY for generating, maintaining, and running E2E test |
| `fastapi-reviewer.md` | sonnet | 73 | Reviews FastAPI applications for async correctness, dependency injection, Pydantic schemas, security, OpenAPI quality, testing, and production readiness. |
| `flutter-reviewer.md` | sonnet | 246 | Flutter and Dart code reviewer. Reviews Flutter code for widget best practices, state management patterns, Dart idioms, performance pitfalls, accessibility, and |
| `fsharp-reviewer.md` | sonnet | 97 | Expert F# code reviewer specializing in functional idioms, type safety, pattern matching, computation expressions, and performance. Use for all F# code changes. |
| `gan-evaluator.md` | sonnet | 225 | "GAN Harness — Evaluator agent. Tests the live running application via Playwright, scores against rubric, and provides actionable feedback to the Generator." |
| `gan-generator.md` | sonnet | 133 | "GAN Harness — Generator agent. Implements features according to the spec, reads evaluator feedback, and iterates until quality threshold is met." |
| `gan-planner.md` | sonnet | 101 | "GAN Harness — Planner role. Expands a one-line prompt into a full product specification with features, sprints, evaluation criteria, and design direction." |
| `go-build-resolver.md` | sonnet | 95 | Go build, vet, and compilation error resolution specialist. Fixes build errors, go vet issues, and linter warnings with minimal changes. Use when Go builds fail |
| `go-reviewer.md` | sonnet | 73 | Expert Go code reviewer specializing in idiomatic Go, concurrency patterns, error handling, and performance. Use for all Go code changes. MUST BE USED for Go pr |
| `harmonyos-app-resolver.md` | sonnet | 174 | HarmonyOS application development expert specializing in ArkTS and ArkUI. Reviews code for V2 state management compliance, Navigation routing patterns, API usag |
| `harness-optimizer.md` | sonnet | 48 | Improve local agent-harness configuration reliability and cost using eval-driven grading (pass@k/pass^k) derived from the eval-harness skill. |
| `healthcare-reviewer.md` | opus | 84 | Reviews healthcare application code for clinical safety, CDSS accuracy, PHI compliance, and medical data integrity. Specialized for EMR/EHR, clinical decision s |
| `homelab-architect.md` | sonnet | 99 | Designs home and small-lab network plans from hardware inventory, goals, and operator experience level, with safe staged changes and rollback guidance. |
| `java-build-resolver.md` | sonnet | 265 | Java/Maven/Gradle build, compilation, and dependency error resolution specialist. Automatically detects Spring Boot or Quarkus and applies framework-specific fi |
| `java-reviewer.md` | sonnet | 184 | Expert Java code reviewer for Spring Boot and Quarkus projects. Automatically detects the framework and applies the appropriate review rules. Covers layered arc |
| `kotlin-build-resolver.md` | sonnet | 119 | Kotlin/Gradle build, compilation, and dependency error resolution specialist. Fixes build errors, Kotlin compiler errors, and Gradle issues with minimal changes |
| `kotlin-reviewer.md` | sonnet | 162 | Kotlin and Android/KMP code reviewer. Reviews Kotlin code for idiomatic patterns, coroutine safety, Compose best practices, clean architecture violations, and c |
| `loop-operator.md` | sonnet | 38 | Operate autonomous agent loops, monitor progress, and intervene safely when loops stall. |
| `marketing-agent.md` | sonnet | 146 | Marketing strategist and copywriter for campaign planning, audience research, positioning, copy creation, and content review. Covers landing pages, email sequen |
| `mle-reviewer.md` | sonnet | 154 | Production machine-learning engineering reviewer for data contracts, feature pipelines, training reproducibility, offline/online evaluation, model serving, moni |
| `network-architect.md` | sonnet | 97 | Designs enterprise or multi-site network architecture from requirements, using existing network skills for focused routing, validation, automation, and troubles |
| `network-config-reviewer.md` | sonnet | 99 | Reviews router and switch configurations for security, correctness, stale references, risky change-window commands, and missing operational guardrails. |
| `network-troubleshooter.md` | sonnet | 121 | Diagnoses network connectivity, routing, DNS, interface, and policy symptoms with a read-only OSI-layer workflow and evidence-backed root cause summary. |
| `opensource-forker.md` | haiku | 199 | Fork any project for open-sourcing. Copies files, strips secrets and credentials (20+ patterns), replaces internal references with placeholders, generates .env. |
| `opensource-packager.md` | haiku | 250 | Generate complete open-source packaging for a sanitized project. Produces CLAUDE.md, setup.sh, README.md, LICENSE, CONTRIBUTING.md, and GitHub issue templates.  |
| `opensource-sanitizer.md` | sonnet | 189 | Verify an open-source fork is fully sanitized before release. Scans for leaked secrets, PII, internal references, and dangerous files using 20+ regex patterns.  |
| `performance-optimizer.md` | sonnet | 447 | Performance analysis and optimization specialist. Use PROACTIVELY for identifying bottlenecks, optimizing slow code, reducing bundle sizes, and improving runtim |
| `php-reviewer.md` | sonnet | 97 | Expert PHP code reviewer specializing in PSR-12 compliance, PHP type system, Eloquent ORM patterns, security, and performance. Use for all PHP code changes. MUS |
| `planner.md` | opus | 215 | Expert planning specialist for complex features and refactoring. Use PROACTIVELY when users request feature implementation, architectural changes, or complex re |
| `pr-test-analyzer.md` | sonnet | 46 | Review pull request test coverage quality and completeness, with emphasis on behavioral coverage and real bug prevention. |
| `python-reviewer.md` | sonnet | 95 | Expert Python code reviewer specializing in PEP 8 compliance, Pythonic idioms, type hints, security, and performance. Use for all Python code changes. MUST BE U |
| `pytorch-build-resolver.md` | sonnet | 121 | PyTorch runtime, CUDA, and training error resolution specialist. Fixes tensor shape mismatches, device errors, gradient issues, DataLoader problems, and mixed p |
| `rag-pipeline-reviewer.md` | sonnet | 53 | Reviews RAG (Retrieval-Augmented Generation) pipelines for retrieval quality, chunking strategy, embedding choices, and evaluation coverage. Invoke when the use |
| `react-build-resolver.md` | sonnet | 207 | Diagnose and fix React build failures across Vite, webpack, Next.js, CRA, Parcel, esbuild, and Bun. Handles JSX/TSX compile errors, hydration mismatches, server |
| `react-reviewer.md` | sonnet | 161 | Expert React/JSX code reviewer specializing in hook correctness, render performance, server/client component boundaries, accessibility, and React-specific secur |
| `refactor-cleaner.md` | sonnet | 86 | Dead code cleanup and consolidation specialist. Use PROACTIVELY for removing unused code, duplicates, and refactoring. Runs analysis tools (knip, depcheck, ts-p |
| `rust-build-resolver.md` | sonnet | 149 | Rust build, compilation, and dependency error resolution specialist. Fixes cargo build errors, borrow checker issues, and Cargo.toml problems with minimal chang |
| `rust-reviewer.md` | sonnet | 90 | Expert Rust code reviewer specializing in ownership, lifetimes, error handling, unsafe usage, and idiomatic patterns. Use for all Rust code changes. MUST BE USE |
| `security-reviewer.md` | sonnet | 109 | Security vulnerability detection and remediation specialist. Use PROACTIVELY after writing code that handles user input, authentication, API endpoints, or sensi |
| `seo-specialist.md` | sonnet | 59 | SEO specialist for technical SEO audits, on-page optimization, structured data, Core Web Vitals, and content/keyword mapping. Use for site audits, meta tag revi |
| `silent-failure-hunter.md` | sonnet | 51 | Review code for silent failures, swallowed errors, bad fallbacks, and missing error propagation. |
| `spec-miner.md` | opus | 205 | Extracts behavioral specs from existing codebases for OpenSpec. Produces flat Requirement and Invariant blocks with structured metadata (entities, enforced, id, |
| `swift-build-resolver.md` | sonnet | 162 | Swift/Xcode build, compilation, and dependency error resolution specialist. Fixes swift build errors, Xcode build failures, SPM dependency issues, and code sign |
| `swift-reviewer.md` | sonnet | 103 | Expert Swift code reviewer specializing in protocol-oriented design, value semantics, ARC memory management, Swift Concurrency, and idiomatic patterns. Use for  |
| `tdd-guide.md` | sonnet | 94 | Test-Driven Development specialist enforcing write-tests-first methodology. Use PROACTIVELY when writing new features, fixing bugs, or refactoring code. Ensures |
| `type-design-analyzer.md` | sonnet | 42 | Analyze type design for encapsulation, invariant expression, usefulness, and enforcement. |
| `typescript-reviewer.md` | sonnet | 101 | Expert TypeScript/JavaScript code reviewer specializing in type safety, async correctness, Node/web security, and idiomatic patterns. Use for all TypeScript and |
| `vue-reviewer.md` | sonnet | 200 | Expert Vue.js code reviewer specializing in Composition API correctness, reactivity pitfalls, component architecture, template security, and Vue-specific perfor |
