#!/usr/bin/env bash
# Rebuild library/ from an ECC checkout. Mirrors ECC's tree under library/
# with two renames (agents -> roles, commands -> procedures), then runs the
# role converter, the reference adapter and the index generator.
#
# Usage: scripts/icm/sync-library.sh <path-to-ECC-checkout>
#
# What is mirrored verbatim: skills, rules, commands (as procedures), scripts,
# hooks, mcp-configs, contexts, scaffolds, docs (English only), .agents (the
# Codex mirror), the three writing guides, ECC's root markdown (CLAUDE.md,
# AGENTS.md and the READMEs get an ECC- prefix so no harness auto-loads them),
# package.json (for the scripts' npm dependencies), LICENSE and the install
# module manifest. Agents are converted to roles. Nothing else from ECC is
# copied: ecc2, src, tests, integrations, examples and translations stay out.
set -euo pipefail

ECC="${1:?usage: sync-library.sh <ecc-checkout>}"
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
LIB="$ROOT/library"
mkdir -p "$LIB/_meta"

if ! command -v rsync >/dev/null 2>&1; then
  echo "rsync is required" >&2
  exit 1
fi

mirror() { # mirror <src> <dst> [extra rsync args...]
  local src="$1" dst="$2"; shift 2
  mkdir -p "$dst"
  rsync -a --delete --exclude node_modules --exclude .git "$@" "$src/" "$dst/"
}

mirror "$ECC/skills"      "$LIB/skills"     --exclude 'INDEX-*.md'
mirror "$ECC/rules"       "$LIB/rules"      --exclude INDEX.md
mirror "$ECC/commands"    "$LIB/procedures" --exclude INDEX.md
mirror "$ECC/scripts"     "$LIB/scripts"
mirror "$ECC/hooks"       "$LIB/hooks"
mirror "$ECC/mcp-configs" "$LIB/mcp-configs"
mirror "$ECC/contexts"    "$LIB/contexts"
mirror "$ECC/scaffolds"   "$LIB/scaffolds"
mirror "$ECC/.agents"     "$LIB/.agents"
mirror "$ECC/docs"        "$LIB/docs" \
  --exclude de-DE --exclude es --exclude ja-JP --exclude ko-KR --exclude pt-BR --exclude ru \
  --exclude th --exclude tr --exclude uk-UA --exclude ur --exclude vi-VN --exclude zh-CN --exclude zh-TW

for f in "$ECC"/*.md; do
  name="$(basename "$f")"
  case "$name" in
    CLAUDE.md|AGENTS.md|README.md|README.zh-CN.md) cp "$f" "$LIB/ECC-$name" ;;
    *) cp "$f" "$LIB/$name" ;;
  esac
done
cp "$ECC/package.json" "$LIB/package.json"
cp "$ECC/LICENSE" "$LIB/_meta/LICENSE-ECC.txt"
cp "$ECC/manifests/install-modules.json" "$LIB/_meta/ecc-install-modules.json"
git -C "$ECC" rev-parse HEAD > "$LIB/_meta/ecc-source-commit.txt"

node "$ROOT/scripts/icm/convert-roles.js" "$ECC" "$LIB/roles"
node "$ROOT/scripts/icm/adapt-library.js" "$ROOT"
node "$ROOT/scripts/icm/build-library-index.js" "$ROOT"

echo "library synced from $(cat "$LIB/_meta/ecc-source-commit.txt")"
