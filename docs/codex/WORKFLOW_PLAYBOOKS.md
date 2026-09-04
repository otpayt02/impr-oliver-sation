# Workflow Playbooks

## Scroll-linked hero browser proof

- Trigger: a scroll-driven hero or reversible story animation changes.
- Outcome: three browser-rendered frames prove the initial, transition, and resolved states.
- Inputs: local URL, runway element, active-step selector, target desktop/mobile viewports.
- Steps: start the local server; enable motion for animation QA; scroll to exact start/mid/end positions; wait for scroll to settle; record `scrollY` and active step; flush one compositor screenshot; save the second screenshot; check console errors; repeat at mobile width.
- Tools: local Vite server and the in-app browser.
- Owner: implementation agent; human owner reviews the final visual.
- Bottleneck: the in-app browser may capture the prior compositor frame immediately after a smooth scroll.
- Optimized version: use animation-frame scroll sampling in the app, wait for the final scroll position, and discard one compositor frame before saving evidence.
- Verification: `input` at 0, `teach` near 760, `book` near 1470; no console warnings/errors; no mobile overlap or horizontal overflow.
- Rollback: restore event-based scroll sampling only if frame sampling causes measured performance regression.
- Privacy boundary: use local synthetic form data only; capture no email, customer, account, or browser-profile information.
- Cost: local only; no paid service.
- Approval gates: public upload, hosting, contact submission, and outreach remain owner-approved actions.
