import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getRoleLandingPath } from '../utils/roleRedirect';

export default function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '', address: '', role: 'resident'
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const newUser = await register(form);
      navigate(getRoleLandingPath(newUser.role));
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  }

  return (
    <div className="card form-card">
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit}>
        <label>Full name</label>
        <input value={form.name} onChange={(e) => update('name', e.target.value)} required />

        <label>Email</label>
        <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required />

        <label>Password</label>
        <input type="password" value={form.password} onChange={(e) => update('password', e.target.value)} required />

        <label>Phone</label>
        <input value={form.phone} onChange={(e) => update('phone', e.target.value)} />

        <label>Address</label>
        <input value={form.address} onChange={(e) => update('address', e.target.value)} />

        <label>I am registering as</label>
        <select value={form.role} onChange={(e) => update('role', e.target.value)}>
          <option value="resident">Resident</option>
          <option value="pet_owner">Pet owner</option>
          <option value="volunteer">Animal rescue volunteer</option>
        </select>

        {error && <p className="error-text">{error}</p>}
        <button type="submit">Create account</button>
      </form>
      <p>Already have an account? <Link to="/login">Log in</Link></p>
    </div>
  );
}
