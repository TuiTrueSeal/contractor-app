import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Wellbeing from './pages/Wellbeing.jsx'
import Learning from './pages/Learning.jsx'
import Marketplace from './pages/Marketplace.jsx'

// Placeholder pages — contributors pick these up from GitHub issues
function CheckIn() {
  return <div className="page"><header><h2>Morning Check-In</h2><p>Coming soon — see GitHub issue #1</p></header></div>
}
function JSA() {
  return <div className="page"><header><h2>Job Safety Analysis</h2><p>Coming soon — see GitHub issue #5</p></header></div>
}
function DailyReport() {
  return <div className="page"><header><h2>Daily Report</h2><p>Coming soon</p></header></div>
}

const DEMO_CONTRACTOR = {
  firstName: 'Demo',
  tier: 'Journeyman',
  qualityScore: 74,
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home contractor={DEMO_CONTRACTOR} />} />
        <Route path="/checkin" element={<CheckIn />} />
        <Route path="/jsa" element={<JSA />} />
        <Route path="/report" element={<DailyReport />} />
        <Route path="/wellbeing" element={<Wellbeing contractorId="demo" onSubmit={async () => {}} />} />
        <Route path="/learning" element={<Learning contractorId="demo" tier={DEMO_CONTRACTOR.tier} />} />
        <Route path="/marketplace" element={<Marketplace contractorId="demo" contractorTier={DEMO_CONTRACTOR.tier} />} />
      </Routes>

      <nav className="bottom-nav">
        <NavLink to="/" end><span className="nav-icon">🏠</span>Home</NavLink>
        <NavLink to="/checkin"><span className="nav-icon">☀️</span>Check-in</NavLink>
        <NavLink to="/jsa"><span className="nav-icon">📋</span>JSA</NavLink>
        <NavLink to="/wellbeing"><span className="nav-icon">💙</span>Wellbeing</NavLink>
        <NavLink to="/learning"><span className="nav-icon">📚</span>Learn</NavLink>
        <NavLink to="/marketplace"><span className="nav-icon">🔥</span>Deals</NavLink>
      </nav>
    </BrowserRouter>
  )
}
