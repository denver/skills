# Themes

A theme is a single `:root {}` override block. Tokens only: no selectors, no
component rules, no hex anywhere else. Every component in the system reads
CSS custom properties, so swapping the block reskins the whole deck or page.

## How to apply

The default needs nothing; `midnight.css` is the palette the base already
ships. To theme, paste a theme's `:root` block into your copied skeleton
directly after the base `:root` block. The later declaration wins, and any
token a theme does not set falls through to the base value.

## Token contract

A theme may override any subset of these tokens:

| Token | Role |
|---|---|
| `--bg` | Page background |
| `--surface` | Card and table background |
| `--surface-raised` | Table headers, numbered badges |
| `--border` / `--border-hover` | Card and table borders (accent-tinted rgba) |
| `--text` / `--text-muted` | Body and secondary text |
| `--accent` / `--accent-light` / `--accent-deep` | Brand accent ramp |
| `--accent-glow` | Accent halo (rgba of the accent) |
| `--accent-rgb` | RGB channels of `--accent`, used by rgba() tints |
| `--bg-rgb` | RGB channels of `--bg`, used by translucent surfaces |
| `--violet` / `--green` / `--red` / `--amber` | Semantic status colors |
| `--font-display` / `--font-body` | Type, if the theme changes it |

Derived tokens must stay consistent: `--accent-rgb` is the channel triple of
`--accent`, `--bg-rgb` of `--bg`, and `--border`, `--border-hover`, and
`--accent-glow` are rgba() tints of the accent. Never leave a theme's accent
pointing at another theme's tints.

## Contrast floor

Themes must meet WCAG AA before they ship:

- `--text` against `--bg`: at least 4.5:1
- `--text-muted` against `--surface`: at least 4.5:1

Check any accent used as text (`--accent-light` carries labels, arrows, and
numbered badges) against `--surface` for at least 4.5:1 as well.
