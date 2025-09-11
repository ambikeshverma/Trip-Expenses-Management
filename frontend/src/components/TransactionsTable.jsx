import React, { useEffect, useState } from 'react';
import api from '../api';
import { toast } from 'react-toastify';

export default function TransactionsTable({ tripId, token, onChange }) {
  const [txs, setTxs] = useState([]);

  const load = async () => {
    try {
      const res = await api.get('http://localhost:3000/api/transactions/trip/' + tripId, { headers: { Authorization: 'Bearer ' + token }});
      setTxs(res.data.transactions);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load transactions');
    }
  };

  useEffect(()=>{ if (tripId) load() }, [tripId, onChange]);

  const del = async (id) => {
    try {
      await api.delete('http://localhost:3000/api/transactions/' + id, { headers: { Authorization: 'Bearer ' + token }});
      load();
      onChange?.();
      toast.success('Deleted');
    } catch (err) {
      console.error(err);
      toast.error('Delete failed');
    }
  };

  return (
    <div style={{ marginTop: 12 }}>
      <h4>Transactions</h4>
      <table>
        <thead><tr><th>Date</th><th>User</th><th>Type</th><th>Amount</th><th>Remarks</th><th>Action</th></tr></thead>
        <tbody>
          {txs.map(tx => (
            <tr key={tx._id}>
              <td>{new Date(tx.date).toLocaleString()}</td>
              <td>{tx.user?.username}</td>
              <td>{tx.type}</td>
              <td>₹{tx.amount}</td>
              <td>{tx.remarks}</td>
              <td>
                <button onClick={()=>alert('Edit not implemented in simple UI')}>Edit</button>
                <button onClick={()=>del(tx._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
