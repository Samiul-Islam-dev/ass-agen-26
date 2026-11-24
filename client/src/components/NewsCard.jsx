import { Link } from 'react-router-dom';

export const PLACEHOLDER = 'https://placehold.co/600x400?text=News';

export default function NewsCard({ news }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow transition hover:shadow-lg">
      <img
        src={news.image || PLACEHOLDER}
        alt={news.title}
        onError={(e) => (e.target.src = PLACEHOLDER)}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">{news.category}</span>
        <h3 className="mt-2 line-clamp-2 text-lg font-bold">{news.title}</h3>
        <p className="mt-1 line-clamp-3 text-sm text-gray-600">{news.content}</p>
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>{news.author?.name || 'Unknown'} • {new Date(news.createdAt).toLocaleDateString()}</span>
          <Link to={`/news/${news._id}`} className="font-semibold text-red-600 hover:underline">Read more →</Link>
        </div>
      </div>
    </div>
  );
}
