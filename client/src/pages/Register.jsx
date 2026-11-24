import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { errMsg } from '../api.js';
import { useAuth } from '../store/authStore.js';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const setAuth = useAuth((s) => s.setAuth);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const { data } = await api.post('/auth/register', form);
      setAuth(data);
      navigate('/dashboard');
    } catch (err) { setError(errMsg(err)); }
    setLoading(false);
  };

  return (
    <div className="mx-auto my-12 max-w-md rounded-xl bg-white p-8 shadow">
      <h1 className="mb-6 text-center text-2xl font-bold">Create Account</h1>
      {error && <p className="mb-4 rounded bg-red-100 p-2 text-sm text-red-700">{error}</p>}
      <form onSubmit={submit} className="space-y-4">
        <input className="input" placeholder="Full name" required value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="input" type="email" placeholder="Email" required value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="input" type="password" placeholder="Password (min 6 chars)" required minLength={6} value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn w-full" disabled={loading}>{loading ? 'Creating...' : 'Register'}</button>
      </form>
      <p className="mt-4 text-center text-sm">Already have an account? <Link to="/login" className="text-red-600 hover:underline">Login</Link></p>
    </div>
  );
}
