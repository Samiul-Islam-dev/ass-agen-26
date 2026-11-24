import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { errMsg } from '../api.js';
import { useAuth } from '../store/authStore.js';

export default function Dashboard() {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.name || '', phone: user?.phone || '', bio: user?.bio || '', avatar: user?.avatar || '', password: '',
  });
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [myNews, setMyNews] = useState([]);

  const loadNews = () => api.get('/news/mine').then((r) => setMyNews(r.data)).catch(console.error);

  useEffect(() => {
    loadNews();
    api.get('/users/profile').then((r) => {
      setProfile((p) => ({ ...p, name: r.data.name, phone: r.data.phone, bio: r.data.bio, avatar: r.data.avatar }));
    });
  }, []);

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put('/users/profile', profile);
      updateUser(data);
      setProfile((p) => ({ ...p, password: '' }));
      setMsg({ type: 'ok', text: 'Profile updated successfully' });
    } catch (err) { setMsg({ type: 'err', text: errMsg(err) }); }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this news?')) return;
    try { await api.delete(`/news/${id}`); loadNews(); } catch (err) { alert(errMsg(err)); }
  };

  const set = (k) => (e) => setProfile({ ...profile, [k]: e.target.value });

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-3">
      {/* Profile */}
      <section className="h-fit rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold">My Profile</h2>
        <div className="mb-4 flex items-center gap-3">
          <img src={profile.avatar || `https://placehold.co/80x80?text=${(profile.name || 'U')[0]}`}
            onError={(e) => (e.target.src = 'https://placehold.co/80x80?text=U')}
            className="h-16 w-16 rounded-full object-cover" alt="avatar" />
          <div><p className="font-semibold">{user?.name}</p><p className="text-sm text-gray-500">{user?.email}</p></div>
        </div>
        {msg.text && (
          <p className={`mb-3 rounded p-2 text-sm ${msg.type === 'ok' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{msg.text}</p>
        )}
        <form onSubmit={saveProfile} className="space-y-3">
          <input className="input" placeholder="Name" required value={profile.name} onChange={set('name')} />
          <input className="input" placeholder="Phone" value={profile.phone} onChange={set('phone')} />
          <input className="input" placeholder="Avatar image URL" value={profile.avatar} onChange={set('avatar')} />
          <textarea className="input" rows={3} placeholder="Short bio" value={profile.bio} onChange={set('bio')} />
          <input className="input" type="password" placeholder="New password (leave blank to keep)" value={profile.password} onChange={set('password')} />
          <button className="btn w-full">Update Profile</button>
        </form>
      </section>

      {/* My news */}
      <section className="lg:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">My News ({myNews.length})</h2>
          <Link to="/create-news" className="btn">+ New News</Link>
        </div>
        {myNews.length === 0 ? (
          <p className="rounded-xl bg-white p-6 text-gray-500 shadow">You haven't published any news yet.</p>
        ) : (
          <div className="space-y-3">
            {myNews.map((n) => (
              <div key={n._id} className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Link to={`/news/${n._id}`} className="font-semibold hover:text-red-600">{n.title}</Link>
                  <p className="text-xs text-gray-500">{n.category} • {new Date(n.createdAt).toLocaleDateString()} • {n.views} views</p>
                </div>
                <div className="flex gap-2">
                  <Link to={`/edit-news/${n._id}`} className="btn-outline">Edit</Link>
                  <button onClick={() => remove(n._id)} className="btn">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
