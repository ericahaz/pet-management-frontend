import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterPet from './pages/RegisterPet';
import MyPets from './pages/MyPets';
import PetLookup from './pages/PetLookup';
import NewReport from './pages/NewReport';
import Reports from './pages/Reports';
import NewSightingReport from './pages/NewSightingReport';
import Dashboard from './pages/Dashboard';
import SightingQueue from './pages/SightingQueue';
import Users from './pages/Users';

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pet-lookup/:qrId" element={<PetLookup />} />

          <Route path="/pets" element={<ProtectedRoute><MyPets /></ProtectedRoute>} />
          <Route path="/pets/register" element={<ProtectedRoute><RegisterPet /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="/reports/new" element={<ProtectedRoute><NewReport /></ProtectedRoute>} />
          <Route path="/sightings/new" element={<ProtectedRoute><NewSightingReport /></ProtectedRoute>} />

          <Route path="/staff/dashboard" element={<ProtectedRoute staffOnly><Dashboard /></ProtectedRoute>} />
          <Route path="/staff/queue" element={<ProtectedRoute staffOnly><SightingQueue /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute adminOnly><Users /></ProtectedRoute>} />
        </Routes>
      </main>
    </AuthProvider>
  );
}
