# TrueSeal Contractor App

**An open-source Progressive Web App for New Zealand tradespeople.**

Built by [TrueSeal Limited](https://trueseal.co.nz) — a commercial building maintenance company in Wellington, NZ.

---

## Why This Exists

A contractor took his own life.

That loss shaped TrueSeal. It's why this app has a daily wellbeing check-in built into the core workflow — not as an add-on, not as a checkbox, but as a first-class feature that every contractor sees every day.

We're building tools that treat tradespeople like professionals and human beings. That means structured job safety analysis, photo-verified daily reports, and a genuine "how are you doing?" — every single day.

This is the contractor-facing side of that platform. We're opening it up because we think the NZ trades industry deserves better tooling, and we can't build it alone.

---

## What It Does

- ☀️ **Morning check-in** — confirm you're on site, site conditions, any hazards
- 📋 **JSA (Job Safety Analysis)** — guided, mobile-first, GPS-tagged
- 📸 **Daily report** — photo upload with location verification, work summary
- 💙 **Wellbeing check-in** — daily, private, routed to the team if support is needed
- 🏆 **Tier & rewards** — Starter → Journeyman → Master, quality scoring, vouchers

---

## Tech Stack

- **React 18** + **Vite**
- **PWA** — installs to home screen, works offline, no app store required
- **REST API** — connects to TrueSeal backend (self-hostable)
- Mobile-first, works on any smartphone

---

## Getting Started

```bash
git clone https://github.com/trueseal/contractor-app.git
cd contractor-app
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Contributing

We welcome contributors — especially NZ-based developers who understand the trades.

Read [CONTRIBUTING.md](./CONTRIBUTING.md) before you start. Key points:

- Pick up an issue tagged `good first issue` or `help wanted`
- One feature per PR
- Mobile-first — test on a real phone or device emulator
- The wellbeing screen is sacred — changes require discussion with the team first

**What we need most right now:**
- UI polish (dark theme, accessibility)
- Offline/sync logic for poor-signal sites
- Camera integration with GPS metadata
- Translations (te reo Māori)

---

## Architecture

```
contractor-app/          ← this repo (public)
trueseal-api/            ← backend API (self-hostable, separate repo)
mission-control/         ← ops dashboard for TrueSeal team (private)
```

The contractor app connects to the API via `VITE_API_URL` in your `.env.local`. You can run the API locally or point it at a hosted instance.

---

## The Promise

The wellbeing check-in is not a feature. It is a promise.

If you're contributing to this project, you're part of that promise. We take it seriously and we expect contributors to as well.

**Mates in Construction: 0800 111 315**

---

## Licence

MIT — use it, fork it, build on it. Just don't remove the wellbeing check-in.

---

## Contact

Stefan Badenhorst — stefan@trueseal.co.nz
TrueSeal Limited, Wellington, New Zealand
