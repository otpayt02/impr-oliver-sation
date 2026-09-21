# AI-DRAFT Analysis — `improv_1.mp3`

> Status: **AI-DRAFT** — generated locally with librosa (`scripts/audio-analysis/analyze_improv.py`). Verify every claim by ear before publishing. Nothing here is truth yet.

**Packet:** `queue/improvs/IMPROV-001`  
**Role:** Extended improv of the same tune as `a_place_for_us` — extra freestyle verses; the "honest document" candidate.  
**Analyzed:** 2026-09-20

## Global read

- Duration: **06:01**
- Tempo: ~**104.2 BPM** — low confidence; frame-level estimate. Verify by tapping or in Moises.
- Key read candidates: **F minor** (0.56) / A# minor (0.55) / D# minor (0.49). Scores are flat — treat the key as unresolved until the ear pass.

## Detected section boundaries

`00:00`, `00:21`, `02:42`, `03:11`, `05:48`

Global chroma segmentation; candidate edit/study points only.

## Chord timeline (8 s blocks, condensed runs)

| From | To | Chord guess |
|---|---|---|
| 00:00 | 00:00 | F#maj7 |
| 00:08 | 00:08 | Fm7 |
| 00:16 | 00:16 | A#m7 |
| 00:24 | 00:24 | F#maj7 |
| 00:32 | 00:32 | Fm7 |
| 00:40 | 00:40 | F#maj7 |
| 00:48 | 00:48 | Fm7 |
| 00:56 | 01:04 | A#m7 |
| 01:12 | 01:12 | Fm7 |
| 01:20 | 01:20 | F#maj7 |
| 01:28 | 01:28 | A#m7 |
| 01:36 | 01:44 | Fm7 |
| 01:52 | 01:52 | Bmaj7 |
| 02:00 | 02:17 | Fm7 |
| 02:25 | 02:25 | G#m7 |
| 02:33 | 02:49 | A#m7 |
| 02:57 | 03:05 | Fm7 |
| 03:13 | 03:13 | A#m7 |
| 03:21 | 03:21 | Bmaj7 |
| 03:29 | 03:29 | F#maj7 |
| 03:37 | 03:37 | A#m7 |
| 03:45 | 03:45 | Bmaj7 |
| 03:53 | 03:53 | Fm7 |
| 04:01 | 04:09 | F#maj7 |
| 04:18 | 04:18 | Bmaj7 |
| 04:26 | 04:26 | A#m7 |
| 04:34 | 04:34 | F#maj7 |
| 04:42 | 04:42 | D#m7 |
| 04:50 | 05:14 | G#m7 |
| 05:22 | 05:22 | A#m7 |
| 05:30 | 05:38 | Bmaj7 |
| 05:46 | 05:46 | Fm7 |

Working hypothesis: a black-key minor world cycling Fm7 / A#m7 / G#m7 with F#maj7 and Bmaj7 detours. Not the same raw palette as the 3:17 take — the improv lives around the song rather than reproducing its G-major loop.

## Verify-by-ear checklist

- [ ] Real tonic and whether Fm7 functions as home
- [ ] How the freestyle verses (new lyrics ~00:56 onward) differ harmonically from the refrain shape
- [ ] True downbeats vs the BPM estimate
- [ ] Real voicings -> `VERIFIED-listening-notes-v01.md`
- [ ] Best 45–90 s clip for the "honest document" video -> `03-content/`

## Next tools for this packet

- **Moises** — stem split (voice / piano) + slowed loops for the dense middle
- **Ivory or Klangio** — piano transcription draft only if the piano is isolated enough
- **Sonic Visualiser** — onset/sustain inspection at 02:42 and 03:11 boundaries
- **LLM pass** — only after verified notes exist
