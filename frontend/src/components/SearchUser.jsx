import React, { useState } from 'react';
import api from '../api';
import { toast } from 'react-toastify';
import './Styles/SearchUser.css'

export default function SearchUser({ tripId, token, onMemberAdded }) {
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);

  const search = async () => {
    try {
      const res = await api.get('/api/users/search?q=' + encodeURIComponent(q), { headers: { Authorization: 'Bearer ' + token }});
      setResults(res.data);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.msg ||'Search failed');
    }
  };

  const addMember = async (username) => {
    try {
      await api.post('/api/trips/' + tripId + '/add-member', { username }, { headers: { Authorization: 'Bearer ' + token }});
      toast.success('Member added');
      onMemberAdded?.();
      setResults([]);
      setQ('');
    } catch (err) {
      setResults([]);
      console.error(err);
      toast.error(err?.response?.data?.msg || 'Add failed');
    }
  };

  return (
    <div className='addMember'>
      <h4>Add members</h4>
      <div className="searchBar">
          <img src="/assets/search.png" alt="" width="25px" height="25px" />
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search username" />
          <button className='searchbtn' onClick={search}>Search</button>
      </div>
      <ul className='searchResult'>
        {results.map(u => (
          <li key={u._id}>
            {u.username} ({u.name})
            <button className='addbtn' onClick={()=>addMember(u.username)}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
