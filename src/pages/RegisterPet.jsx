import { useState } from 'react';
import api from '../api/client';

export default function RegisterPet() {
  const [form, setForm] = useState({
    name: '', species: '', breed: '', color: '', age: '', photoUrl: '', temperament: 'green_friendly'
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setResult(null);
    try {
      const res = await api.post('/pets', form);
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Could not register pet');
    }
  }

  return (
    <div className="card form-card">
      <h2>Register a pet</h2>
      <form onSubmit={handleSubmit}>
        <label>Pet name</label>
        <input value={form.name} onChange={(e) => update('name', e.target.value)} required />

        <label>Species</label>
        <input value={form.species} onChange={(e) => update('species', e.target.value)} placeholder="Dog, cat, etc." required />

        <label>Breed</label>
        <input value={form.breed} onChange={(e) => update('breed', e.target.value)} />

        <label>Color</label>
        <input value={form.color} onChange={(e) => update('color', e.target.value)} />

        <label>Age</label>
        <input type="number" min="0" value={form.age} onChange={(e) => update('age', e.target.value)} />

        <label>Photo URL</label>
        <input value={form.photoUrl} onChange={(e) => update('photoUrl', e.target.value)} placeholder="https://..." />

        <label>Temperament tag</label>
        <select value={form.temperament} onChange={(e) => update('temperament', e.target.value)}>
          <option value="green_friendly">Green — friendly</option>
          <option value="yellow_caution">Yellow — needs space</option>
          <option value="red_aggressive">Red — aggressive / do not approach</option>
        </select>

        {error && <p className="error-text">{error}</p>}
        <button type="submit">Register pet</button>
      </form>

      {result && (
        <div className="qr-result">
          <p>Registered! Registration is valid until <strong>{new Date(result.pet.expiryDate).toLocaleDateString()}</strong>.</p>
          <img src={result.qrImage} alt={`QR code for ${result.pet.name}`} width={180} height={180} />
          <p className="hint">Print this QR code onto the pet's tag/collar.</p>
        </div>
      )}
    </div>
  );
}
