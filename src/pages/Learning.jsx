import { useState, useEffect } from 'react'

// Learning Portal — daily practical knowledge for NZ tradespeople
// Content covers: NZBC standards, installation methodology, approved product knowledge
// Lessons are short, visual, and tier-appropriate
// Contributors: see CONTRIBUTING.md for content guidelines

const CATEGORIES = [
  { id: 'nzbc', label: 'NZBC Standards', icon: '📐' },
  { id: 'methodology', label: 'How-To', icon: '🔧' },
  { id: 'products', label: 'Products', icon: '🧪' },
  { id: 'safety', label: 'Safety', icon: '🦺' },
  { id: 'business', label: 'Your Business', icon: '📈' },
]

function LessonCard({ lesson, onComplete }) {
  const [expanded, setExpanded] = useState(false)
  const [done, setDone] = useState(lesson.completed)

  function handleComplete() {
    setDone(true)
    onComplete(lesson.id)
  }

  return (
    <div className={`lesson-card ${done ? 'completed' : ''}`}>
      <div className="lesson-header" onClick={() => setExpanded(!expanded)}>
        <span className="lesson-category-icon">{lesson.categoryIcon}</span>
        <div className="lesson-meta">
          <h3>{lesson.title}</h3>
          <span className="lesson-time">{lesson.readingMinutes} min read · {lesson.tier}</span>
        </div>
        {done && <span className="done-badge">✅</span>}
        <span className="expand-icon">{expanded ? '▲' : '▼'}</span>
      </div>

      {expanded && (
        <div className="lesson-body">
          <p className="lesson-summary">{lesson.summary}</p>

          {lesson.keyPoints && (
            <ul className="key-points">
              {lesson.keyPoints.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
          )}

          {lesson.whyItMatters && (
            <div className="why-box">
              <strong>Why it matters</strong>
              <p>{lesson.whyItMatters}</p>
            </div>
          )}

          {lesson.nzbcRef && (
            <div className="nzbc-ref">
              📐 NZBC reference: <strong>{lesson.nzbcRef}</strong>
            </div>
          )}

          {lesson.productRef && (
            <div className="product-ref">
              🧪 Product: <strong>{lesson.productRef}</strong>
            </div>
          )}

          {!done && (
            <button className="btn-primary" onClick={handleComplete}>
              Mark as done ✓
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function StreakBadge({ streak }) {
  if (!streak) return null
  return (
    <div className="streak-badge">
      🔥 {streak}-day learning streak
    </div>
  )
}

export default function Learning({ contractorId, tier = 'Starter' }) {
  const [lessons, setLessons] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [streak, setStreak] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLessons() {
      try {
        const res = await fetch(`/api/learning/lessons?contractorId=${contractorId}&tier=${tier}`)
        const data = await res.json()
        setLessons(data.lessons || [])
        setStreak(data.streak || 0)
      } catch {
        // Offline fallback — show cached lessons if available
        const cached = localStorage.getItem('lessons_cache')
        if (cached) setLessons(JSON.parse(cached))
      } finally {
        setLoading(false)
      }
    }
    fetchLessons()
  }, [contractorId, tier])

  async function handleComplete(lessonId) {
    await fetch(`/api/learning/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contractorId, lessonId })
    })
    setLessons(prev => prev.map(l => l.id === lessonId ? { ...l, completed: true } : l))
  }

  const filtered = activeCategory === 'all'
    ? lessons
    : lessons.filter(l => l.category === activeCategory)

  const todayLesson = lessons.find(l => l.isToday)
  const completedToday = todayLesson?.completed

  if (loading) return <div className="page loading">Loading lessons...</div>

  return (
    <div className="page learning">
      <header>
        <h2>📚 Learning</h2>
        <StreakBadge streak={streak} />
      </header>

      {todayLesson && !completedToday && (
        <div className="today-banner">
          <span>⭐ Today's lesson</span>
          <span>{todayLesson.title}</span>
        </div>
      )}

      <div className="category-tabs">
        <button
          className={activeCategory === 'all' ? 'active' : ''}
          onClick={() => setActiveCategory('all')}
        >
          All
        </button>
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            className={activeCategory === c.id ? 'active' : ''}
            onClick={() => setActiveCategory(c.id)}
          >
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      <div className="lesson-list">
        {filtered.length === 0 ? (
          <p className="empty-state">No lessons here yet — check back soon.</p>
        ) : (
          filtered.map(lesson => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              onComplete={handleComplete}
            />
          ))
        )}
      </div>

      <div className="learning-footer">
        <p>Content is based on NZBC standards and approved TrueSeal methodology.</p>
        <p>Got a question? Your supervisor or Stefan can help.</p>
      </div>
    </div>
  )
}
