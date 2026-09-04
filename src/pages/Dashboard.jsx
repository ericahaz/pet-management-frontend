import { useEffect, useState } from 'react';
import api from '../api/client';

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/dashboard/overview').then((res) => setData(res.data));
  }, []);

  if (!data) return <p>Loading dashboard…</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="grid metrics">
        <div className="card">
          <h3>Pets</h3>
          <p>Total: {data.pets.total}</p>
          <p>Active: {data.pets.active}</p>
          <p>Expired: {data.pets.expired}</p>
        </div>
        <div className="card">
          <h3>Reports</h3>
          <p>Pending: {data.reports.pending}</p>
          <p>Resolved: {data.reports.resolved}</p>
        </div>
        <div className="card">
          <h3>Sightings</h3>
          <p>Open: {data.sightings.totalOpen}</p>
          <p className="error-text">High priority open: {data.sightings.highPriorityOpen}</p>
        </div>
      </div>
    </div>
  );
}
