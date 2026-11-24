import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-12 bg-gray-900 text-gray-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h3 className="mb-2 text-xl font-bold text-white">The Daily Portal</h3>
          <p className="text-sm">Your trusted place to read and publish news from around the world.</p>
        </div>
        <div>
          <h4 className="mb-2 font-semibold text-white">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/news" className="hover:text-white">All News</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-2 font-semibold text-white">Contact</h4>
          <p className="text-sm">support@dailyportal.com</p>
          <p className="text-sm">Chittagong, Bangladesh</p>
        </div>
      </div>
      <p className="border-t border-gray-700 py-4 text-center text-sm">
        © {new Date().getFullYear()} The Daily Portal. All rights reserved.
      </p>
    </footer>
  );
}
