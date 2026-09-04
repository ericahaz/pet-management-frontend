import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="card">
      <h2>Community Pet and Stray Animal Management System</h2>
      <p>Register pets, report stray or lost animals, and help keep the community safe.</p>
      {!user && (
        <div className="location-row">
          <Link to="/login" className="button-link">Log in</Link>
          <Link to="/register" className="button-link">Sign up</Link>
        </div>
      )}
      {user && (
        <div className="location-row">
          <Link to="/pets" className="button-link">My pets</Link>
          <Link to="/reports/new" className="button-link">Report an animal</Link>
          <Link to="/sightings/new" className="button-link">Report a sighting</Link>
        </div>
      )}
    </div>
  );
}
