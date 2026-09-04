import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, isStaff, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <Link to="/" className="brand">Community Pet System</Link>
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/pets">My pets</Link>
            <Link to="/reports">Reports</Link>
            <Link to="/sightings/new">Report sighting</Link>
            {isStaff && <Link to="/staff/dashboard">Dashboard</Link>}
            {isStaff && <Link to="/staff/queue">Priority queue</Link>}
            {user.role === 'admin' && <Link to="/admin/users">Users</Link>}
            <span className="user-chip">{user.name} ({user.role})</span>
            <button onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/register">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
