# AP Music & Audio — cinematic expansion

Status: design proposal for owner review; not implemented or published.
Date: September 9, 2026.
Canonical checkout: C:/Users/olive/Projects/impr-oliver-sation/site.
Current entry: src/main.jsx → StudioExperience.jsx → ServiceLanding.jsx.
Existing release: private ChatGPT Site, version 7 from the previous pass. Current live page was inspected again during this design pass.

## 1. Subject, audience, and job

AP is a two-person practice connecting musicianship, sound, teaching, and software. The site must let a student, artist, church, event organizer, or custom-tool client recognize their need, inspect relevant work, and request a scoped next step. Keep the current charcoal/cream identity, serif display typography, cool accents, and restrained opening. Add depth through separate destinations, not a wall of homepage information.

The latest request supersedes the thin sine-wave hero and the previous Make/Refine/Present taxonomy. It does not authorize public exposure of private work, new payment settlement, AI processing of client files, global security changes, or changes to apmusicaudio.com itself. The implementation target remains the existing ChatGPT Site.

## 2. Source register and content decisions

- https://apmusicaudio.com/ — current owner-designated content source, read September 9. It supplies lesson subjects, music services, live sound, performance/recording, rentals, biographies, and technology project descriptions. Its own placeholder notes about lesson formats, rental inventory, and email configuration are not finished customer copy.
- https://ap-music-audio.oliverp789.chatgpt.site/ — current visual reference, inspected in the in-app browser. Preserve the charcoal/cream, editorial type, named collaborators, and explicit TEST boundaries. The live browser reports reduced motion; do not mistake its static state for proof of animated behavior.
- https://github.com/otpayt02/karen-music-website — public project existence and ownership/access confirmed with the GitHub connector; linked from apmusicaudio.com. Repository existence is not evidence of production reliability, usage, or client results.
- Google Drive: bounded searches for AP Music and apmusicaudio returned older source/customization documents and Karen Music planning/rights documents. Only metadata was inspected; no private content or media is approved for publication from these results.
- Owner's latest message — primary authority for the full improvisation quote, new product/software destinations, and video requirement.

Preserve site-published bios as attributed owner claims. Prefer timeless statements over the published age for Alex or a recalculated experience duration. Oliver: pianist, music director, developer/music technologist; piano, ear-based learning, notation, MIDI. Alexander Say: drums, guitar, bass, teaching, performance and sound support. Both participate in music direction and live production. Do not translate these into unsupported ratings or exclusive routing.

## 3. Six-color service system

Exactly three families × two service domains. Each offer has one primary category. Secondary delivery labels such as Live, Remote, Download, Custom and In development are neutral text, not additional colors. Names identify people; colors identify the work.

| Family | Music category / dark-surface accent | Audio counterpart / dark-surface accent |
| --- | --- | --- |
| Make & perform — green | Perform & create — jade #A9D8B7 | Capture & amplify — sea-glass #7ACCBF |
| Learn & refine — blue | Learn & arrange — sky #A8CBF0 | Refine & understand — periwinkle #91ACE8 |
| Tools & assets — purple | Musical tools & assets — lilac #D0B7E8 | Audio tools & systems — iris #B1A0E0 |

Light-surface text uses darker derived ink tokens, not the pale accent hexes; validate contrast before release. Use category name and simple icon as well as color. Never rely on hue differences alone.

### Full service migration map

| Primary category | Existing or requested content |
| --- | --- |
| Music / Perform & create | Wedding/event music; piano/keyboard parts; drums/guitar/bass tracking; covers; backing tracks; original composition; music production collaboration |
| Audio / Capture & amplify | Event sound; wedding sound; church audio; speaker/mixer/microphone/cable setup; on-site operation; selected gear rental, with availability confirmed by inquiry |
| Music / Learn & arrange | Piano lessons with Oliver; drum/guitar/bass lessons with Alex; reading; improvisation; ear training; favorite-song learning; transcription; sheet music; chord charts/lead sheets; arrangements; rehearsal preparation; worship-set materials |
| Audio / Refine & understand | Existing audio audits/mix feedback/routing lessons; troubleshooting; listening for balance/noise/feedback; teaching practical sound-system use |
| Music / Tools & assets | Audio-to-MIDI as a musical editing deliverable; MIDI performance logic; chord editors; music-library apps; proposed chart templates, MIDI packs and interactive learning tools |
| Audio / Tools & systems | MIDI-to-audio rendering as a sound deliverable; proposed DAW templates, routing templates, sound libraries, audio workflow automation and human-reviewed AI audio utilities |

Borderline rule: classify by the deliverable the customer buys, not by whether a computer was involved. A recorded piano part stays Music/Perform; microphone setup stays Audio/Capture. A generic custom website can use the purple tooling-family accent and a neutral Custom software label without pretending it is an audio service.

Headline semantics: to keep colors understandable, the active service phrase inherits its category accent; connective text, including `your`, stays white. This intentionally replaces the previous fixed grammar-role coloring. Six-category meaning takes priority over coloring every sentence with three competing categories.

## 4. Page map

| Route | Purpose and content |
| --- | --- |
| / | Fixed-viewport Music/Audio film, three paired service doors, short selected-work previews, full improvisation quote, compact team invitation, project inquiry |
| /services | Six-category directory, Music/Audio switch, named provider, audience, output, delivery mode, illustrative example or approved evidence, request action. Rentals live under Audio/Capture. FAQ covers current source topics without inventing policies. |
| /products | Dedicated digital assets/templates catalog. Music/Audio filter. Each listing has format, purpose, license/compatibility status, preview, and availability. Unfinished products say In development and Invite a request; no fake download or Buy button. |
| /technology | Custom websites, applications, music software, MIDI tools, audio workflows and AI implementations. Separate sections for demonstrated work and proposed commissions. Existing chord editor/Karen Music/MIDI/research projects use source-backed descriptions and explicit evidence status. |
| /work | Music performance and production portfolio, not software. Separate playable music/performance entries and audio/process examples. No stock photograph presented as an actual client event. |
| /about | Oliver Payton and Alexander Say bios, instruments, teaching approaches and shared work. Full quote also accessible here. No invented portrait, endorsement, degree or ranking. |
| /contact | Short context-aware inquiry: service/category, preferred person, goal, event date/location if needed. Keep current local brief behavior until a delivery endpoint is deliberately connected and verified. |

Retain /card.html and /first-listen.html, along with the existing practice checkout accessible from the shared footer. Existing fragment links should redirect or land meaningfully after migration.

## 5. Three cinematic approaches considered

| Approach | Design-level procedure | Tradeoff |
| --- | --- | --- |
| A: extend live canvas | Keep the canvas, add service-specific shapes, drive formations from scroll | Smallest change, but does not satisfy the explicit video request and remains close to the rejected look |
| B: live 3D simulation | Build one real-time field, change its geometry with domain/category, render per frame | Rich interaction, but higher device cost and still not an actual video |
| C: paired authored videos + HTML overlay — recommended | Author deterministic scenes offline, export two synchronized video masters, map scroll to film time, keep all labels and controls as accessible HTML | Actual video; predictable composition and richer rendering. Requires seek-friendly encoding, device QA, and intentional fallback |

Choose C. No third-party paid video generation is assumed. FFmpeg is available locally. Still-image generation can provide approved concept/poster art; imagegen does not itself produce a finished motion video. Procedural animation can be rendered offline into real video. Reusing approved footage is optional and must not depend on private media rights being silently inferred.

## 6. Art direction — Resonant Intent

The conceptual seed is the moment a practiced hand becomes an independent musical voice. A meticulously crafted field begins with many plausible directions, then reveals the relationships that make one phrase intentional. Seeded variation keeps the motion reproducible; the same time and domain yield the same composition rather than a new spray of random particles.

In Music, measured strings of light carry pitch, interval, rhythm and phrasing. Paths become a brief playable gesture, then a readable arrangement, then an editable musical structure. The product of careful computational design should feel expressive before it looks technical: curved motion follows phrasing rather than mechanical equalizer bars.

In Audio, the same compositional anchors become capture points, phase relationships and routed channels. Interference gradually resolves into aligned, legible signal paths. Painstaking timing makes cause and effect visible: the audience should understand that this work makes sound clearer and easier to deliver, rather than simply watch attractive noise.

Both versions culminate in the purple tools family: separate gestures become an organized, reusable system. Deeply layered but bounded detail produces depth through overlap, exposure and movement, not excessive blur. The film must be meticulously refined at each hold frame; every still should remain deliberate enough to serve as a readable fallback.

## 7. Locked viewport and timeline

The hero has one stable frame. Header, Music/Audio tablist, headline region, three category positions and main CTA do not move or resize when a tab changes. Oliver/Alexander selection belongs to service/bio content, not a competing second hero tab bar.

Proposed desktop runway: 300svh with a sticky 100svh frame. Film master duration: 18 seconds per domain, 30 fps; desktop 1600×900 target, mobile 900×1200 art-directed crop. These are production targets, not measured results.

| Scroll progress | Music film | Audio film | Foreground purpose |
| --- | --- | --- | --- |
| 0–15% | A suspended, expectant musical gesture | Unformed source energy | One short outcome sentence and two tabs; immediate service links |
| 15–45% | Gesture becomes performance and recorded layers | Sources become capture and room coverage | Green: create/perform or capture/amplify |
| 45–75% | Phrase opens into intervals and a playable chart | Interference separates into a clear routing/mix structure | Blue: learn/arrange or refine/understand |
| 75–94% | Notes become editable MIDI and musical tools | Signal becomes reusable workflow and audio tools | Purple: tools/assets, with a direct destination |
| 94–100% | Finished musical structure holds | Finished signal structure holds | Stable closing frame; native scroll releases into cream content |

User tab selection is immediate and never scrolls the page. Preserve normalized progress; seek incoming video before crossfading. Default to manual switching. Optional Explore both mode may alternate every 8 seconds while idle; stop on any tab/focus interaction, hidden tab, offscreen state, or reduced-motion preference. No focus moves on an automatic cycle.

Avoid two clocks changing the story independently: headline category follows the scroll chapter. Curated phrase alternatives may rotate only within the same chapter/domain, at least 6 seconds apart, with a recent-history cooldown. Pause freezes ambient/automatic changes. Scroll remains native.

## 8. Video and interaction pseudocode contracts

### updateFilmTarget
Receive normalized scroll progress and selected domain.
Clamp progress to the authored timeline.
If reduced motion, media error, or data-saving fallback applies, show the chapter poster and accessible content.
Otherwise compute target film time from duration and progress.
If a seek is in flight, remember only the newest requested time.
After seek completion, service the newest target; do not queue obsolete frames.
Sleep when settled; resume only for a new target or relevant visibility change.

### switchDomain
Receive selected Music or Audio tab.
Keep scroll position, active chapter, focus and layout dimensions unchanged.
Prepare counterpart video at current normalized time.
Keep the existing frame until the counterpart is ready; reveal a loading state if needed.
Crossfade media and replace category-specific text together; honor reduced motion with an immediate swap.
If media fails, use the counterpart poster and keep services navigable.

### routeOffer
Read the offer's primary category, status, deliverable, collaborator and evidence.
Use the same catalog record on all pages so labels and colors cannot diverge.
For a ready downloadable item, expose the actual verified file/license.
For an unfinished item, expose an inquiry, not a simulated purchase.
For custom work, prefill the relevant request without automatically sending it.

### pointerFeedback
Activate only for a fine pointer and when motion is allowed.
Cache the active target's bounds on entry/resizing.
Move a soft local highlight at most once per animation frame.
Nudge only the decorative inner label by at most 4 pixels; keep the click target still.
Clear transforms on leave, blur, tab hiding or route change.
Never hide or replace the native cursor; never require hover to discover content.

## 9. Motion changes and budgets

| Before | Proposed after |
| --- | --- |
| Thin live sine/HTML field | Actual paired film assets with service-specific transformations |
| Independently randomized hero | Chapter-aligned service language and domain-specific alternatives |
| Generic hover feedback | Local spectral highlight, restrained press feedback, and directional link response |
| Potential competing animations | One hero film, quiet sections, intentional pauses around biography and quote |

UI timings: press 100–140ms, hover 160–220ms, tab content 240–280ms. Video crossfade up to 350ms after readiness. No full-page cursor trail, flashing, autoplay sound, scroll interception, per-frame React state churn, or long content delays. Body copy remains at least 16px; ordinary controls approximately 14px+ with 44px touch targets. Reduced motion shows a complete poster/text layout with explicit play option, not a broken scene.

Encode MP4 with frequent keyframes and fast-start metadata; confirm actual seeking on target browsers rather than assuming smoothness from codec choice. Target active hero payload ≤6 MB desktop or ≤3 MB mobile; avoid downloading both full-resolution files immediately. If the budget fails, simplify the film or use shorter segments; do not quietly replace the requested video with canvas. Validate data-saving behavior, media errors, rapid reversal, fast scrolling and refresh at mid-scene.

## 10. Improvisation statement

Place after the cinematic sequence or the first genuine performance example. Use a cream editorial spread, Oliver's full name, and a small caption identifying this as his own reflection. The quote is not a client testimonial or independently verified credential. Preserve the wording in full; no auto-cycling paragraph or word-by-word reading obstruction.

> you know you are a master when you stop telling your hands what to do, and their ideas start getting better than the direction of your intentional thoughts. That is me when I improvise. I have had to train myself to do the opposite of everything I've learned and to make it sound good and appreciated as soon as you play it. you gotta trick yourself into playing something your hands wanted to play instead of what you were thinking about. it's a form of meditation.

— Oliver Payton, on piano improvisation

## 11. Skills and supporting artifacts

Applied to this proposal: Designing Before Coding (alternatives and contracts), brainstorming (approval checkpoint), Reducing Complexity (one catalog, isolated media controller), qoder-scroll and web-animation-design (scene and verification contracts), algorithmic-art (Resonant Intent philosophy), gather-business-context (source register), request/adherence and context-switch skills (delivery tracking), skill-stack-maximizer (reuse before adding infrastructure).

Reviewed but not forced into the website: brand-guidelines describes Anthropic's brand, which conflicts with the explicit AP identity; use AP instead. Turbopack concerns Next.js, while this site is React/Vite; no migration is justified. Installing Skills System targets initial Clank setup, already available here. Creating Skills requires baseline tests before a new skill; existing motion guides cover the current need, so do not create an untested duplicate. imagegen is reserved for concept/poster assets after the design decision, not fake people or project evidence.

The named System Design and Sales Pipeline templates exist and their reference manifests were read. They are supporting document/workbook deliverables, not website layout templates. Their template-preserving authoring and rendering is deferred until the design checkpoint; no fake leads or deals should be invented to populate the pipeline. Sales skill catalog was reviewed; no outreach, CRM change or paid-sales workflow is part of this implementation. Market-sizing has no defensible market/capacity inputs here: no TAM or revenue claims will be added. A capacity model can later use confirmed hours, conversion and prices rather than guessed market shares.

Safety-settings is not an available skill/tool in this session; no security settings were changed. GitHub and Drive were used read-only for bounded source discovery. No installations, new global memory, new accounts or external writes occurred.

## 12. Implementation sequence after approval

1. Write the detailed implementation plan; capture approved spec and current dirty-worktree exclusions.
2. Centralize the sourced offer catalog and route map; test category uniqueness, links and availability behavior.
3. Produce the paired videos/posters and a minimal hero with stable tab switching. Show this coherent preview before expanding secondary pages.
4. Build service, product, technology, work, about and contact routes; include full quote and verified bios.
5. Add bounded microinteractions, accessible media fallback, navigation restoration and inquiry context.
6. Verify desktop/mobile, initial/middle/end/reverse/refresh, rapid tab switching, video errors, reduced motion, keyboard, 200% text, empty products and TEST checkout.
7. Build/package the exact source, save and deploy to the existing private Site, inspect deployment status and the live result. Do not change the domain site's deployment or the Site audience.

## 13. Acceptance and remaining inputs

Required acceptance: actual emitted video files; no hero size/scroll jump on tab change; all migrated offers assigned one primary category; products/software/music work separated; quote exact; truthful bios/proof/statuses; coherent mobile fallback; all navigation and requests useful; no live-payment claim; browser-visible release evidence.

Design approval is the current checkpoint. Media rights, final product availability/licensing, rental inventory, and real booking/payment infrastructure remain content/operational gates, but do not prevent building honest inquiry-based pages. No further aesthetic interview is needed if the owner approves this proposal as written.
