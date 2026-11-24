import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/authStore.js';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const link = ({ isActive }) =>
    `block py-2 md:py-0 ${isActive ? 'font-semibold text-red-600' : 'hover:text-red-600'}`;

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-2xl font-bold text-red-600">The Daily Portal</Link>
        <button className="text-2xl md:hidden" onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
        <nav
          onClick={() => setOpen(false)}
          className={`${open ? 'block' : 'hidden'} absolute left-0 top-full w-full bg-white px-4 pb-4 shadow md:static md:flex md:w-auto md:items-center md:gap-6 md:p-0 md:shadow-none`}
        >
          <NavLink to="/" className={link}>Home</NavLink>
          <NavLink to="/news" className={link}>News</NavLink>
          <NavLink to="/contact" className={link}>Contact</NavLink>
          {user ? (
            <>
              <NavLink to="/create-news" className={link}>Write News</NavLink>
              <NavLink to="/dashboard" className={link}>Dashboard</NavLink>
              <button onClick={handleLogout} className="btn mt-2 md:mt-0">Logout ({user.name.split(' ')[0]})</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={link}>Login</NavLink>
              <Link to="/register" className="btn mt-2 md:mt-0">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
