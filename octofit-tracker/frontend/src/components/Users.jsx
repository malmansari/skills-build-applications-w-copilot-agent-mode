import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetchCollection('users')
      .then((records) => {
        setUsers(records)
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  if (status === 'loading') return <p className="loading">Loading members...</p>
  if (status === 'error') return <p className="alert alert-danger">Members are unavailable right now.</p>

  return (
    <section className="panel-section">
      <div className="section-heading">
        <div><span className="eyebrow">Community</span><h2>Members</h2></div>
        <span className="count-badge">{users.length} active</span>
      </div>
      <div className="record-grid">
        {users.map((user) => (
          <article className="record-card" key={user._id || user.id || user.username}>
            <div className="avatar">{user.avatar || user.name?.slice(0, 2).toUpperCase()}</div>
            <div><h3>{user.name}</h3><p>@{user.username}</p><small>{user.email}</small></div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Users
