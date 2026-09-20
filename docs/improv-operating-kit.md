# Improvisation Operating Kit

## Purpose

Use every original improvisation as **provenance-backed creative source material**. One recording can become a performance, a listening analysis, a lesson, a free artifact, a portfolio proof, and eventually a client-facing example. The original audio and Oliver's own account of what happened remain authoritative; AI output is always a draft for human verification.

This guide operationalizes the first three piano improvisations for AP Music & Audio.

## Prime Rules

1. Preserve the original recording. Never overwrite, normalize destructively, or replace it.
2. AI may suggest notes, chords, tempo, key, sections, and content language. Oliver verifies the claims by ear before publishing.
3. No public upload, blog post, video, newsletter, portfolio use, or customer-facing artifact is published automatically. Everything passes through `queue/` and Oliver's release gate.
4. Every public claim about the music must trace to one of: the original audio, an editable MIDI/DAW source, timestamped notes, or Oliver's approved written reflection.
5. A published clip is a derivative. Its editable source stays inside its improv packet.

## Canonical Routing

| Data type | Canonical location | Rule |
|---|---|---|
| Raw phone, DAW, piano, or room recording | `queue/improvs/IMPROV-###/00-original/` | Preserve read-only master; do not edit in place |
| Original MIDI, DAW session, stems | `queue/improvs/IMPROV-###/00-original/` | Keep with the recording that produced it |
| AI chord/key/tempo/structure guesses | `queue/improvs/IMPROV-###/01-analysis/` | Label as `AI-DRAFT`; mark verification status |
| Oliver's timestamped listening notes | `queue/improvs/IMPROV-###/01-analysis/` | This is the approved musical interpretation |
| Edited clips, mastered audio, visualizer sources | `queue/improvs/IMPROV-###/02-edits/` | Derivatives only; link back to source |
| Scripts, captions, title ideas, thumbnails | `queue/improvs/IMPROV-###/03-content/` | Drafts remain here until release approval |
| Final exports and post manifest | `queue/improvs/IMPROV-###/04-published/` | Include platform URL, post date, and outcome fields |
| Personal reflection, artistic intent, lessons learned | `queue/improvs/IMPROV-###/05-notes/` | Keep first-person language; writers may restructure but never invent |
| Reusable knowledge | `the-brain/` | Only distilled, durable principles go here |
| Approved public content awaiting manual release | `queue/` | The sole release gate |
| Free customer-facing motif map / practice asset | `funnel/artifacts/` | Must be derived from verified analysis |

## Folder Template

```text
queue/improvs/IMPROV-001/
  README.md
  00-original/
    audio-master.wav
    session-or-midi-source/
  01-analysis/
    ai-draft-analysis.md
    verified-listening-notes.md
    transcription-v1.musicxml
  02-edits/
    full-performance-edit.wav
    highlight-01.mp4
  03-content/
    video-script.md
    metadata.md
    captions.srt
  04-published/
    publish-manifest.md
  05-notes/
    oliver-reflection.md
```

The folders are intentionally not filled with placeholders. Make a real folder and add a file only when it exists. A recording may remain in `00-original/` until its next useful move is clear.

## First Three Improv Packets

### IMPROV-001 — The Honest Document

**Choose:** the least edited recording; the one that best captures real-time discovery.

**Business use:** prove that AP Music & Audio can hear a moment, explain it plainly, and convert it into practice material.

**Minimum outputs:**

- One untouched master recording.
- A timestamped note identifying the return or change that makes the improv feel like a piece.
- One 45–90 second performance/explanation video.
- One motif map using `funnel/artifacts/improv-motif-map-template.md`.
- One approved call to action: custom music map, transcription, arrangement, or practice breakdown.

**Video spine:**

1. Raw opening: 0:00–0:10.
2. Honest frame: “I did not plan this. I noticed one phrase trying to return.”
3. Replay the motif or transition with timestamps.
4. Explain one choice you actually made or heard.
5. Finish with the musical passage and a CTA.

### IMPROV-002 — The Technical Document

**Choose:** the take with a clear technical hook: rhythmic displacement, polyrhythm, unusual voicing, modal movement, dark texture, left/right hand tension, or metal-adjacent energy.

**Business use:** demonstrate analytical depth and the bridge between performance, theory, production, and practice.

**Minimum outputs:**

- One verified map of sections, pulse behavior, and harmonic/pitch-center uncertainty.
- A short “What is happening here?” breakdown.
- One practice prompt extracted from a motif, rhythm cell, voicing, or texture.
- A rough MIDI or notation draft only if the recording is clean enough for it to be meaningful.

### IMPROV-003 — The Transformation

**Choose:** a raw improv worth producing into a larger texture or song seed.

**Business use:** show the full AP stack: improvisation -> selection -> arrangement -> production -> release.

**Minimum outputs:**

- A raw-versus-produced comparison.
- An arrangement map: piano role, harmonic/rhythmic hook, intended drums/bass/guitar/sound-design role, and what stays intentionally raw.
- A process video or longer visualizer.
- One downloadable fragment: MIDI clip, chord/motif map, practice loop, or process note.

## AI Review Workflow

Use AI as multiple instruments, not as a single judge.

### Step 1 — Preserve and describe

- Name the source `improv-YYYY-MM-DD-take-01`.
- Put the master in `00-original/`.
- Add record date, instrument, source device, rough duration, and whether MIDI exists to `README.md`.
- Write a rough first-person reflection before opening AI tools. Answer: What did your hands keep returning to? Where did the energy change? What surprised you?

### Step 2 — Machine analysis

Possible tool roles:

- **Moises:** rough stem separation, tempo/key/chord suggestions, slowed loops, and practice replay for mixed recordings.
- **Ivory:** editable piano-note/MIDI/notation draft from a clean piano-focused recording.
- **Klangio:** broad notes/chords/rhythm transcription draft and exportable notation/MIDI.
- **Sonic Visualiser:** waveform, spectrogram, spectral density, attacks, sustain, beat annotations, and timing inspection.

Save all results in `01-analysis/` with filenames beginning `AI-DRAFT-`. Each file must say which tool generated it and when.

### Step 3 — Human verification

Listen in short loops. For every material claim, mark one of:

- `VERIFIED`: Oliver can hear/play/confirm it.
- `UNCERTAIN`: plausible but not trusted enough for a public claim.
- `REJECTED`: tool error or misleading simplification.

Required checks:

- Does the detected key describe a true tonic, or merely a probable pitch center?
- Do chord labels reflect the voiced notes, or are they a reductive guess?
- Are beat grids valid through rubato sections?
- Does transcription distinguish sustain/pedal blur from actual notes?
- Does the claimed form match what a listener perceives?

### Step 4 — Content drafting

Give a writing assistant only verified material and first-person notes. It can make titles, captions, lesson steps, and scripts, but it cannot manufacture artistic intention or hidden theory.

Use this prompt:

> This is a real-time piano improvisation. Do not invent musical details. Use only the verified observations and first-person reflection below. If a claim is ambiguous, mark it as a question rather than a fact. Produce a listener-friendly structural explanation, three non-overclaiming titles, a 45-second spoken script, one practice exercise, and a list of facts that still need confirmation by ear.

### Step 5 — Release gate

Before publishing, ensure:

- Audio source and exact excerpt are identified.
- The content uses verified analysis only.
- The first-person wording remains Oliver’s actual perspective.
- Any client/service claim is accurate and scoped.
- Final title, description, captions, and CTA are in `03-content/`.
- The final package is copied to `queue/` for Oliver’s manual approval.

## First Upload Format

**Working title:** `I Didn’t Write This First — I Found It While Playing`

**Structure:**

1. 0:00–0:10: raw performance opening.
2. 0:10–0:20: “This was unplanned. I noticed one phrase trying to come back.”
3. 0:20–0:50: isolate or replay the key motif with simple timestamps.
4. 0:50–1:20: explain one truthful musical choice.
5. 1:20–end: selected full passage or resolved replay.
6. Description CTA: `AP Music & Audio turns recordings into clear musical maps, practice material, and custom arrangements.`

## Phase 1 Outcome

Phase 1 progress from this workflow is not “three perfect songs.” It is one reliable proof loop:

```text
real improvisation
  -> preserved source
  -> verified listening analysis
  -> useful public artifact
  -> audience response or inquiry
  -> proof/case-study record
```

When one person can see an improv, understand its musical value, request comparable help, and receive a real deliverable, this system is doing its job.
