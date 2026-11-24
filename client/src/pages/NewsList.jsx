import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api, { CATEGORIES } from '../api.js';
import NewsCard from '../components/NewsCard.jsx';

export default function NewsList() {
  const [params, setParams] = useSearchParams();
  const category = params.get('category') || 'All';
  const [q, setQ] = useState('');
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.get('/news', { params: { category, q } })
      .then((res) => setNews(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(load, [category]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold">All News</h1>
      <form onSubmit={(e) => { e.preventDefault(); load(); }} className="mb-6 flex gap-2">
        <input className="input" placeholder="Search news by title..." value={q} onChange={(e) => setQ(e.target.value)} />
        <button className="btn">Search</button>
      </form>
      <div className="mb-8 flex flex-wrap gap-2">
        {['All', ...CATEGORIES].map((c) => (
          <button key={c} onClick={() => setParams(c === 'All' ? {} : { category: c })}
            className={`rounded-full px-4 py-1 text-sm ${category === c ? 'bg-red-600 text-white' : 'bg-white shadow hover:bg-red-50'}`}>
            {c}
          </button>
        ))}
      </div>
      {loading ? <p>Loading...</p> : news.length === 0 ? <p className="text-gray-500">No news found.</p> : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((n) => <NewsCard key={n._id} news={n} />)}
        </div>
      )}
    </div>
  );
}
