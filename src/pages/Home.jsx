import { Link } from 'react-router-dom'

export default function Home({ contractor }) {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Morning' : hour < 17 ? 'Afternoon' : 'Evening'

  return (
    <div className="page home">
      <header>
        <h1>Kia ora {contractor?.firstName || 'there'} 👋</h1>
        <p>{greeting} — here's your day</p>
      </header>

      <nav className="action-grid">
        <Link to="/checkin" className="card primary">
          <span className="icon">☀️</span>
          <span>Morning Check-In</span>
        </Link>
        <Link to="/jsa" className="card">
          <span className="icon">📋</span>
          <span>Start JSA</span>
        </Link>
        <Link to="/report" className="card">
          <span className="icon">📸</span>
          <span>Daily Report</span>
        </Link>
        <Link to="/wellbeing" className="card wellbeing">
          <span className="icon">💙</span>
          <span>How are you doing?</span>
        </Link>
        <Link to="/learning" className="card">
          <span className="icon">📚</span>
          <span>Today's Lesson</span>
        </Link>
      </nav>

      {contractor?.tier && (
        <div className="tier-badge">
          <span>🏆 {contractor.tier}</span>
          <span>Score: {contractor.qualityScore}</span>
        </div>
      )}
    </div>
  )
}
