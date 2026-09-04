# Procedures index

The 94 ECC slash commands, kept as procedures. In ICM they are not registered commands; a stage contract or the user names one and the agent reads it by path. Where a procedure overlaps an ecc-icm stage, prefer the stage contract and use the procedure as its reference.

| Procedure | Maps to | What it does |
|---|---|---|
| `$PLUGIN/library/procedures/aside.md` | procedure only | Answer a quick side question without interrupting or losing context from the current task. Resume work automatically after answering. |
| `$PLUGIN/library/procedures/auto-update.md` | procedure only | Pull the latest ECC repo changes and reinstall the current managed targets. |
| `$PLUGIN/library/procedures/build-fix.md` | engineering 04-implement | Detect the project build system and incrementally fix build/type errors with minimal safe changes. |
| `$PLUGIN/library/procedures/checkpoint.md` | verify.js at the current stage | Create, verify, or list workflow checkpoints after running verification checks. |
| `$PLUGIN/library/procedures/code-review.md` | engineering 05-review | Code review — local uncommitted changes or GitHub PR (pass PR number/URL for PR mode) |
| `$PLUGIN/library/procedures/cost-report.md` | harness-ops 01-audit or 02-tune | Generate a local Claude Code cost report from the ECC cost-tracker metrics log. |
| `$PLUGIN/library/procedures/cpp-build.md` | engineering 04-implement | Fix C++ build errors, CMake issues, and linker problems incrementally. Invokes the cpp-build-resolver role for minimal, surgical fixes. |
| `$PLUGIN/library/procedures/cpp-review.md` | engineering 05-review | Comprehensive C++ code review for memory safety, modern C++ idioms, concurrency, and security. Invokes the cpp-reviewer role. |
| `$PLUGIN/library/procedures/cpp-test.md` | engineering 04-implement | Enforce TDD workflow for C++. Write GoogleTest tests first, then implement. Verify coverage with gcov/lcov. |
| `$PLUGIN/library/procedures/ecc-guide.md` | procedure only | Navigate ECC's current agents, skills, commands, hooks, install profiles, and docs from the live repository surface. |
| `$PLUGIN/library/procedures/epic-claim.md` | procedure only | Claim an epic issue, stamp coordination state, and sync local ownership. |
| `$PLUGIN/library/procedures/epic-decompose.md` | procedure only | Break an epic into task children without creating task branches. |
| `$PLUGIN/library/procedures/epic-publish.md` | procedure only | Publish a validated epic update back to the issue and local cache. |
| `$PLUGIN/library/procedures/epic-review.md` | engineering 05-review | Mark epic review requested, approved, or changes requested. |
| `$PLUGIN/library/procedures/epic-sync.md` | procedure only | Sync epic issue bodies, labels, and local coordination snapshots from GitHub. |
| `$PLUGIN/library/procedures/epic-unblock.md` | procedure only | Sweep blocked epic issues and reopen anything whose dependencies are closed. |
| `$PLUGIN/library/procedures/epic-validate.md` | procedure only | Validate epic readiness, dependencies, and coordination policy. |
| `$PLUGIN/library/procedures/evolve.md` | engineering 07-learn or harness-ops 04-learn | Analyze instincts and suggest or generate evolved structures |
| `$PLUGIN/library/procedures/fastapi-review.md` | engineering 05-review | Review a FastAPI application for architecture, async correctness, dependency injection, Pydantic schemas, security, performance, and testability. |
| `$PLUGIN/library/procedures/feature-dev.md` | an engineering run from 01-intake | Guided feature development with codebase understanding and architecture focus |
| `$PLUGIN/library/procedures/flutter-build.md` | engineering 04-implement | Fix Dart analyzer errors and Flutter build failures incrementally. Invokes the dart-build-resolver role for minimal, surgical fixes. |
| `$PLUGIN/library/procedures/flutter-review.md` | engineering 05-review | Review Flutter/Dart code for idiomatic patterns, widget best practices, state management, performance, accessibility, and security. Invokes the flutter-reviewer role. |
| `$PLUGIN/library/procedures/flutter-test.md` | engineering 04-implement | Run Flutter/Dart tests, report failures, and incrementally fix test issues. Covers unit, widget, golden, and integration tests. |
| `$PLUGIN/library/procedures/gan-build.md` | engineering 04-implement | Run a generator/evaluator build loop for implementation tasks with bounded iterations and scoring. |
| `$PLUGIN/library/procedures/gan-design.md` | engineering 03-plan | Run a generator/evaluator design loop for frontend or visual work with bounded iterations and scoring. |
| `$PLUGIN/library/procedures/go-build.md` | engineering 04-implement | Fix Go build errors, go vet warnings, and linter issues incrementally. Invokes the go-build-resolver role for minimal, surgical fixes. |
| `$PLUGIN/library/procedures/go-review.md` | engineering 05-review | Comprehensive Go code review for idiomatic patterns, concurrency safety, error handling, and security. Invokes the go-reviewer role. |
| `$PLUGIN/library/procedures/go-test.md` | engineering 04-implement | Enforce TDD workflow for Go. Write table-driven tests first, then implement. Verify 80%+ coverage with go test -cover. |
| `$PLUGIN/library/procedures/gradle-build.md` | engineering 04-implement | Fix Gradle build errors for Android and KMP projects |
| `$PLUGIN/library/procedures/harness-audit.md` | harness-ops 01-audit or 02-tune | Run a deterministic repository harness audit and return a prioritized scorecard. |
| `$PLUGIN/library/procedures/hookify-configure.md` | harness-ops 01-audit or 02-tune | Enable or disable hookify rules interactively |
| `$PLUGIN/library/procedures/hookify-help.md` | harness-ops 01-audit or 02-tune | Get help with the hookify system |
| `$PLUGIN/library/procedures/hookify-list.md` | harness-ops 01-audit or 02-tune | List all configured hookify rules |
| `$PLUGIN/library/procedures/hookify.md` | harness-ops 01-audit or 02-tune | Create hooks to prevent unwanted behaviors from conversation analysis or explicit instructions |
| `$PLUGIN/library/procedures/instinct-export.md` | engineering 07-learn or harness-ops 04-learn | Export instincts from project/global scope to a file |
| `$PLUGIN/library/procedures/instinct-import.md` | engineering 07-learn or harness-ops 04-learn | Import instincts from file or URL into project/global scope |
| `$PLUGIN/library/procedures/instinct-status.md` | engineering 07-learn or harness-ops 04-learn | Show learned instincts (project + global) with confidence |
| `$PLUGIN/library/procedures/jira.md` | procedure only | Retrieve a Jira ticket, analyze requirements, update status, or add comments. Uses the jira-integration skill and MCP or REST API. |
| `$PLUGIN/library/procedures/kotlin-build.md` | engineering 04-implement | Fix Kotlin/Gradle build errors, compiler warnings, and dependency issues incrementally. Invokes the kotlin-build-resolver role for minimal, surgical fixes. |
| `$PLUGIN/library/procedures/kotlin-review.md` | engineering 05-review | Comprehensive Kotlin code review for idiomatic patterns, null safety, coroutine safety, and security. Invokes the kotlin-reviewer role. |
| `$PLUGIN/library/procedures/kotlin-test.md` | engineering 04-implement | Enforce TDD workflow for Kotlin. Write Kotest tests first, then implement. Verify 80%+ coverage with Kover. |
| `$PLUGIN/library/procedures/learn-eval.md` | engineering 07-learn or harness-ops 04-learn | "Extract reusable patterns from the session, self-evaluate quality before saving, and determine the right save location (Global vs Project)." |
| `$PLUGIN/library/procedures/learn.md` | engineering 07-learn or harness-ops 04-learn | Extract reusable patterns from the current session and save them as candidate skills or guidance. |
| `$PLUGIN/library/procedures/loop-start.md` | procedure only | Start a managed autonomous loop pattern with safety defaults and explicit stop conditions. |
| `$PLUGIN/library/procedures/loop-status.md` | procedure only | Inspect active loop state, progress, failure signals, and recommended intervention. |
| `$PLUGIN/library/procedures/marketing-campaign.md` | content workspace | Plan and execute a full marketing campaign. Accepts a product brief and returns positioning, landing page copy, email sequence, social posts, ad variants, video scripts, and a cont |
| `$PLUGIN/library/procedures/model-route.md` | harness-ops 01-audit or 02-tune | Recommend the best model tier for the current task based on complexity, risk, and budget. |
| `$PLUGIN/library/procedures/multi-backend.md` | an engineering run from 01-intake | Run a backend-focused multi-model workflow for APIs, algorithms, data, and business logic. |
| `$PLUGIN/library/procedures/multi-execute.md` | an engineering run from 01-intake | Execute a multi-model implementation plan while preserving Claude as the only filesystem writer. |
| `$PLUGIN/library/procedures/multi-frontend.md` | an engineering run from 01-intake | Run a frontend-focused multi-model workflow for components, layouts, animation, and UI polish. |
| `$PLUGIN/library/procedures/multi-plan.md` | engineering 03-plan | Create a multi-model implementation plan without modifying production code. |
| `$PLUGIN/library/procedures/multi-workflow.md` | an engineering run from 01-intake | Run a full multi-model development workflow with research, planning, execution, optimization, and review. |
| `$PLUGIN/library/procedures/orch-add-feature.md` | an engineering run from 01-intake | Orchestrate building a brand-new feature end to end — research, plan, TDD, review, gated commit. Wrapper that kicks off the orch-add-feature skill. |
| `$PLUGIN/library/procedures/orch-build-mvp.md` | an engineering run from 01-intake | Orchestrate bootstrapping a working MVP from a design/spec doc — ingest, slice, scaffold, TDD, review, gated commit (reuses the GAN harness). Wrapper for the orch-build-mvp skill. |
| `$PLUGIN/library/procedures/orch-change-feature.md` | an engineering run from 01-intake | Orchestrate altering an existing, working feature to new desired behavior — update tests to the new spec, change impl, review, gated commit. Wrapper for the orch-change-feature ski |
| `$PLUGIN/library/procedures/orch-fix-defect.md` | an engineering run from 01-intake | Orchestrate fixing a bug — reproduce it as a failing regression test, fix to green, review, gated commit. Wrapper for the orch-fix-defect skill. |
| `$PLUGIN/library/procedures/orch-refine-code.md` | an engineering run from 01-intake | Orchestrate a behavior-preserving refactor — confirm tests green, restructure without changing behavior, keep green, review, gated commit. Wrapper for the orch-refine-code skill. |
| `$PLUGIN/library/procedures/orch-review.md` | engineering 05-review | Run the orch-review native Workflow over a diff (local changes or a GitHub PR) and report blocking vs advisory findings. Surface for the orch-review workflow. |
| `$PLUGIN/library/procedures/plan-canvas.md` | procedure only | Open a plan or HTML artifact in the browser Plan Canvas for annotate-and-approve review |
| `$PLUGIN/library/procedures/plan-prd.md` | engineering 03-plan | "Generate a lean, problem-first PRD and hand off to `plan` procedure for implementation planning." |
| `$PLUGIN/library/procedures/plan.md` | engineering 03-plan | Restate requirements, assess risks, and create step-by-step implementation plan. WAIT for user CONFIRM before touching any code. |
| `$PLUGIN/library/procedures/pm2.md` | procedure only | Analyze a project and generate PM2 service commands for detected frontend, backend, or database services. |
| `$PLUGIN/library/procedures/pr.md` | engineering 06-commit | "Create a GitHub PR from current branch with unpushed commits — discovers templates, analyzes changes, pushes" |
| `$PLUGIN/library/procedures/project-init.md` | procedure only | Detect a project's stack and produce a dry-run ECC onboarding plan using the repository's install manifests and stack mappings. |
| `$PLUGIN/library/procedures/projects.md` | status.js and the run folder | List known projects and their instinct statistics |
| `$PLUGIN/library/procedures/promote.md` | engineering 07-learn or harness-ops 04-learn | Promote project-scoped instincts to global scope |
| `$PLUGIN/library/procedures/prp-commit.md` | engineering 06-commit | "Quick commit with natural language file targeting — describe what to commit in plain English" |
| `$PLUGIN/library/procedures/prp-implement.md` | engineering 04-implement | Execute an implementation plan with rigorous validation loops |
| `$PLUGIN/library/procedures/prp-plan.md` | engineering 03-plan | Create comprehensive feature implementation plan with codebase analysis and pattern extraction |
| `$PLUGIN/library/procedures/prp-pr.md` | engineering 06-commit | "Create a GitHub PR from current branch with unpushed commits — discovers templates, analyzes changes, pushes" |
| `$PLUGIN/library/procedures/prp-prd.md` | engineering 03-plan | "Interactive PRD generator - problem-first, hypothesis-driven product spec with back-and-forth questioning" |
| `$PLUGIN/library/procedures/prune.md` | harness-ops 01-audit or 02-tune | Delete pending instincts older than 30 days that were never promoted |
| `$PLUGIN/library/procedures/python-review.md` | engineering 05-review | Comprehensive Python code review for PEP 8 compliance, type hints, security, and Pythonic idioms. Invokes the python-reviewer role. |
| `$PLUGIN/library/procedures/quality-gate.md` | verify.js at the current stage | Run the ECC formatter quality gate for a single file and report remediation steps. |
| `$PLUGIN/library/procedures/react-build.md` | engineering 04-implement | Fix React build failures (Vite, webpack, Next.js, CRA, Parcel, esbuild, Bun) incrementally — JSX/TSX compile errors, hydration mismatches, server/client component boundary failures |
| `$PLUGIN/library/procedures/react-review.md` | engineering 05-review | Comprehensive React/JSX code review for hook correctness, render performance, server/client component boundaries, accessibility, and React-specific security. Invokes the react-revi |
| `$PLUGIN/library/procedures/react-test.md` | engineering 04-implement | Enforce TDD workflow for React. Write React Testing Library tests first (behavior-focused, accessibility-first), then implement components. Detects Vitest or Jest and verifies cove |
| `$PLUGIN/library/procedures/refactor-clean.md` | an engineering run from 01-intake | Safely identify and remove dead code with verification after each change. |
| `$PLUGIN/library/procedures/resume-session.md` | status.js and the run folder | Load the most recent session file from ~/.claude/session-data/ and resume work with full context from where the last session ended. |
| `$PLUGIN/library/procedures/review-pr.md` | engineering 05-review | Comprehensive PR review using specialized agents |
| `$PLUGIN/library/procedures/rust-build.md` | engineering 04-implement | Fix Rust build errors, borrow checker issues, and dependency problems incrementally. Invokes the rust-build-resolver role for minimal, surgical fixes. |
| `$PLUGIN/library/procedures/rust-review.md` | engineering 05-review | Comprehensive Rust code review for ownership, lifetimes, error handling, unsafe usage, and idiomatic patterns. Invokes the rust-reviewer role. |
| `$PLUGIN/library/procedures/rust-test.md` | engineering 04-implement | Enforce TDD workflow for Rust. Write tests first, then implement. Verify 80%+ coverage with cargo-llvm-cov. |
| `$PLUGIN/library/procedures/santa-loop.md` | an engineering run from 01-intake | Adversarial dual-review convergence loop — two independent model reviewers must both approve before code ships. |
| `$PLUGIN/library/procedures/save-session.md` | status.js and the run folder | Save current session state to a dated file in ~/.claude/session-data/ so work can be resumed in a future session with full context. |
| `$PLUGIN/library/procedures/security-scan.md` | security workspace | Run AgentShield against agent, hook, MCP, permission, and secret surfaces. |
| `$PLUGIN/library/procedures/sessions.md` | status.js and the run folder | Manage Claude Code session history, aliases, and session metadata. |
| `$PLUGIN/library/procedures/setup-pm.md` | procedure only | Configure your preferred package manager (npm/pnpm/yarn/bun) |
| `$PLUGIN/library/procedures/skill-create.md` | procedure only | Analyze local git history to extract coding patterns and generate SKILL.md files. Local version of the Skill Creator GitHub App. |
| `$PLUGIN/library/procedures/skill-health.md` | harness-ops 01-audit or 02-tune | Show skill portfolio health dashboard with charts and analytics |
| `$PLUGIN/library/procedures/test-coverage.md` | verify.js at the current stage | Analyze coverage, identify gaps, and generate missing tests toward the target threshold. |
| `$PLUGIN/library/procedures/update-codemaps.md` | procedure only | Scan project structure and generate token-lean architecture codemaps. |
| `$PLUGIN/library/procedures/update-docs.md` | procedure only | Sync documentation from source-of-truth files such as scripts, schemas, routes, and exports. |
| `$PLUGIN/library/procedures/vue-review.md` | engineering 05-review | Comprehensive Vue.js code review for Composition API correctness, reactivity, composable patterns, template security, accessibility, and Vue-specific performance. Invokes the vue-r |

## Legacy shims

ECC kept 12 older commands as thin shims that point at skills. Library text that names them still resolves here.

| Shim | Maps to | What it does |
|---|---|---|
| `$PLUGIN/library/legacy-command-shims/commands/agent-sort.md` | procedure only | Legacy slash-entry shim for the agent-sort skill. Prefer the skill directly. |
| `$PLUGIN/library/legacy-command-shims/commands/claw.md` | procedure only | Legacy slash-entry shim for the nanoclaw-repl skill. Prefer the skill directly. |
| `$PLUGIN/library/legacy-command-shims/commands/context-budget.md` | harness-ops 01-audit | Legacy slash-entry shim for the context-budget skill. Prefer the skill directly. |
| `$PLUGIN/library/legacy-command-shims/commands/devfleet.md` | procedure only | Legacy slash-entry shim for the claude-devfleet skill. Prefer the skill directly. |
| `$PLUGIN/library/legacy-command-shims/commands/docs.md` | procedure only | Legacy slash-entry shim for the documentation-lookup skill. Prefer the skill directly. |
| `$PLUGIN/library/legacy-command-shims/commands/e2e.md` | engineering 04-implement | Legacy slash-entry shim for the e2e-testing skill. Prefer the skill directly. |
| `$PLUGIN/library/legacy-command-shims/commands/eval.md` | procedure only | Legacy slash-entry shim for the eval-harness skill. Prefer the skill directly. |
| `$PLUGIN/library/legacy-command-shims/commands/orchestrate.md` | an engineering run from 01-intake | Legacy slash-entry shim for dmux-workflows and autonomous-agent-harness. Prefer the skills directly. |
| `$PLUGIN/library/legacy-command-shims/commands/prompt-optimize.md` | procedure only | Legacy slash-entry shim for the prompt-optimizer skill. Prefer the skill directly. |
| `$PLUGIN/library/legacy-command-shims/commands/rules-distill.md` | harness-ops 02-tune | Legacy slash-entry shim for the rules-distill skill. Prefer the skill directly. |
| `$PLUGIN/library/legacy-command-shims/commands/tdd.md` | engineering 04-implement | Legacy slash-entry shim for the tdd-workflow skill. Prefer the skill directly. |
| `$PLUGIN/library/legacy-command-shims/commands/verify.md` | verify.js at the current stage | Legacy slash-entry shim for the verification-loop skill. Prefer the skill directly. |
