import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

// API endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/
function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetchCollection('workouts')
      .then((records) => { setWorkouts(records); setStatus('ready') })
      .catch(() => setStatus('error'))
  }, [])

  if (status === 'loading') return <p className="loading">Loading workouts...</p>
  if (status === 'error') return <p className="alert alert-danger">Workouts are unavailable right now.</p>

  return (
    <section className="panel-section"><div className="section-heading"><div><span className="eyebrow">Personal plan</span><h2>Suggested workouts</h2></div><span className="count-badge">{workouts.length} options</span></div>
      <div className="record-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id || workout.id || workout.name}><div className="workout-meta"><span>{workout.type}</span><span>{workout.duration} min</span></div><h3>{workout.name}</h3><p>{workout.description}</p><small>{workout.difficulty}</small></article>)}</div>
    </section>
  )
}

export default Workouts
