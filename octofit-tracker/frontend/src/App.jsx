import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const navigation = [
  { path: '/', label: 'Overview', icon: '⌂' },
  { path: '/activities', label: 'Activity', icon: '↗' },
  { path: '/leaderboard', label: 'Leaderboard', icon: '★' },
  { path: '/teams', label: 'Teams', icon: '◎' },
  { path: '/users', label: 'Members', icon: '◌' },
  { path: '/workouts', label: 'Workouts', icon: '◒' },
]

function Overview() {
  return (
    <section className="overview">
      <div className="overview-copy">
        <span className="eyebrow">Your movement, in focus</span>
        <h2>Small steps.<br /><em>Strong momentum.</em></h2>
        <p>Track the work, find your people, and keep your next good decision close.</p>
      </div>
      <div className="overview-orbit" aria-hidden="true"><span>FIT</span><b>O</b></div>
      <div className="quick-grid">
        <NavLink to="/activities" className="quick-card coral"><span>↗</span><strong>Log activity</strong><small>See the latest movement</small></NavLink>
        <NavLink to="/workouts" className="quick-card teal"><span>◒</span><strong>Choose a workout</strong><small>Find your next session</small></NavLink>
        <NavLink to="/leaderboard" className="quick-card mustard"><span>★</span><strong>Check the board</strong><small>See who is climbing</small></NavLink>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink to="/" className="brand"><span className="brand-mark">O</span><span>octofit <i>tracker</i></span></NavLink>
        <div className="status-pill"><span /> API connected</div>
      </header>
      <div className="app-body">
        <aside className="sidebar" aria-label="Primary navigation">
          <p className="nav-label">Workspace</p>
          <nav>{navigation.map((item) => <NavLink key={item.path} to={item.path} end={item.path === '/'} className={({ isActive }) => isActive ? 'active' : ''}><span className="nav-icon">{item.icon}</span>{item.label}</NavLink>)}</nav>
          <div className="sidebar-note"><span>01</span><p>Consistency is a team sport.</p></div>
        </aside>
        <main className="main-content"><Routes><Route path="/" element={<Overview />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /></Routes></main>
      </div>
    </div>
  )
}

export default App
