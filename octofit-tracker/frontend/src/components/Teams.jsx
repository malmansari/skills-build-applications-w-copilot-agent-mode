import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

// API endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/
function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetchCollection('teams')
      .then((records) => { setTeams(records); setStatus('ready') })
      .catch(() => setStatus('error'))
  }, [])

  if (status === 'loading') return <p className="loading">Loading teams...</p>
  if (status === 'error') return <p className="alert alert-danger">Teams are unavailable right now.</p>

  return (
    <section className="panel-section"><div className="section-heading"><div><span className="eyebrow">Find your pace</span><h2>Teams</h2></div><span className="count-badge">{teams.length} crews</span></div>
      <div className="record-grid">{teams.map((team) => <article className="team-card" key={team._id || team.id || team.name} style={{ '--team-color': team.color || '#e76f51' }}><span className="team-mark" /><h3>{team.name}</h3><p>{team.description}</p><small>{team.memberIds?.length || 0} members</small></article>)}</div>
    </section>
  )
}

export default Teams
