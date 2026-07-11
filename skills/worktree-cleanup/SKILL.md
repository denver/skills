---
name: worktree-cleanup
description: Judge whether the current git worktree is stale — clean, pushed, and already merged — and remove it once the user says yes. Use when the user asks whether a worktree or branch is safe to delete, says they are done with a branch, or wants to clean up a worktree; and when another skill finishes a branch and needs to know whether the workspace can go.
metadata:
  short-description: Judge whether a worktree is stale, then remove it on the user's say-so
---

# worktree-cleanup

A worktree is **stale** when it holds nothing the user would miss:

- no uncommitted changes, tracked or untracked
- no unpushed commits
- its branch already landed in the base branch

Stale is the only verdict that permits removal. Every other verdict ends in a diff.

Run all four steps in order. A verdict is worth exactly as much as the weakest probe behind it, so never report one while a check is still unrun.

## 1. Locate

```bash
git rev-parse --show-toplevel --git-dir --git-common-dir --abbrev-ref HEAD
git fetch --quiet origin
```

- **Main checkout** (`--git-dir` equals `--git-common-dir`): stop. This is the user's primary clone, not a disposable worktree. Say so and do nothing else.
- **Detached HEAD**: stop. There is no branch to judge a merge against.
- **Base branch**: `git symbolic-ref --short refs/remotes/origin/HEAD`, falling back to `origin/main` then `origin/master`.

The fetch is the skill's only network call, and it is what makes the merge probes trustworthy — a stale `origin/main` reports landed work as unmerged.

Done when you hold the worktree path, the main checkout path, the branch name, and the base branch.

## 2. Clean?

```bash
git status --porcelain              # any output => uncommitted or untracked work
git rev-parse --abbrev-ref --symbolic-full-name @{u}   # no upstream => never pushed
git log @{u}..HEAD --oneline        # any output => unpushed commits
```

A branch with no upstream is not clean: nothing about it exists anywhere but this disk.

Done when you can name every uncommitted file and every unpushed commit, or state that there are none.

## 3. Merged?

Three probes, cheapest first. Stop at the first that proves the branch landed, and remember which one did — the verdict quotes it as evidence.

**Ancestry** — catches merge commits and fast-forwards.

```bash
git merge-base --is-ancestor HEAD "$base"
```

**Squash / rebase** — the probe that earns its keep. A squash merge rewrites the branch into one new commit, so ancestry, `git branch --merged`, and raw `git cherry` all report landed work as unmerged, forever. Synthesize a commit carrying the branch's tree on top of the merge-base and ask git whether that patch is already applied upstream:

```bash
mb=$(git merge-base "$base" HEAD)
synthetic=$(git commit-tree "$(git rev-parse HEAD^{tree})" -p "$mb" -m _)
git cherry "$base" "$synthetic"     # leading "-" => already applied => merged
```

**PR state** — authoritative when it answers.

```bash
gh pr view --json state,mergedAt,url
```

`MERGED` means merged. Without `gh`, or on a non-GitHub remote, report this probe as **skipped** in the verdict. A skipped probe is not a passed probe: say which checks actually ran.

Done when you have a merged/not-merged answer and the name of the probe that produced it.

## 4. Verdict

### Stale — clean and merged

Report the green light with its evidence: which probe proved the merge, that the tree is clean, that nothing is unpushed, and which probes were skipped. Then ask whether to remove the worktree. Wait for a yes.

On yes, run both commands from the **main checkout**, with absolute paths:

```bash
git -C "$main" worktree remove "$worktree"
git -C "$main" branch -d "$branch"
```

Then tell the user their shell is now sitting in a deleted directory and they should `cd` out of it.

`branch -d` deletes a squash-merged branch as long as its upstream still exists, warning that it is merged to `origin/<branch>` but not to HEAD. That warning is expected; it is not a failure. But when the remote branch is gone — GitHub deletes the head branch on merge — `-d` refuses, because by its own reckoning the commits live nowhere. The squash probe already proved they landed, so report the refusal and name `git branch -D` as the follow-up rather than running it. The worktree is gone either way; the branch is a dangling label.

### Not stale — anything else

Name the blocker in concrete terms: *3 unpushed commits*, *uncommitted changes in 2 files*, *branch never merged into origin/main*. Then show the work that is at risk:

```bash
git status --short                  # uncommitted changes
git log @{u}..HEAD --oneline        # unpushed commits
git diff "$base"...HEAD             # work that never landed
```

Offer no removal command. The next move belongs to the user: push, open a PR, or discard.

## Guardrail

Removal fires only on a stale verdict plus an explicit yes. A worktree that is not stale is not removable through this skill — there is no force path, and `git worktree remove` is not a substitute for one. It refuses on dirty and untracked files but happily deletes a worktree holding unpushed commits, so the checks above are the only thing standing between unpushed work and its destruction.
