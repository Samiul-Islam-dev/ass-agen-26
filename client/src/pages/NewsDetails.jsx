import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api.js';
import { PLACEHOLDER } from '../components/NewsCard.jsx';

export default function NewsDetails() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/news/${id}`).then((r) => setNews(r.data)).catch(() => setError('News not found'));
  }, [id]);

  if (error) return <p className="p-10 text-center text-red-600">{error}</p>;
  if (!news) return <p className="p-10 text-center">Loading...</p>;

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Link to="/news" className="text-sm text-red-600 hover:underline">← Back to news</Link>
      <span className="mt-4 inline-block rounded bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">{news.category}</span>
      <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">{news.title}</h1>
      <p className="mt-2 text-sm text-gray-500">
        By {news.author?.name || 'Unknown'} • {new Date(news.createdAt).toLocaleString()} • {news.views} views
      </p>
      <img src={news.image || PLACEHOLDER} alt={news.title}
        onError={(e) => (e.target.src = PLACEHOLDER)}
        className="my-6 max-h-96 w-full rounded-xl object-cover" />
      <p className="whitespace-pre-line text-lg leading-8">{news.content}</p>
      {news.author?.bio && (
        <div className="mt-10 rounded-xl bg-white p-4 shadow">
          <p className="font-semibold">About the author: {news.author.name}</p>
          <p className="text-sm text-gray-600">{news.author.bio}</p>
        </div>
      )}
    </article>
  );
}
