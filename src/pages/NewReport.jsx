import { useState } from 'react';
import api from '../api/client';

export default function NewReport() {
  const [form, setForm] = useState({
    reportType: 'stray', animalType: '', description: '', photoUrl: '', locationText: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function useMyLocation() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      setForm((f) => ({
        ...f,
        locationLat: pos.coords.latitude,
        locationLng: pos.coords.longitude,
        locationText: 'Using current location'
      }));
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await api.post('/reports', form);
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Could not submit report');
    }
  }

  if (submitted) {
    return <div className="card"><p>Report submitted. Barangay officials will review it shortly.</p></div>;
  }

  return (
    <div className="card form-card">
      <h2>Report a stray, lost, or found animal</h2>
      <form onSubmit={handleSubmit}>
        <label>Report type</label>
        <select value={form.reportType} onChange={(e) => update('reportType', e.target.value)}>
          <option value="stray">Stray animal</option>
          <option value="lost">Lost pet</option>
          <option value="found">Found animal</option>
        </select>

        <label>Animal type</label>
        <input value={form.animalType} onChange={(e) => update('animalType', e.target.value)} placeholder="Dog, cat, etc." />

        <label>Description</label>
        <textarea rows={3} value={form.description} onChange={(e) => update('description', e.target.value)} required />

        <label>Photo URL</label>
        <input value={form.photoUrl} onChange={(e) => update('photoUrl', e.target.value)} placeholder="https://..." />

        <label>Location</label>
        <div className="location-row">
          <input value={form.locationText} onChange={(e) => update('locationText', e.target.value)} placeholder="Near the covered court" />
          <button type="button" onClick={useMyLocation}>Use current location</button>
        </div>

        {error && <p className="error-text">{error}</p>}
        <button type="submit">Submit report</button>
      </form>
    </div>
  );
}
