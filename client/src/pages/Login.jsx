import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { errMsg } from '../api.js';
import { useAuth } from '../store/authStore.js';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const setAuth = useAuth((s) => s.setAuth);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      setAuth(data);
      navigate('/dashboard');
    } catch (err) { setError(errMsg(err)); }
    setLoading(false);
  };

  return (
    <div className="mx-auto my-12 max-w-md rounded-xl bg-white p-8 shadow">
      <h1 className="mb-6 text-center text-2xl font-bold">Login</h1>
      {error && <p className="mb-4 rounded bg-red-100 p-2 text-sm text-red-700">{error}</p>}
      <form onSubmit={submit} className="space-y-4">
        <input className="input" type="email" placeholder="Email" required value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="input" type="password" placeholder="Password" required value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn w-full" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
      <p className="mt-4 text-center text-sm">No account? <Link to="/register" className="text-red-600 hover:underline">Register</Link></p>
    </div>
  );
}
