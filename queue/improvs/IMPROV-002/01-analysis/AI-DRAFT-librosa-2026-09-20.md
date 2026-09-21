# AI-DRAFT Analysis — `improv_2.mp3`

> Status: **AI-DRAFT** — generated locally with librosa (`scripts/audio-analysis/analyze_improv.py`). Verify every claim by ear before publishing. Nothing here is truth yet.

**Packet:** `queue/improvs/IMPROV-002`  
**Role:** Improv 2 — candidate technical-document packet.  
**Analyzed:** 2026-09-20

## Global read

- Duration: **05:23**
- Tempo: ~**133.9 BPM** — low confidence; verify by tapping.
- Key estimate: **E minor** (0.78) — alt: **C major** (0.68), A minor (0.60). High top score, but E-minor-vs-C-major stays an ear decision.

## Detected section boundaries

`00:00`, `00:20`, `00:59`, `02:08`, `02:13`

## Chord timeline (8 s blocks, condensed runs)

| From | To | Chord guess |
|---|---|---|
| 00:00 | 00:00 | Cmaj7 |
| 00:08 | 00:08 | Em7 |
| 00:16 | 00:32 | Emaj7 |
| 00:40 | 00:40 | G#m7 |
| 00:48 | 00:48 | Bmaj7 |
| 00:56 | 00:56 | Em7 |
| 01:04 | 01:04 | Cmaj7 |
| 01:12 | 01:12 | Em7 |
| 01:20 | 01:20 | Cmaj7 |
| 01:28 | 01:28 | Fmaj7 |
| 01:36 | 01:36 | Cmaj7 |
| 01:44 | 01:44 | Fmaj7 |
| 01:52 | 02:17 | Cmaj7 |
| 02:25 | 02:25 | Dm7 |
| 02:33 | 02:33 | Cmaj7 |
| 02:41 | 02:49 | Fmaj7 |
| 02:57 | 02:57 | Cmaj7 |
| 03:05 | 03:05 | Fmaj7 |
| 03:13 | 03:13 | Cmaj7 |
| 03:21 | 03:29 | Fmaj7 |
| 03:37 | 04:01 | Cmaj7 |
| 04:09 | 04:18 | Em7 |
| 04:26 | 04:26 | Am7 |
| 04:34 | 04:34 | C |
| 04:42 | 04:42 | Fmaj7 |
| 04:50 | 04:58 | Cmaj7 |
| 05:06 | 05:06 | Em7 |
| 05:14 | 05:14 | Fmaj7 |

Working hypothesis: strongly C-major diatonic bed (Cmaj7 / Fmaj7 / Dm7 / Em7 / Am7) with an unexplained Emaj7 / G#m7 / Bmaj7 cluster at 00:16–00:56 that may be a genuine chromatic passage or an analysis artifact — it is exactly the kind of thing to flag rather than trust.

## Verify-by-ear checklist

- [ ] Is the 00:16–00:56 Emaj7 passage real chromaticism or a chroma artifact? (Loop it slowed in Moises.)
- [ ] Real tonic: E minor vs C major at phrase endings
- [ ] Real voicings -> `VERIFIED-listening-notes-v01.md`
- [ ] Technical hook for content: the Imaj7–IVmaj7 pendulum (Cmaj7/Fmaj7) dominates bars — candidate 'simple loop, real color' breakdown
- [ ] Best 45–90 s clip -> `03-content/`

## Next tools for this packet

- **Moises** — slowed loop of 00:16–00:56 to settle the Emaj7 question
- **Ivory or Klangio** — transcription draft if piano-forward
- **Sonic Visualiser** — onsets/density at 00:59 and 02:08 boundaries
- **LLM pass** — only after verified notes exist
