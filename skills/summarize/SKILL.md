---
name: summarize
description: Summarize the current session into a durable markdown file a future agent can pick up from. Use when the user types /summarize or asks to log, capture, or save the session; when a session is wrapping up; or when a session-end hook or another skill requests a capture. Writes to the user's configured second-brain location, falling back to ./summaries/.
metadata:
  short-description: Capture the session as a durable markdown summary
---

# Summarize

Capture the current session as a markdown artifact a future agent can read to reconstruct what happened and continue the work. Destination is the user's **second-brain** when configured, otherwise the repo.

## Steps

1. **Gather.** Reconstruct the session: the goal, the key decisions and why they were made, files changed, commands run and their outcomes, the current state, and open threads. Completion criterion: a fresh agent with no other context could resume the work from this file alone.

2. **Resolve destination.** Walk this order and stop at the first hit:
   1. An explicit path passed in the invocation → use it.
   2. The configured **second-brain** location — the base path and subfolder routing the user set in their CLAUDE.md or memory (e.g. "session summaries go in `~/second-brain/sessions/`") → use it, silently. Pick the subfolder that matches what you are summarizing.
   3. Nothing configured, and you are interactive → **ask the user where it should go**, and offer to save that location to CLAUDE.md so future runs resolve silently. Do not skip to the fallback.
   4. Nothing configured, and you are non-interactive (a hook) → `./summaries/` in the current repo, created if missing.

   Cases 1 and 2 never prompt, so hooks never hang. Case 3 always prompts — the fallback is only for the unattended case 4.

3. **Write.** Name the file `YYYY-MM-DD-<slug>.md` (slug = short kebab-case of the session topic) using the current date. Follow the template below. If that filename already exists, suffix `-2`, `-3`, and note it in your report rather than overwriting.

4. **Report.** State the path written in one line.

## Summary template

```markdown
---
date: <YYYY-MM-DD>
project: <repo or area>
branch: <git branch>
tags: [<topic>, ...]
session: <session link if available>
---

# <Session title>

## Goal
What we set out to do.

## What happened
Key decisions and the reasoning behind them.

## Changes
- Files, commands, and outcomes.

## State
Where things stand now.

## Next
Open threads and next steps.
```

## Notes

- The second-brain base path and subfolder routing live in the user's CLAUDE.md or memory. This skill reads that config; it does not define it.
- Hook-friendly by design: with a location known, it resolves and writes without prompting, so a session-end hook can call it unattended.
