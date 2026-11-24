import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/authStore.js';

export default function ProtectedRoute({ children }) {
  const token = useAuth((s) => s.token);
  return token ? children : <Navigate to="/login" replace />;
}
