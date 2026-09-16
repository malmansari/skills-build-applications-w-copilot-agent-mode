import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

// API endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/
function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetchCollection('activities')
      .then((records) => { setActivities(records); setStatus('ready') })
      .catch(() => setStatus('error'))
  }, [])

  if (status === 'loading') return <p className="loading">Loading activity feed...</p>
  if (status === 'error') return <p className="alert alert-danger">Activity data is unavailable right now.</p>

  return (
    <section className="panel-section">
      <div className="section-heading"><div><span className="eyebrow">Live feed</span><h2>Recent activity</h2></div><span className="count-badge">{activities.length} logged</span></div>
      <div className="table-wrap"><table className="activity-table"><thead><tr><th>Type</th><th>Duration</th><th>Distance</th><th>Calories</th><th>Date</th></tr></thead><tbody>
        {activities.map((activity) => <tr key={activity._id || activity.id}><td><strong>{activity.type}</strong></td><td>{activity.duration} min</td><td>{activity.distance ? `${activity.distance} km` : '—'}</td><td>{activity.calories} kcal</td><td>{activity.date ? new Date(activity.date).toLocaleDateString() : '—'}</td></tr>)}
      </tbody></table></div>
    </section>
  )
}

export default Activities
