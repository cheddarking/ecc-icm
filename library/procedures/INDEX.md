# Procedures index

The 94 ECC slash commands, kept verbatim as procedures. In ICM they are not registered commands; a stage contract or the user names one and the agent reads it by path. Many overlap with the engineering stages; prefer the stage contract when one exists.

| Procedure | What it does |
|---|---|
| `$PLUGIN/library/procedures/aside.md` | Answer a quick side question without interrupting or losing context from the current task. Resume work automatically after answering. |
| `$PLUGIN/library/procedures/auto-update.md` | Pull the latest ECC repo changes and reinstall the current managed targets. |
| `$PLUGIN/library/procedures/build-fix.md` | Detect the project build system and incrementally fix build/type errors with minimal safe changes. |
| `$PLUGIN/library/procedures/checkpoint.md` | Create, verify, or list workflow checkpoints after running verification checks. |
| `$PLUGIN/library/procedures/code-review.md` | Code review — local uncommitted changes or GitHub PR (pass PR number/URL for PR mode) |
| `$PLUGIN/library/procedures/cost-report.md` | Generate a local Claude Code cost report from the ECC cost-tracker metrics log. |
| `$PLUGIN/library/procedures/cpp-build.md` | Fix C++ build errors, CMake issues, and linker problems incrementally. Invokes the cpp-build-resolver agent for minimal, surgical fixes. |
| `$PLUGIN/library/procedures/cpp-review.md` | Comprehensive C++ code review for memory safety, modern C++ idioms, concurrency, and security. Invokes the cpp-reviewer agent. |
| `$PLUGIN/library/procedures/cpp-test.md` | Enforce TDD workflow for C++. Write GoogleTest tests first, then implement. Verify coverage with gcov/lcov. |
| `$PLUGIN/library/procedures/ecc-guide.md` | Navigate ECC's current agents, skills, commands, hooks, install profiles, and docs from the live repository surface. |
| `$PLUGIN/library/procedures/epic-claim.md` | Claim an epic issue, stamp coordination state, and sync local ownership. |
| `$PLUGIN/library/procedures/epic-decompose.md` | Break an epic into task children without creating task branches. |
| `$PLUGIN/library/procedures/epic-publish.md` | Publish a validated epic update back to the issue and local cache. |
| `$PLUGIN/library/procedures/epic-review.md` | Mark epic review requested, approved, or changes requested. |
| `$PLUGIN/library/procedures/epic-sync.md` | Sync epic issue bodies, labels, and local coordination snapshots from GitHub. |
| `$PLUGIN/library/procedures/epic-unblock.md` | Sweep blocked epic issues and reopen anything whose dependencies are closed. |
| `$PLUGIN/library/procedures/epic-validate.md` | Validate epic readiness, dependencies, and coordination policy. |
| `$PLUGIN/library/procedures/evolve.md` | Analyze instincts and suggest or generate evolved structures |
| `$PLUGIN/library/procedures/fastapi-review.md` | Review a FastAPI application for architecture, async correctness, dependency injection, Pydantic schemas, security, performance, and testability. |
| `$PLUGIN/library/procedures/feature-dev.md` | Guided feature development with codebase understanding and architecture focus |
| `$PLUGIN/library/procedures/flutter-build.md` | Fix Dart analyzer errors and Flutter build failures incrementally. Invokes the dart-build-resolver agent for minimal, surgical fixes. |
| `$PLUGIN/library/procedures/flutter-review.md` | Review Flutter/Dart code for idiomatic patterns, widget best practices, state management, performance, accessibility, and security. Invokes the flutter-reviewer agent. |
| `$PLUGIN/library/procedures/flutter-test.md` | Run Flutter/Dart tests, report failures, and incrementally fix test issues. Covers unit, widget, golden, and integration tests. |
| `$PLUGIN/library/procedures/gan-build.md` | Run a generator/evaluator build loop for implementation tasks with bounded iterations and scoring. |
| `$PLUGIN/library/procedures/gan-design.md` | Run a generator/evaluator design loop for frontend or visual work with bounded iterations and scoring. |
| `$PLUGIN/library/procedures/go-build.md` | Fix Go build errors, go vet warnings, and linter issues incrementally. Invokes the go-build-resolver agent for minimal, surgical fixes. |
| `$PLUGIN/library/procedures/go-review.md` | Comprehensive Go code review for idiomatic patterns, concurrency safety, error handling, and security. Invokes the go-reviewer agent. |
| `$PLUGIN/library/procedures/go-test.md` | Enforce TDD workflow for Go. Write table-driven tests first, then implement. Verify 80%+ coverage with go test -cover. |
| `$PLUGIN/library/procedures/gradle-build.md` | Fix Gradle build errors for Android and KMP projects |
| `$PLUGIN/library/procedures/harness-audit.md` | Run a deterministic repository harness audit and return a prioritized scorecard. |
| `$PLUGIN/library/procedures/hookify-configure.md` | Enable or disable hookify rules interactively |
| `$PLUGIN/library/procedures/hookify-help.md` | Get help with the hookify system |
| `$PLUGIN/library/procedures/hookify-list.md` | List all configured hookify rules |
| `$PLUGIN/library/procedures/hookify.md` | Create hooks to prevent unwanted behaviors from conversation analysis or explicit instructions |
| `$PLUGIN/library/procedures/instinct-export.md` | Export instincts from project/global scope to a file |
| `$PLUGIN/library/procedures/instinct-import.md` | Import instincts from file or URL into project/global scope |
| `$PLUGIN/library/procedures/instinct-status.md` | Show learned instincts (project + global) with confidence |
| `$PLUGIN/library/procedures/jira.md` | Retrieve a Jira ticket, analyze requirements, update status, or add comments. Uses the jira-integration skill and MCP or REST API. |
| `$PLUGIN/library/procedures/kotlin-build.md` | Fix Kotlin/Gradle build errors, compiler warnings, and dependency issues incrementally. Invokes the kotlin-build-resolver agent for minimal, surgical fixes. |
| `$PLUGIN/library/procedures/kotlin-review.md` | Comprehensive Kotlin code review for idiomatic patterns, null safety, coroutine safety, and security. Invokes the kotlin-reviewer agent. |
| `$PLUGIN/library/procedures/kotlin-test.md` | Enforce TDD workflow for Kotlin. Write Kotest tests first, then implement. Verify 80%+ coverage with Kover. |
| `$PLUGIN/library/procedures/learn-eval.md` | "Extract reusable patterns from the session, self-evaluate quality before saving, and determine the right save location (Global vs Project)." |
| `$PLUGIN/library/procedures/learn.md` | Extract reusable patterns from the current session and save them as candidate skills or guidance. |
| `$PLUGIN/library/procedures/loop-start.md` | Start a managed autonomous loop pattern with safety defaults and explicit stop conditions. |
| `$PLUGIN/library/procedures/loop-status.md` | Inspect active loop state, progress, failure signals, and recommended intervention. |
| `$PLUGIN/library/procedures/marketing-campaign.md` | Plan and execute a full marketing campaign. Accepts a product brief and returns positioning, landing page copy, email sequence, social posts, ad variants, video scripts, and a content calendar. Can al |
| `$PLUGIN/library/procedures/model-route.md` | Recommend the best model tier for the current task based on complexity, risk, and budget. |
| `$PLUGIN/library/procedures/multi-backend.md` | Run a backend-focused multi-model workflow for APIs, algorithms, data, and business logic. |
| `$PLUGIN/library/procedures/multi-execute.md` | Execute a multi-model implementation plan while preserving Claude as the only filesystem writer. |
| `$PLUGIN/library/procedures/multi-frontend.md` | Run a frontend-focused multi-model workflow for components, layouts, animation, and UI polish. |
| `$PLUGIN/library/procedures/multi-plan.md` | Create a multi-model implementation plan without modifying production code. |
| `$PLUGIN/library/procedures/multi-workflow.md` | Run a full multi-model development workflow with research, planning, execution, optimization, and review. |
| `$PLUGIN/library/procedures/orch-add-feature.md` | Orchestrate building a brand-new feature end to end — research, plan, TDD, review, gated commit. Wrapper that kicks off the orch-add-feature skill. |
| `$PLUGIN/library/procedures/orch-build-mvp.md` | Orchestrate bootstrapping a working MVP from a design/spec doc — ingest, slice, scaffold, TDD, review, gated commit (reuses the GAN harness). Wrapper for the orch-build-mvp skill. |
| `$PLUGIN/library/procedures/orch-change-feature.md` | Orchestrate altering an existing, working feature to new desired behavior — update tests to the new spec, change impl, review, gated commit. Wrapper for the orch-change-feature skill. |
| `$PLUGIN/library/procedures/orch-fix-defect.md` | Orchestrate fixing a bug — reproduce it as a failing regression test, fix to green, review, gated commit. Wrapper for the orch-fix-defect skill. |
| `$PLUGIN/library/procedures/orch-refine-code.md` | Orchestrate a behavior-preserving refactor — confirm tests green, restructure without changing behavior, keep green, review, gated commit. Wrapper for the orch-refine-code skill. |
| `$PLUGIN/library/procedures/orch-review.md` | Run the orch-review native Workflow over a diff (local changes or a GitHub PR) and report blocking vs advisory findings. Surface for the orch-review workflow. |
| `$PLUGIN/library/procedures/plan-canvas.md` | Open a plan or HTML artifact in the browser Plan Canvas for annotate-and-approve review |
| `$PLUGIN/library/procedures/plan-prd.md` | "Generate a lean, problem-first PRD and hand off to /plan for implementation planning." |
| `$PLUGIN/library/procedures/plan.md` | Restate requirements, assess risks, and create step-by-step implementation plan. WAIT for user CONFIRM before touching any code. |
| `$PLUGIN/library/procedures/pm2.md` | Analyze a project and generate PM2 service commands for detected frontend, backend, or database services. |
| `$PLUGIN/library/procedures/pr.md` | "Create a GitHub PR from current branch with unpushed commits — discovers templates, analyzes changes, pushes" |
| `$PLUGIN/library/procedures/project-init.md` | Detect a project's stack and produce a dry-run ECC onboarding plan using the repository's install manifests and stack mappings. |
| `$PLUGIN/library/procedures/projects.md` | List known projects and their instinct statistics |
| `$PLUGIN/library/procedures/promote.md` | Promote project-scoped instincts to global scope |
| `$PLUGIN/library/procedures/prp-commit.md` | "Quick commit with natural language file targeting — describe what to commit in plain English" |
| `$PLUGIN/library/procedures/prp-implement.md` | Execute an implementation plan with rigorous validation loops |
| `$PLUGIN/library/procedures/prp-plan.md` | Create comprehensive feature implementation plan with codebase analysis and pattern extraction |
| `$PLUGIN/library/procedures/prp-pr.md` | "Create a GitHub PR from current branch with unpushed commits — discovers templates, analyzes changes, pushes" |
| `$PLUGIN/library/procedures/prp-prd.md` | "Interactive PRD generator - problem-first, hypothesis-driven product spec with back-and-forth questioning" |
| `$PLUGIN/library/procedures/prune.md` | Delete pending instincts older than 30 days that were never promoted |
| `$PLUGIN/library/procedures/python-review.md` | Comprehensive Python code review for PEP 8 compliance, type hints, security, and Pythonic idioms. Invokes the python-reviewer agent. |
| `$PLUGIN/library/procedures/quality-gate.md` | Run the ECC formatter quality gate for a single file and report remediation steps. |
| `$PLUGIN/library/procedures/react-build.md` | Fix React build failures (Vite, webpack, Next.js, CRA, Parcel, esbuild, Bun) incrementally — JSX/TSX compile errors, hydration mismatches, server/client component boundary failures, missing types. Inv |
| `$PLUGIN/library/procedures/react-review.md` | Comprehensive React/JSX code review for hook correctness, render performance, server/client component boundaries, accessibility, and React-specific security. Invokes the react-reviewer agent (and type |
| `$PLUGIN/library/procedures/react-test.md` | Enforce TDD workflow for React. Write React Testing Library tests first (behavior-focused, accessibility-first), then implement components. Detects Vitest or Jest and verifies coverage targets. |
| `$PLUGIN/library/procedures/refactor-clean.md` | Safely identify and remove dead code with verification after each change. |
| `$PLUGIN/library/procedures/resume-session.md` | Load the most recent session file from ~/.claude/session-data/ and resume work with full context from where the last session ended. |
| `$PLUGIN/library/procedures/review-pr.md` | Comprehensive PR review using specialized agents |
| `$PLUGIN/library/procedures/rust-build.md` | Fix Rust build errors, borrow checker issues, and dependency problems incrementally. Invokes the rust-build-resolver agent for minimal, surgical fixes. |
| `$PLUGIN/library/procedures/rust-review.md` | Comprehensive Rust code review for ownership, lifetimes, error handling, unsafe usage, and idiomatic patterns. Invokes the rust-reviewer agent. |
| `$PLUGIN/library/procedures/rust-test.md` | Enforce TDD workflow for Rust. Write tests first, then implement. Verify 80%+ coverage with cargo-llvm-cov. |
| `$PLUGIN/library/procedures/santa-loop.md` | Adversarial dual-review convergence loop — two independent model reviewers must both approve before code ships. |
| `$PLUGIN/library/procedures/save-session.md` | Save current session state to a dated file in ~/.claude/session-data/ so work can be resumed in a future session with full context. |
| `$PLUGIN/library/procedures/security-scan.md` | Run AgentShield against agent, hook, MCP, permission, and secret surfaces. |
| `$PLUGIN/library/procedures/sessions.md` | Manage Claude Code session history, aliases, and session metadata. |
| `$PLUGIN/library/procedures/setup-pm.md` | Configure your preferred package manager (npm/pnpm/yarn/bun) |
| `$PLUGIN/library/procedures/skill-create.md` | Analyze local git history to extract coding patterns and generate SKILL.md files. Local version of the Skill Creator GitHub App. |
| `$PLUGIN/library/procedures/skill-health.md` | Show skill portfolio health dashboard with charts and analytics |
| `$PLUGIN/library/procedures/test-coverage.md` | Analyze coverage, identify gaps, and generate missing tests toward the target threshold. |
| `$PLUGIN/library/procedures/update-codemaps.md` | Scan project structure and generate token-lean architecture codemaps. |
| `$PLUGIN/library/procedures/update-docs.md` | Sync documentation from source-of-truth files such as scripts, schemas, routes, and exports. |
| `$PLUGIN/library/procedures/vue-review.md` | Comprehensive Vue.js code review for Composition API correctness, reactivity, composable patterns, template security, accessibility, and Vue-specific performance. Invokes the vue-reviewer agent (and t |
