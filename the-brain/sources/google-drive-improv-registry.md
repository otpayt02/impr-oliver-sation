# Google Drive Improv and AP Music Source Registry

This registry records relevant Google Drive sources discovered on 2026-09-20. Google Drive remains the source location for the original files. This repository stores the operational interpretation, references, and approved derivative text—not copied PDF binaries—because the currently connected Drive integration provides search/read access but no direct file-download-to-repository action.

## Sources

| Google Drive source | Link | Canonical repo role | Notes |
|---|---|---|---|
| `improvisers-first-five-chords` | https://docs.google.com/document/d/1McnNv3rEi2lctro1lmv_v7P0uGPGhxwjqOxa4sl8j_s/edit?usp=drivesdk&ouid=117598436831768925597 | `funnel/artifacts/` reference | AP Music & Audio free starter kit: five voicings, a four-chord loop, and a 10-minute improvisation plan. It establishes a usable first artifact and the instruction to capture a first 60-second recording. |
| `runbook-phase0-v2` | https://drive.google.com/file/d/1HlmzbUK5yaoc0oesZBapGduVHXQGMOjL/view?usp=drivesdk | `docs/` execution reference | Phase 0 runbook for the first piano-improvisation video. It calls for a raw handwritten artifact, phone footage, an unlisted upload, and later copying raw footage/artifact material into the brain and funnel source areas. |
| `codex-handoff-ap-media-system` | https://docs.google.com/document/d/1Rd34Y4toh85kKxMSBh7wIJ_rfojYWNuhhLYkcClgEx0/edit?usp=drivesdk&ouid=117598436831768925597 | `the-brain/sources/` system reference | Operating contract: free-tier constraint, human release gate, provenance rule, the repository pipeline, Phase 0–4 sequence, and canonical folder structure. |
| `codex-kickoff-sequence` | https://docs.google.com/document/d/111ZC7VMLi_cTHpkVJ7bYqVeFWnXlnQ5_D4Z4hVIm9OA/edit?usp=drivesdk&ouid=117598436831768925597 | `docs/` supporting reference | Kickoff-sequence material associated with the AP media-system implementation. |

## Drive-to-Repo Rules

1. Preserve original Drive files. Do not treat a copied summary as a replacement.
2. Place new original raw recordings in an `IMPROV-###/00-original/` packet in the repo only if the file size and privacy are appropriate for Git; otherwise store the secure Drive location and add a reference file with date, filename, and access note.
3. Keep public-ready, text-based artifacts and operational documents in Git so they are versioned and deployable.
4. Record each new external source here or in the broader brain index before using it to generate public content.
5. No tool or workflow may auto-publish. The final public asset must pass through `queue/` and Oliver's explicit manual approval.

## Immediate Linkage

- The first-five-chords starter kit informs the first practice artifact and can link to `funnel/artifacts/improv-motif-map-template.md`.
- The Phase 0 runbook is the practical precedent for IMPROV-001's raw-first, low-overhead video workflow.
- The media-system handoff is the governing architecture for routing the source -> analysis -> queue -> published flow.
