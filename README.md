# denver-skills

Denver's reusable Claude Code skills.

## Install

```bash
npx skills@latest add denver/skills
```

This reads the `skills/` folder in this repo and installs the skills into your Claude Code skills directory.

## Skills

- **summarize** — Capture the current session as a durable markdown summary a future agent can resume from. Resolves the destination deterministically (explicit path, then a configured second-brain location, otherwise `./summaries/`).
- **technical-html-slide-builder** — Build standalone dark "command-center" HTML decks and dense roadmap/changelog pages. Copy `assets/base.html`, add a branch stylesheet, fill in content.
