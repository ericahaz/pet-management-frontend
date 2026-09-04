import { useEffect, useState } from 'react';
import api from '../api/client';

const ROLE_OPTIONS = ['resident', 'pet_owner', 'barangay_official', 'admin', 'volunteer'];

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function load() {
    setLoading(true);
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Could not load users');
    }
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function updateRole(id, role) {
    await api.put(`/users/${id}/role`, { role });
    load();
  }

  if (loading) return <p>Loading users…</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div>
      <h2>Registered users</h2>
      <div className="grid">
        {users.map((u) => (
          <div className="card" key={u.id}>
            <h3>{u.name}</h3>
            <p className="hint">{u.email}</p>
            <p className="hint">{u.phone}</p>
            <label>Role</label>
            <select value={u.role} onChange={(e) => updateRole(u.id, e.target.value)}>
              {ROLE_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
