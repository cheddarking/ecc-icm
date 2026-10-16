# Security

For a suspected vulnerability, use GitHub's private vulnerability reporting on this repository if available. Otherwise contact the repository owner through their [GitHub profile](https://github.com/cheddarking) to arrange a private report. Do not put credentials or exploit details in a public issue.

Include the plugin version, relevant stage or hook, a minimal reproduction, and the observed impact. Remove secrets and personal data from transcripts.

The human plan and commit checkpoints are instructions for the agent, not a sandbox or an independently enforced approval system. CLI stage selection can bypass the intended order. The Bash guard blocks a finite set of command patterns and can be disabled. Review generated commands and artifacts, run the explicit verifier, and use Claude Code's permissions for tool access.

Content in `library/` includes executable upstream scripts and integration examples. Only the hooks declared in `hooks/hooks.json` are registered by this plugin; importing a library file does not enable every upstream hook or integration.
