---
name: icm
description: ECC-ICM single-agent pipeline. Use for setup, new <slug>, run <stage>, next, status, verify <stage>, or when the user starts a code change, research question, content piece, security review, or harness audit and no run exists yet.
---

# icm

One agent, folder-routed. The map is the plugin's `CLAUDE.md`, injected at session start as the block that begins `[ECC-ICM] Plugin root:`. If that block is not in context, read `CLAUDE.md` at the plugin root printed there, or at the checkout root.

## Steps

1. Find the plugin root in the `[ECC-ICM]` block. Call it `$PLUGIN`.
2. If the user typed a trigger (`setup`, `new`, `run`, `next`, `status`, `verify`), do what the Triggers table in `CLAUDE.md` says for it, and stop.
3. Otherwise pick the workspace from the Routing table, read its `CONTEXT.md`, and then only the one stage contract it points to.
4. Follow that contract's Inputs, Process, Checkpoints, Audit and Outputs. Write the output file into `$RUN/<stage>/`. Do not read ahead.
5. At a gate, present the output and wait for the human.

Arguments: `$ARGUMENTS` is the trigger and its parameters, for example `new add-rate-limit` or `run 05-review`.
