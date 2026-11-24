import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import NewsList from './pages/NewsList.jsx';
import NewsDetails from './pages/NewsDetails.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import NewsForm from './pages/NewsForm.jsx';
import Contact from './pages/Contact.jsx';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<NewsList />} />
          <Route path="/news/:id" element={<NewsDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/create-news" element={<ProtectedRoute><NewsForm /></ProtectedRoute>} />
          <Route path="/edit-news/:id" element={<ProtectedRoute><NewsForm /></ProtectedRoute>} />
          <Route path="*" element={<p className="p-10 text-center text-xl">404 - Page not found</p>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
