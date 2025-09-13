import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function TripList({ token }) {
  const [trips, setTrips] = useState([]);
  const [title, setTitle] = useState('');
  useEffect(()=>{ load() }, [token]);

  const load = async () => {
    if (!token) return;
    try {
      const res = await api.get('/api/trips', { headers: { Authorization: 'Bearer ' + token }});
      setTrips(res.data);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.msg||'Failed to load trips');
    }
  };

  const create = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/trips', { title }, { headers: { Authorization: 'Bearer ' + token }});
      setTitle('');
      load();
      toast.success('Trip created');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.msg||'Create failed');
    }
  };

  return (
    <div>
      <h2>Your Trips</h2>
      <form onSubmit={create}>
        <input placeholder="Trip title" value={title} onChange={e=>setTitle(e.target.value)} />
        <button type="submit">Create Trip</button>
      </form>
      <ul>
        {trips.map(t => (
          <li key={t._id}>
            <Link to={`/trips/${t._id}`}>{t.title}</Link> by {t.creator?.username}
          </li>
        ))}
      </ul>
    </div>
  );
}
