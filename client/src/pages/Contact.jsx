import { useState } from 'react';
import api, { errMsg } from '../api.js';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/contact', form);
      setMsg({ type: 'ok', text: 'Thank you! Your message has been sent.' });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) { setMsg({ type: 'err', text: errMsg(err) }); }
    setLoading(false);
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-2">
      <div>
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="mt-3 text-gray-600">Have a question, feedback or a news tip? Send us a message and we will reply soon.</p>
        <div className="mt-6 space-y-2 text-gray-700">
          <p>📧 support@dailyportal.com</p>
          <p>📞 +880 1700 000000</p>
          <p>📍 Chittagong, Bangladesh</p>
        </div>
      </div>
      <form onSubmit={submit} className="space-y-4 rounded-xl bg-white p-6 shadow">
        {msg.text && (
          <p className={`rounded p-2 text-sm ${msg.type === 'ok' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{msg.text}</p>
        )}
        <input className="input" placeholder="Your name" required value={form.name} onChange={set('name')} />
        <input className="input" type="email" placeholder="Your email" required value={form.email} onChange={set('email')} />
        <input className="input" placeholder="Subject" value={form.subject} onChange={set('subject')} />
        <textarea className="input" rows={5} placeholder="Message" required value={form.message} onChange={set('message')} />
        <button className="btn w-full" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
      </form>
    </div>
  );
}
