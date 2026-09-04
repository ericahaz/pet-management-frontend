import { useState } from 'react';
import api from '../api/client';

const OPTIONS = [
  { value: 'green', label: 'Friendly', className: 'tag-green', note: 'Safe to approach. If it has a QR tag, scan it directly instead of filing a report.' },
  { value: 'yellow', label: 'Needs space', className: 'tag-yellow', note: 'Approach with caution. Scan the tag if you safely can, or report the sighting below.' },
  { value: 'red', label: 'Aggressive', className: 'tag-red', note: 'Do not approach. Skip scanning — submit the details below and this is flagged high priority for barangay officials.' }
];

export default function NewSightingReport() {
  const [temperament, setTemperament] = useState(null);
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [location, setLocation] = useState(null);
  const [submitted, setSubmitted] = useState(null);
  const [error, setError] = useState('');

  function useMyLocation() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/sightings', {
        temperamentObserved: temperament,
        description,
        photoUrl,
        locationLat: location?.lat,
        locationLng: location?.lng
      });
      setSubmitted(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Could not submit sighting report');
    }
  }

  if (submitted) {
    return (
      <div className="card">
        <p>Report sent to barangay officials.</p>
        <p className="hint">Priority: {submitted.priority}</p>
      </div>
    );
  }

  const selected = OPTIONS.find((o) => o.value === temperament);

  return (
    <div className="card form-card">
      <h2>Report a sighting</h2>
      <p className="hint">How does the animal look?</p>
      <div className="temperament-picker">
        {OPTIONS.map((o) => (
          <button
            type="button"
            key={o.value}
            className={`temp-btn ${o.className} ${temperament === o.value ? 'selected' : ''}`}
            onClick={() => setTemperament(o.value)}
          >
            {o.label}
          </button>
        ))}
      </div>

      {selected && (
        <>
          <p className={`note ${selected.className}`}>{selected.note}</p>

          {temperament !== 'green' && (
            <form onSubmit={handleSubmit}>
              <label>Location</label>
              <button type="button" onClick={useMyLocation}>
                {location ? 'Location captured' : 'Use current location'}
              </button>

              <label>Photo URL (optional, taken from a safe distance)</label>
              <input value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="https://..." />

              <label>Description</label>
              <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />

              {error && <p className="error-text">{error}</p>}
              <button type="submit">Submit report</button>
            </form>
          )}
        </>
      )}
    </div>
  );
}
