// Seed lessons — open source contributions welcome
// Add lessons following this schema. Keep them short, practical, NZ-specific.
// Tier: 'All' | 'Starter' | 'Journeyman' | 'Master'

export const SEED_LESSONS = [
  {
    id: 'e2-overview',
    title: 'NZBC E2 — Why weathertightness matters',
    category: 'nzbc',
    categoryIcon: '📐',
    tier: 'All',
    readingMinutes: 3,
    summary: 'Clause E2 of the New Zealand Building Code requires buildings to have an envelope that prevents moisture from entering and causing damage. It is the most litigated clause in NZ construction history.',
    keyPoints: [
      'E2 covers all external moisture — rain, wind-driven water, and condensation',
      'Flashings, junctions, and penetrations are the highest-risk areas',
      'Failure to comply with E2 is the #1 cause of leaky building claims in NZ',
      'Every flashing you install is an E2 compliance item'
    ],
    whyItMatters: 'A leaky building can cost the owner hundreds of thousands to remediate. Your workmanship is the last line of defence. Get the flashings right.',
    nzbcRef: 'NZBC Clause E2 — External Moisture',
  },
  {
    id: 'sika-monotop-412',
    title: 'Sika MonoTop 412 — When and how to use it',
    category: 'products',
    categoryIcon: '🧪',
    tier: 'All',
    readingMinutes: 4,
    summary: 'Sika MonoTop 412 is a structural mortar repair system used for concrete defect repair on parapets, walls, and structural elements. It is TrueSeal\'s specified product for concrete repairs.',
    keyPoints: [
      'Always prime the substrate with Sika MonoTop 910N before applying 412',
      'Apply in layers no thicker than 30mm — build up in passes',
      'Minimum temperature: 5°C. Do not apply in direct sun or rain',
      'Cure time before overcoating: 24 hours minimum',
      'Always follow with Resene primer and topcoat — never leave bare'
    ],
    whyItMatters: 'Using the wrong mortar product or skipping the primer leads to delamination within months. Callbacks damage your quality score and TrueSeal\'s reputation.',
    productRef: 'Sika MonoTop 412 + 910N primer system',
  },
  {
    id: 'dpc-barrier',
    title: 'DPC barriers — What they are and why you never skip them',
    category: 'methodology',
    categoryIcon: '🔧',
    tier: 'Starter',
    readingMinutes: 3,
    summary: 'A DPC (Damp Proof Course) barrier is installed between a concrete or masonry substrate and any metal flashing. It prevents galvanic corrosion and moisture wicking.',
    keyPoints: [
      'Install DPC between ALL concrete/masonry surfaces and Colorsteel flashings',
      'Without DPC, moisture wicks between the flashing and concrete — causing rust and failure within 2–5 years',
      'DPC also prevents galvanic reaction between dissimilar metals',
      'Typical DPC: 2mm closed-cell polyethylene foam tape or Viking Roofspec DPC membrane',
    ],
    whyItMatters: 'Skipping the DPC is invisible on the day — and a costly callback two years later. It is also a NZBC E2 compliance requirement.',
    nzbcRef: 'NZBC E2 / E2/AS1',
  },
  {
    id: 'screw-fixings',
    title: 'Screw fixings — why 14g SS with EPDM washers',
    category: 'methodology',
    categoryIcon: '🔧',
    tier: 'Starter',
    readingMinutes: 2,
    summary: 'TrueSeal specifies 14 gauge stainless steel screws with EPDM washers for all flashing fixings. Here\'s why every part of that specification matters.',
    keyPoints: [
      '14g — strong enough to resist wind uplift on exposed flashings',
      'Stainless steel — no rust, no staining, no corrosion in NZ coastal conditions',
      'EPDM washer — compressible rubber seal that prevents water ingress at each fixing point',
      'Zinc-plated or galvanised screws are NOT acceptable — they corrode within 5 years in NZ conditions',
      'Generic "stainless" without EPDM washers fails E2 — water tracks down every screw hole'
    ],
    whyItMatters: 'Every screw hole is a potential leak point. The EPDM washer is what makes it weathertight. Never substitute.',
    nzbcRef: 'NZBC E2',
    productRef: '14g Stainless Steel wood screws with EPDM washers',
  },
  {
    id: 'f4-fall-protection',
    title: 'NZBC F4 — Working at height basics',
    category: 'safety',
    categoryIcon: '🦺',
    tier: 'All',
    readingMinutes: 3,
    summary: 'Clause F4 of the NZBC covers safety from falling. For roofing and maintenance work, this means fall protection is required any time you\'re more than 1.5m above the ground.',
    keyPoints: [
      'F4 applies at 1.5m and above — that includes second-storey work, roof edges, and parapets',
      'Acceptable controls: edge protection, safety mesh, personal fall arrest (harness), or a combination',
      'Harness alone is not enough — you need an anchor point rated to 15kN',
      'Your JSA must identify the fall risk and specify your control',
      'KattSafe and Monkey Toe are TrueSeal\'s approved anchor suppliers'
    ],
    whyItMatters: 'Falls are the #1 cause of fatalities in NZ construction. F4 is not paperwork — it is the difference between going home and not.',
    nzbcRef: 'NZBC Clause F4 — Safety from Falling',
  },
  {
    id: 'quality-score',
    title: 'Your quality score — how it works',
    category: 'business',
    categoryIcon: '📈',
    tier: 'All',
    readingMinutes: 2,
    summary: 'Your quality score (0–100) tracks your consistency, safety, and workmanship across all jobs. It determines your tier and access to better jobs and rewards.',
    keyPoints: [
      '+2 for every clean daily report (no flags)',
      '+3 bonus for a fully clean week',
      '−5 for a H&S flag on a daily report',
      '−10 for an integrity flag (wrong photos, GPS mismatch)',
      '−3 for a repeated issue flagged in your weekly report',
      'Score is visible to you in this app at all times'
    ],
    whyItMatters: 'Your score is your professional reputation in the TrueSeal network. High scorers get priority job allocation, higher reward thresholds, and faster tier progression.',
  },
]
