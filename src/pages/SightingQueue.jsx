import { useEffect, useState } from 'react';
import api from '../api/client';

const PRIORITY_CLASS = { high: 'tag-red', medium: 'tag-yellow', low: 'tag-green' };
const STATUS_OPTIONS = ['new', 'forwarded_to_barangay', 'handled'];

export default function SightingQueue() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await api.get('/sightings/queue');
    setReports(res.data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(id, status) {
    await api.put(`/sightings/${id}/status`, { status });
    load();
  }

  if (loading) return <p>Loading queue…</p>;

  return (
    <div>
      <h2>Sighting priority queue</h2>
      {reports.length === 0 && <p>No open sighting reports.</p>}

      <div className="grid">
        {reports.map((r) => (
          <div className="card" key={r.id}>
            <span className={`tag ${PRIORITY_CLASS[r.priority]}`}>{r.priority} priority</span>
            <p>{r.description}</p>
            <p className="hint">Reported by {r.reporter?.name}</p>
            {r.pet && <p className="hint">Possibly: {r.pet.name} ({r.pet.species})</p>}
            <select value={r.status} onChange={(e) => updateStatus(r.id, e.target.value)}>
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
