# Phase 0 Runbook — Tonight's Video

> Rebuilt 2026-09-13 from `codex-handoff-ap-media-system` §5 (canonical spec: "write this as docs/runbook-tonight.md, exact steps") merged with `runbook-phase0-v2` hardware tuning. Source PDFs live in Google Drive.

**Tonight's target:** "How to improvise at the piano in your first hour — no sheet music" (AHeadofSound #1). Done = raw footage + artifact exist, video cut and uploaded **UNLISTED**. Goes live when the site page exists so the artifact link resolves. ~2.5 hrs total.

**Hardware rule (8 GB RAM + Intel UHD 620):** phone and paper do the heavy lifting; the PC is a control room only. All night: Spotify off, browser ≤6 tabs, one app at a time.

## 0. Pre-flight — 10 min

- Quiet room. Lamp off-axis so keys are lit evenly, no glare on black keys.
- Phone charged, storage checked, Do Not Disturb ON (one ringtone ruins take 2).
- Phone stand: stack of books is fine. Overhead-ish angle on the keys.

## 1. The Artifact — 40 min (do this FIRST while fresh)

Hand-write the "First-Hour Improv Sheet." One page, or two sides max:

- Left-hand rootless 7th voicing map (C and F)
- 3 rhythm cells (write them rhythmically, don't over-notate)
- One ii–V–I in C and one in F
- Right-hand pentatonic boxes

Mess is fine. Mess is the brand — the uncensored-hand rule applies to staff paper too. Photograph both sides → `funnel/artifacts/first-hour-improv-sheet.pdf` (ingest name: `brain-ingest-2026-09-13-artifact-first-hour-improv-sheet.pdf`).

## 2. Script skeleton — 20 min (paper again)

Use `agents/script-writer.md` if it exists (Codex Prompt 4); if not, five beats on paper. Structure is FIXED every video:

1. **Confession hook (≤10 sec):** "We are all guilty of it — you sit at the piano, noodle for forty minutes, and nothing you played is a song. Here's the hour that fixes it."
2. **The promise:** one hour, three moves, something that sounds like music.
3. **The 3 moves at the keys:** voicing, rhythm cell, pentatonic over it. Demo each in ≤60 sec of playing.
4. **Artifact CTA:** "This sheet is free — link below, it costs your email, not your wallet."
5. **Newsletter CTA:** "Ahead of Sound Daily — one thing to practice every morning."

No teleprompter. These beats + your hands talking = the video.

## 3. Record — 40 min

- Phone video, keys angle. Face angle = second phone or skip it; angle B is a Phase 1 luxury.
- Talk like the journal rule: what your hand wants to say. Imperfect phrasing stays.
- **TWO-TAKE MAX per section.** Take 3 does not exist tonight. Pressure-forged, not perfectionist.

## 4. Cut — 30 min, the light way

- Clipchamp (already in Windows 11, light on RAM) or CapCut ON THE PHONE. No Premiere, no DaVinci on this machine.
- Trims only. One title card at the open from `video/templates/title-card.html` (purple subject / green predicate styling — §7 tokens), e.g. "FIRST HOUR IMPROV" + AP Music & Audio wordmark.
- Export **1080p** (not 4K — this machine will hate 4K and nobody learning chords needs it).

## 5. Metadata — 10 min

- Title template: `[Verb] [Thing] in [Timeframe] — no [Barrier]` → **Improvise Your First Piano Thing in One Hour — No Sheet Music**
- Description: 2-line hook (the confession), artifact link placeholder to apmusicaudio.com email capture, 3 hashtags (#pianoimprov #learnpiano #musicproduction).
- No AI-voice disclosure needed — every voice in this video is yours (note that: it's a differentiator).

## 6. Upload — 10 min, UNLISTED

It ships when the site is live (Codex Prompt 1 → glance → Prompt 2). If the site isn't ready tonight: unlisted stays up, loop closes tomorrow, zero shame.

**"Minimal viable" for every future video = steps 2, 3, 4, 6. Steps 1 and 5 are template-once.**

## Shutdown checklist (2 min)

- [ ] Artifact photo + raw footage copied into `the-brain/sources/` and `funnel/artifacts/` once the repo tree exists
- [ ] Whisper-base transcription queued overnight (optional; becomes script + blog source material for Tuesday's Delta)
- [ ] Sunday ingest event will catch anything you forgot

## What v2 removed and why

- **OBS** → replaced by phone + Xbox Game Bar (Win+G) if screen capture is ever needed
- **Local XTTS/ollama tonight** → gone entirely; voice = you, generation = remote
- **4K anything** → 1080p ceiling on this hardware
- **Same-night publishing** → unlisted + gate, per Law 2 (human-in-the-loop absolutism)
