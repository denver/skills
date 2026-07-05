# denver-skills

Denver's reusable Claude Code skills. This repo works as both a Claude Code plugin/marketplace and a skills.sh source, so install it whichever way fits.

## Install

### Claude Code (plugin)

```
/plugin marketplace add denver/skills
/plugin install denver-skills@denver-skills
```

Skills install namespaced, e.g. `denver-skills:summarize`. Versioned updates track `plugin.json` / commit SHA.

### Any agent (skills CLI)

```bash
npx skills@latest add denver/skills
```

Reads the `skills/` folder and copies each skill into your agent's skills directory. Cross-agent (Claude Code, Cursor, Codex, ...); snapshot, not versioned.

## Skills

- **summarize** — Capture the current session as a durable markdown summary a future agent can resume from. Resolves the destination deterministically (explicit path, then a configured second-brain location, otherwise `./summaries/`).
- **technical-html-slide-builder** — Build standalone dark "command-center" HTML decks and dense roadmap/changelog pages. Copy `assets/base.html`, add a branch stylesheet, fill in content.

## Layout

```
.claude-plugin/
  plugin.json         # marks the repo as a plugin
  marketplace.json    # lists this repo's plugin (self-catalog)
skills/
  summarize/SKILL.md
  technical-html-slide-builder/SKILL.md
```
