import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/client';

export default function PetLookup() {
  const { qrId } = useParams();
  const [pet, setPet] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/pets/lookup/${qrId}`)
      .then((res) => setPet(res.data))
      .catch(() => setError('No pet found for this tag.'));
  }, [qrId]);

  if (error) return <div className="card"><p className="error-text">{error}</p></div>;
  if (!pet) return <p>Looking up pet…</p>;

  return (
    <div className="card form-card">
      <h2>{pet.name}</h2>
      {pet.photoUrl && <img src={pet.photoUrl} alt={pet.name} width={200} />}
      <p>{pet.species}{pet.breed ? ` — ${pet.breed}` : ''}</p>
      <h3>Owner contact</h3>
      <p>{pet.owner?.name}</p>
      <p>{pet.owner?.phone}</p>
      {pet.status === 'expired' && (
        <p className="error-text">This pet's registration has expired — owner details may be outdated.</p>
      )}
    </div>
  );
}
