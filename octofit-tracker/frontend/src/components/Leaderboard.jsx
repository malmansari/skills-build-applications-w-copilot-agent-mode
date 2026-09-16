import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetchCollection('leaderboard')
      .then((records) => { setEntries(records); setStatus('ready') })
      .catch(() => setStatus('error'))
  }, [])

  if (status === 'loading') return <p className="loading">Loading leaderboard...</p>
  if (status === 'error') return <p className="alert alert-danger">Leaderboard is unavailable right now.</p>

  return (
    <section className="panel-section"><div className="section-heading"><div><span className="eyebrow">Weekly challenge</span><h2>Leaderboard</h2></div><span className="count-badge">Top {entries.length}</span></div>
      <div className="leaderboard-list">{entries.map((entry, index) => <div className="leaderboard-row" key={entry._id || entry.id}><span className={`rank rank-${index + 1}`}>{entry.rank || index + 1}</span><div className="leaderboard-name"><strong>{entry.username || entry.name || `Athlete ${index + 1}`}</strong><small>{entry.week || 'Current week'}</small></div><strong className="points">{entry.points?.toLocaleString()} pts</strong></div>)}</div>
    </section>
  )
}

export default Leaderboard
