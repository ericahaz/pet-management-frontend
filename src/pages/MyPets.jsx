import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';

const TEMPERAMENT_LABEL = {
  green_friendly: { label: 'Friendly', className: 'tag-green' },
  yellow_caution: { label: 'Needs space', className: 'tag-yellow' },
  red_aggressive: { label: 'Aggressive', className: 'tag-red' }
};

export default function MyPets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadPets() {
    setLoading(true);
    const res = await api.get('/pets/mine');
    setPets(res.data);
    setLoading(false);
  }

  useEffect(() => {
    loadPets();
  }, []);

  async function handleRenew(petId) {
    await api.put(`/pets/${petId}/renew`);
    loadPets();
  }

  if (loading) return <p>Loading your pets…</p>;

  return (
    <div>
      <div className="page-header">
        <h2>My pets</h2>
        <Link to="/pets/register" className="button-link">Register a pet</Link>
      </div>

      {pets.length === 0 && <p>You haven't registered any pets yet.</p>}

      <div className="grid">
        {pets.map((pet) => {
          const temp = TEMPERAMENT_LABEL[pet.temperament] || TEMPERAMENT_LABEL.green_friendly;
          const expiringSoon = new Date(pet.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

          return (
            <div className="card" key={pet.id}>
              <h3>{pet.name}</h3>
              <p>{pet.species}{pet.breed ? ` — ${pet.breed}` : ''}</p>
              <span className={`tag ${temp.className}`}>{temp.label}</span>
              <p className={pet.status === 'expired' ? 'error-text' : ''}>
                Status: {pet.status} · Expires {new Date(pet.expiryDate).toLocaleDateString()}
              </p>
              {(pet.status === 'expired' || expiringSoon) && (
                <button onClick={() => handleRenew(pet.id)}>Renew registration</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
