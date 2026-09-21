# AI-DRAFT Analysis — `improv_3.mp3`

> Status: **AI-DRAFT** — generated locally with librosa (`scripts/audio-analysis/analyze_improv.py`). Verify every claim by ear before publishing. Nothing here is truth yet.

**Packet:** `queue/improvs/IMPROV-003`  
**Role:** Improv 3 — 11:42 instrumental; candidate transformation packet.  
**Analyzed:** 2026-09-20

## Global read

- Duration: **11:42**
- Tempo: ~**133.9 BPM** — low confidence; verify by tapping.
- Key estimate: **C major** (0.74) — alt: **E minor** (0.72), A minor (0.60). Very close top two — the global key read is genuinely unresolved; section-by-section listening will likely show different local centers.

## Detected section boundaries

`00:00`, `00:26`, `02:30`, `02:53`, `08:18`

## Chord timeline (8 s blocks, condensed runs)

| From | To | Chord guess |
|---|---|---|
| 00:00 | 00:00 | Amaj7 |
| 00:08 | 00:08 | Dmaj7 |
| 00:16 | 00:16 | Amaj7 |
| 00:24 | 00:24 | G#m7 |
| 00:32 | 00:32 | E |
| 00:40 | 00:40 | G#m7 |
| 00:48 | 00:48 | D#m7 |
| 00:56 | 00:56 | G#m7 |
| 01:04 | 01:04 | Bmaj7 |
| 01:12 | 01:20 | C#m7 |
| 01:28 | 01:28 | Bmaj7 |
| 01:36 | 01:36 | D#m7 |
| 01:44 | 02:00 | C#m7 |
| 02:09 | 02:17 | G#m7 |
| 02:25 | 02:49 | Emaj7 |
| 02:57 | 03:21 | Cmaj7 |
| 03:29 | 03:29 | Fmaj7 |
| 03:37 | 03:45 | Em7 |
| 03:53 | 04:01 | Am7 |
| 04:09 | 04:09 | Fmaj7 |
| 04:18 | 04:18 | Am7 |
| 04:26 | 04:26 | Fmaj7 |
| 04:34 | 04:34 | Cmaj7 |
| 04:42 | 04:42 | Am7 |
| 04:50 | 04:50 | Cmaj7 |
| 04:58 | 04:58 | Am7 |
| 05:06 | 05:14 | Cmaj7 |
| 05:22 | 05:22 | Fmaj7 |
| 05:30 | 05:30 | Cmaj7 |
| 05:38 | 05:46 | Am7 |
| 05:54 | 06:19 | Fmaj7 |
| 06:27 | 06:27 | Cmaj7 |
| 06:35 | 06:35 | Am |
| 06:43 | 06:43 | Am7 |
| 06:51 | 06:59 | Em7 |
| 07:07 | 07:07 | Cmaj7 |
| 07:15 | 07:15 | Fmaj7 |
| 07:23 | 07:31 | Cmaj7 |
| 07:39 | 07:55 | Am7 |
| 08:03 | 08:03 | Fmaj7 |
| 08:11 | 08:11 | Cmaj7 |
| 08:19 | 08:19 | Dm7 |
| 08:28 | 08:28 | Fmaj7 |
| 08:36 | 08:36 | Cmaj7 |
| 08:44 | 08:44 | Em7 |
| 08:52 | 08:52 | Cmaj7 |
| 09:00 | 09:00 | Em7 |
| 09:08 | 09:08 | Cmaj7 |
| 09:16 | 09:16 | Am7 |
| 09:24 | 09:24 | Cmaj7 |
| 09:32 | 09:32 | Fmaj7 |
| 09:40 | 09:56 | Cmaj7 |
| 10:04 | 10:04 | Am7 |
| 10:12 | 10:12 | Cmaj7 |
| 10:20 | 10:28 | Am7 |
| 10:37 | 10:45 | Cmaj7 |
| 10:53 | 10:53 | Dm7 |
| 11:01 | 11:09 | Cmaj7 |
| 11:17 | 11:17 | Em7 |
| 11:25 | 11:33 | Cmaj7 |

Working hypothesis: genuinely two-ish worlds — an opening sharp-key passage (A/D/E/B family, 00:00–02:25), then a long C-major diatonic settlement (Cmaj7 / Fmaj7 / Am7 / Em7 / Dm7) from ~02:30 to the end. If the ear confirms that opening, this is the transformation packet: the improv literally travels from one tonal world to another.

## Verify-by-ear checklist

- [ ] Is the 00:00–02:25 sharp-key passage real, and where exactly is the pivot (the boundary detector says ~02:30–02:53)?
- [ ] Real tonic of the long settlement: C major or A minor shade
- [ ] Real voicings -> `VERIFIED-listening-notes-v01.md`
- [ ] Transformation idea: which motif from the opening survives into the C-major world?
- [ ] Best 45–90 s arc for content -> `03-content/`

## Next tools for this packet

- **Moises** — slowed loops across 02:25–03:00 to find the exact pivot chord
- **Ivory or Klangio** — transcription draft of the best 60 s only, not the whole 11:42
- **Sonic Visualiser** — onsets/sustain at 00:26, 02:30, 08:18 boundaries
- **LLM pass** — only after verified notes exist
