# Contributing to TrueSeal Contractor App

Kia ora — thanks for looking at this.

We're a small Wellington company building real tools for real tradespeople. This codebase is the contractor-facing PWA. It runs on phones, on job sites, often with bad signal.

---

## Before You Start

1. Read the README — especially the "Why This Exists" section
2. Check [open issues](../../issues) for something tagged `good first issue` or `help wanted`
3. Comment on the issue before starting work — avoid duplicating effort
4. For anything significant, open a discussion first

---

## Setup

```bash
git clone https://github.com/trueseal/contractor-app.git
cd contractor-app
npm install
cp .env.example .env.local
npm run dev
```

Test on mobile. Chrome DevTools device emulation is fine for layout; use a real phone for camera/GPS features.

---

## What We're Looking For

**Most wanted:**
- `ui` — mobile UX improvements, accessibility, dark theme polish
- `offline` — service worker, sync queue for poor-signal sites  
- `camera` — native camera access, GPS metadata preservation
- `i18n` — te reo Māori translation (we'll connect you with a reviewer)
- `testing` — unit + integration tests (there aren't many yet)

**Not looking for right now:**
- Backend changes (separate repo)
- Major architectural changes without prior discussion
- New features not on the roadmap

---

## Pull Request Rules

- One feature or fix per PR
- Mobile-first — if it doesn't work on a phone, it's not ready
- Keep PRs small — easier to review, faster to merge
- Write a clear description: what changed, why, how to test it

---

## The One Sacred Rule

**Do not remove or downgrade the wellbeing check-in.**

It is not optional. It is not a nice-to-have. A contractor took his own life and this feature exists because of that. Changes to the wellbeing flow require direct sign-off from Stefan Badenhorst before merging.

---

## Licence

By contributing, you agree your code is submitted under the MIT licence and that TrueSeal Limited holds the copyright.

---

Questions? Open an issue or email stefan@trueseal.co.nz
