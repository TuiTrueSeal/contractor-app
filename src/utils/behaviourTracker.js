// Behaviour Tracker — feeds Toi's creative algorithm
// Every meaningful contractor interaction is logged here
// Toi reads this feed to understand what resonates in this market
// Data is aggregate only — no individual profiling for advertising

const API = import.meta.env.VITE_API_URL || ''

export const BehaviourEvent = {
  // Marketplace
  DEAL_VIEW:        'deal_view',
  DEAL_CLICK:       'deal_click',
  DEAL_SAVE:        'deal_save',
  DEAL_DISMISS:     'deal_dismiss',

  // Learning
  LESSON_OPEN:      'lesson_open',
  LESSON_COMPLETE:  'lesson_complete',
  LESSON_SKIP:      'lesson_skip',

  // App navigation
  TAB_VIEW:         'tab_view',
  SESSION_START:    'session_start',
  SESSION_END:      'session_end',

  // Reports
  REPORT_SUBMIT:    'report_submit',
  PHOTO_UPLOAD:     'photo_upload',

  // Check-in
  CHECKIN_SUBMIT:   'checkin_submit',
  CHECKIN_TIME:     'checkin_time',
}

// Batch queue — flush every 30s or when queue hits 20 events
const queue = []
let flushTimer = null

export function track(event, meta = {}) {
  queue.push({
    event,
    meta,
    ts: Date.now(),
    // No contractorId in ad-targeting events — aggregate only
    // ContractorId is added server-side from the auth session
  })

  if (queue.length >= 20) flush()
  if (!flushTimer) flushTimer = setTimeout(flush, 30000)
}

async function flush() {
  if (flushTimer) { clearTimeout(flushTimer); flushTimer = null }
  if (!queue.length) return

  const batch = queue.splice(0, queue.length)

  try {
    await fetch(`${API}/api/behaviour/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events: batch }),
      keepalive: true,
    })
  } catch {
    // Non-critical — behaviour data loss is acceptable
    // Store in localStorage for retry on next session
    const pending = JSON.parse(localStorage.getItem('behaviour_pending') || '[]')
    localStorage.setItem('behaviour_pending', JSON.stringify([...pending, ...batch].slice(-200)))
  }
}

// Flush on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush()
  })
}
