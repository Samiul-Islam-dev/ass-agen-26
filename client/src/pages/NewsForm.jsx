import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api, { CATEGORIES, errMsg } from '../api.js';

export default function NewsForm() {
  const { id } = useParams(); // present when editing
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '', category: 'General', image: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    api.get('/news/mine')
      .then((r) => {
        const item = r.data.find((n) => n._id === id);
        if (!item) return navigate('/dashboard');
        setForm({ title: item.title, content: item.content, category: item.category, image: item.image || '' });
      })
      .catch(() => navigate('/dashboard'));
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      if (id) await api.put(`/news/${id}`, form);
      else await api.post('/news', form);
      navigate('/dashboard');
    } catch (err) { setError(errMsg(err)); }
    setLoading(false);
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="mx-auto my-10 max-w-2xl rounded-xl bg-white p-8 shadow">
      <h1 className="mb-6 text-2xl font-bold">{id ? 'Edit News' : 'Publish New News'}</h1>
      {error && <p className="mb-4 rounded bg-red-100 p-2 text-sm text-red-700">{error}</p>}
      <form onSubmit={submit} className="space-y-4">
        <input className="input" placeholder="Title" required value={form.title} onChange={set('title')} />
        <select className="input" value={form.category} onChange={set('category')}>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <input className="input" placeholder="Image URL (optional)" value={form.image} onChange={set('image')} />
        <textarea className="input" rows={10} placeholder="Write your news..." required value={form.content} onChange={set('content')} />
        <div className="flex gap-3">
          <button className="btn" disabled={loading}>{loading ? 'Saving...' : id ? 'Update' : 'Publish'}</button>
          <button type="button" className="btn-outline" onClick={() => navigate('/dashboard')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
