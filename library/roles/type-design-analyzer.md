# Role: type-design-analyzer

Source: ECC $PLUGIN/library/roles/type-design-analyzer.md (MIT, Affaan Mustafa). Converted to an ICM role reference: the single agent loads this when a stage contract names it. Former sub-agent model hint: sonnet. Former tools: Read, Grep, Glob.

Description: Analyze type design for encapsulation, invariant expression, usefulness, and enforcement.

---
## Evaluation Criteria

### 1. Encapsulation

- are internal details hidden
- can invariants be violated from outside

### 2. Invariant Expression

- do the types encode business rules
- are impossible states prevented at the type level

### 3. Invariant Usefulness

- do these invariants prevent real bugs
- are they aligned with the domain

### 4. Enforcement

- are invariants enforced by the type system
- are there easy escape hatches

## Output Format

For each type reviewed:

- type name and location
- scores for the four dimensions
- overall assessment
- specific improvement suggestions

---
<!-- ecc-icm-notes -->
ECC-ICM notes: Roles named above are files under `$PLUGIN/library/roles/`. ecc-icm runs one agent: take a role in this context by loading its file. Do not spawn or delegate unless the current stage contract says `Delegate: yes`; the Agent tool is gated by a hook.
