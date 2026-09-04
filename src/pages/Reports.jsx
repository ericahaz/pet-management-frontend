import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

const STATUS_OPTIONS = ['pending', 'verified', 'in_progress', 'resolved', 'closed'];

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isStaff } = useAuth();

  async function load() {
    setLoading(true);
    const res = await api.get('/reports');
    setReports(res.data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(id, status) {
    await api.put(`/reports/${id}/status`, { status });
    load();
  }

  if (loading) return <p>Loading reports…</p>;

  return (
    <div>
      <div className="page-header">
        <h2>Reports</h2>
        <Link to="/reports/new" className="button-link">New report</Link>
      </div>

      {reports.length === 0 && <p>No reports yet.</p>}

      <div className="grid">
        {reports.map((r) => (
          <div className="card" key={r.id}>
            <h3>{r.reportType} — {r.animalType || 'unknown animal'}</h3>
            <p>{r.description}</p>
            <p className="hint">{r.locationText}</p>
            <p>Status: <strong>{r.status}</strong></p>
            {isStaff && (
              <select value={r.status} onChange={(e) => updateStatus(r.id, e.target.value)}>
                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
