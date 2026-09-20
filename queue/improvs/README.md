# Improvisation Queue

This directory holds active improvisation packets before they become published content, a free artifact, a portfolio case, or a paid service example.

## Start a new packet

Create `IMPROV-###` and use this layout:

```text
IMPROV-###/
  README.md
  00-original/
  01-analysis/
  02-edits/
  03-content/
  04-published/
  05-notes/
```

## Naming

- Audio master: `improv-YYYY-MM-DD-take-01-master.wav`
- Edit: `improv-###-highlight-01-v01.wav`
- AI analysis: `AI-DRAFT-toolname-YYYY-MM-DD.md`
- Verified analysis: `VERIFIED-listening-notes-v01.md`
- Content metadata: `improv-###-metadata-v01.md`

## Statuses

| Status | Meaning | Next owner action |
|---|---|---|
| captured | Original source saved | Add first-person reflection |
| analyzing | AI/mechanical drafts underway | Verify by ear |
| mapped | Listener notes approved | Extract artifact or content angle |
| editing | Derivative audio/video being made | Create source-linked edit |
| queued | Public package ready | Oliver performs release check |
| published | Posted/delivered | Add manifest and outcome notes |
| archived | No active next move | Keep source; never delete provenance |

## Gate

Nothing leaves this directory for public release until Oliver explicitly approves it. `published/` contains a publication record; it does not replace the source packet.
