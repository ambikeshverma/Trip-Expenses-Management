import React, { useEffect, useState } from 'react';
import api from '../api';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import './Styles/TransactionTable.css'
import Nav from './Nav';
import Footer from './Footer';

export default function TransactionsTable({token}) {
  const {tripId} = useParams()
  const [txs, setTxs] = useState([]);

  const load = async () => {
    try {
      const res = await api.get('/api/transactions/trip/' + tripId, { headers: { Authorization: 'Bearer ' + token }});
      setTxs(res.data.transactions);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.msg||'Failed to load transactions');
    }
  };

  useEffect(()=>{ if (tripId) load() }, [tripId]);

  const del = async (id) => {
    try {
      await api.delete('/api/transactions/' + id, { headers: { Authorization: 'Bearer ' + token }});
      load();
      toast.success('Deleted');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.msg||'Delete failed');
    }
  };

  return (
    <>
    <Nav title={"Summary"}></Nav>
    <div className='tableContainer' >
      <h4>Transactions</h4>
       <div className="tableWrapper">
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
                <button className='editBtn1' onClick={()=>toast.error('Currently edit is not available')}>Edit</button>
                <button className='deleteBtn1' onClick={()=>del(tx._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
}
