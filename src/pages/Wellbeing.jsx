import { useState } from 'react'

// This screen is not optional. It is not a feature.
// A contractor took his own life. This exists because of that.
// If you're contributing to this file — thank you for taking it seriously.

const RESPONSES = [
  { emoji: '😊', label: "Good — ready to go", value: 5 },
  { emoji: '🙂', label: "Pretty good", value: 4 },
  { emoji: '😐', label: "Okay, getting on with it", value: 3 },
  { emoji: '😔', label: "A bit rough today", value: 2 },
  { emoji: '😞', label: "Really struggling", value: 1 },
]

export default function Wellbeing({ contractorId, onSubmit }) {
  const [selected, setSelected] = useState(null)
  const [note, setNote] = useState('')
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit() {
    if (!selected) return
    await onSubmit({ contractorId, score: selected.value, note })
    setSubmitted(true)
  }

  if (submitted) {
    const needsSupport = selected.value <= 2
    return (
      <div className="page wellbeing submitted">
        {needsSupport ? (
          <>
            <h2>Thanks for telling me 💙</h2>
            <p>You don't have to carry that alone. Stefan's been notified — someone will check in with you today.</p>
            <p className="support-line">
              If you need to talk right now:<br />
              <strong>Mates in Construction: 0800 111 315</strong>
            </p>
          </>
        ) : (
          <>
            <h2>Cheers — have a good one out there 👊</h2>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="page wellbeing">
      <h2>How are you doing today?</h2>
      <p>Honest answer — no judgment.</p>

      <div className="wellbeing-options">
        {RESPONSES.map(r => (
          <button
            key={r.value}
            className={`wellbeing-option ${selected?.value === r.value ? 'selected' : ''}`}
            onClick={() => setSelected(r)}
          >
            <span className="emoji">{r.emoji}</span>
            <span>{r.label}</span>
          </button>
        ))}
      </div>

      {selected?.value <= 2 && (
        <textarea
          placeholder="Want to say anything? (optional — just for you and the team)"
          value={note}
          onChange={e => setNote(e.target.value)}
          rows={3}
        />
      )}

      <button className="btn-primary" onClick={handleSubmit} disabled={!selected}>
        Submit
      </button>
    </div>
  )
}
