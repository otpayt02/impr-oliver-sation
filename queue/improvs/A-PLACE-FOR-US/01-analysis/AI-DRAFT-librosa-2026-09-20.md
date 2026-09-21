# AI-DRAFT Analysis — `a_place_for_us.mp3`

> Status: **AI-DRAFT** — generated locally with librosa (`scripts/audio-analysis/analyze_improv.py`). Verify every claim by ear before publishing. Nothing here is truth yet.

**Packet:** `queue/improvs/A-PLACE-FOR-US`  
**Role:** Song demo — vocal + piano. Sister to improv_1 (same tune, tight take).  
**Analyzed:** 2026-09-20

## Global read

- Duration: **03:17**
- Tempo: ~**133.9 BPM** — low confidence; frame-level estimate. Verify by tapping or in Moises.
- Key estimate: **B minor** (score 0.71) — alt: **G major** (0.59). Relative major/minor pair; the *song* decides which is home, not the histogram.

## Detected section boundaries

`00:00`, `00:03`, `00:13`, `00:17`, `02:27`

Global chroma segmentation. Actual musical sections are what you hear; these are candidate edit/study points only.

## Chord timeline (8 s blocks, condensed runs)

| From | To | Chord guess |
|---|---|---|
| 00:00 | 00:00 | Gmaj7 |
| 00:08 | 00:08 | G#maj7 |
| 00:16 | 00:16 | Em7 |
| 00:24 | 00:32 | Cmaj7 |
| 00:40 | 00:48 | Gmaj7 |
| 00:56 | 00:56 | Bm7 |
| 01:04 | 01:04 | Cmaj7 |
| 01:12 | 01:12 | Em7 |
| 01:20 | 01:20 | Cmaj7 |
| 01:28 | 01:28 | Bm7 |
| 01:36 | 01:52 | Gmaj7 |
| 02:00 | 02:00 | Cmaj7 |
| 02:09 | 02:09 | Emaj7 |
| 02:17 | 02:17 | Cmaj7 |
| 02:25 | 02:25 | Gmaj7 |
| 02:33 | 02:33 | Bm |
| 02:41 | 02:41 | Gmaj7 |
| 02:49 | 02:49 | Cmaj7 |
| 02:57 | 02:57 | Gmaj7 |
| 03:05 | 03:05 | Cmaj7 |

Working hypothesis: G-major palette — Gmaj7 / Cmaj7 / Em7 / Bm7, i.e. Imaj7 / IVmaj7 / vi7 / iii7. That is a coherent diatonic loop, which fits a self-contained song demo.

## Verify-by-ear checklist

- [ ] Real tonic: does B or G actually feel like home at phrase endings?
- [ ] True downbeats vs the BPM estimate (tap two different sections)
- [ ] Any modulation hidden by the global key read (check around 02:27 boundary)
- [ ] Real voicings: maj7/m7 labels flatten color — write the actual voicings in `VERIFIED-listening-notes-v01.md`
- [ ] Best 45–90 s clip for content: pick one, log timecodes in `03-content/`

## Next tools for this packet

- **Moises** — independent chord/key/BPM check + isolated vocal/piano stems + slowed loops
- **Ivory or Klangio** — piano transcription draft to MIDI/notation, then correct by ear
- **Sonic Visualiser** — inspect onsets, sustain, density at the boundary times above
- **LLM pass** — only AFTER `VERIFIED-listening-notes-v01.md` exists; paste verified notes into the review prompt in `docs/improv-operating-kit.md`
