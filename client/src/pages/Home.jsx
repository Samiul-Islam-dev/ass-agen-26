import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { CATEGORIES } from '../api.js';
import NewsCard from '../components/NewsCard.jsx';
import { useAuth } from '../store/authStore.js';

export default function Home() {
  const [top, setTop] = useState([]);
  const [tech, setTech] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useAuth((s) => s.user);

  useEffect(() => {
    Promise.all([api.get('/news?limit=6'), api.get('/news?category=Technology&limit=3')])
      .then(([a, b]) => { setTop(a.data); setTech(b.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Section 1: Hero */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 py-16 text-center text-white">
        <h1 className="text-4xl font-extrabold md:text-5xl">Stay Informed. Stay Ahead.</h1>
        <p className="mx-auto mt-3 max-w-xl px-4">Read the latest stories or become a reporter and publish your own news.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/news" className="rounded-lg bg-white px-5 py-2 font-semibold text-red-600">Browse News</Link>
          <Link to={user ? '/create-news' : '/register'} className="rounded-lg border border-white px-5 py-2 font-semibold">
            {user ? 'Write News' : 'Join Now'}
          </Link>
        </div>
      </section>

      {/* Section 2: Top 6 news (API) */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="mb-6 border-l-4 border-red-600 pl-3 text-2xl font-bold">Top Stories</h2>
        {loading ? <p>Loading...</p> : top.length === 0 ? (
          <p className="text-gray-500">No news yet. Be the first to publish!</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {top.map((n) => <NewsCard key={n._id} news={n} />)}
          </div>
        )}
      </section>

      {/* Section 3: Categories */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-6 border-l-4 border-red-600 pl-3 text-2xl font-bold">Browse by Category</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {CATEGORIES.map((c) => (
              <Link key={c} to={`/news?category=${c}`}
                className="rounded-xl border bg-gray-50 p-5 text-center font-semibold transition hover:bg-red-600 hover:text-white">
                {c}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Technology news (API) */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="border-l-4 border-red-600 pl-3 text-2xl font-bold">Technology</h2>
          <Link to="/news?category=Technology" className="text-red-600 hover:underline">See all →</Link>
        </div>
        {tech.length === 0 ? <p className="text-gray-500">No technology news yet.</p> : (
          <div className="grid gap-6 md:grid-cols-3">
            {tech.map((n) => <NewsCard key={n._id} news={n} />)}
          </div>
        )}
      </section>

      {/* Section 5: Call to action */}
      <section className="bg-gray-900 py-14 text-center text-white">
        <h2 className="text-3xl font-bold">Have a story to tell?</h2>
        <p className="mt-2 text-gray-300">Register for free and publish your own news in minutes.</p>
        <Link to={user ? '/create-news' : '/register'} className="btn mt-5">Start Writing</Link>
      </section>
    </div>
  );
}
