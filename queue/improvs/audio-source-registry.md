# Improv Audio Source Registry — 2026-09-20

Six master recordings were provided by Oliver (uploaded in chat). The raw MP3 binaries are **not** committed to Git on purpose: they stay in Drive/local storage, and this registry is their canonical pointer (~49 MB total; Git is for versioned text and analysis, not masters).

| File | Duration | Tempo (est.) | Key read | Packet | First-pass verdict |
|---|---|---|---|---|---|
| `a_place_for_us.mp3` | 03:17 | ~134 BPM (unverified) | B minor / G major | `queue/improvs/A-PLACE-FOR-US/` | Tight song demo (vocal + piano); clearest chorus structure |
| `improv_1.mp3` | 06:01 | ~104 BPM (unverified) | F minor / E-flat cluster | `queue/improvs/IMPROV-001/` | Extended improv of the same tune — extra freestyle verses; **honest-document candidate** |
| `improv_2.mp3` | 05:23 | ~134 BPM (unverified) | E minor / C major | `queue/improvs/IMPROV-002/` | Diatonic C/Em-centered improv; candidate technical document |
| `improv_3.mp3` | 11:42 | ~134 BPM (unverified) | C major / E minor | `queue/improvs/IMPROV-003/` | Instrumental-dominant; candidate transformation packet |
| `a_losing_circle.mp3` | 16:05 | ~104 BPM (unverified) | C major / E minor | `queue/improvs/A-LOSING-CIRCLE/` | Long, patient improv; Em7–Fmaj7 color apparent in later blocks |
| `nice_improv.mp3` | 21:12 | ~67 BPM (unverified) | C major / G major | `queue/improvs/NICE-IMPROV/` | Longest take; ballad tempo; whole-arc listen required |

## Relation note

`a_place_for_us.mp3` and `improv_1.mp3` share the same lyric/chord world — improv_1 is the long raw improvisation that the 3:17 take condenses. Treat them as one musical family: improv_1 documents discovery, a_place_for_us documents resolution.

## Rules

1. Masters stay outside Git (Drive or local). Pointers + analysis + derivatives live here.
2. Anything labeled AI-DRAFT must be verified by ear before appearing in public content.
3. If a master is ever committed, it goes into `queue/improvs/<PACKET>/00-original/`.
