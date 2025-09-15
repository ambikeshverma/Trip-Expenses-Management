import React, { useEffect, useState } from 'react';
import api from '../api';
import { toast } from 'react-toastify';
import './Styles/TransactionCard.css'
import { useParams } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';

const TransactionCard = ({token}) => {
  const [openDeleteId, setOpenDeleteId] = useState(null);
  const {tripId} = useParams();
   const [txs, setTxs] = useState([]);
   const [trip, setTrip] = useState("")

   //for date formatting
   const formatDate = (dateStr) => {
  const date = new Date(dateStr);

  const day = date.getDate().toString().padStart(2, '0');
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  const pref1 = `${day}-${month}-${year}`; 
  const pref2 = `${day}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${year}`;

  return `${pref1}`;
};
  
//to load all transaction
    const load = async () => {
      try {
        const res = await api.get('/api/transactions/trip/' + tripId, { headers: { Authorization: 'Bearer ' + token }});
        setTxs(res.data.transactions);
        setTrip(res.data.trip)
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.msg||'Failed to load transactions');
      }
    };
  
    useEffect(()=>{ if (tripId) load() }, [tripId]);

    //to delete transaction
    const del = async (id) => {
        try {
          await api.delete('/api/transactions/' + id, { headers: { Authorization: 'Bearer ' + token }});
          load();
          toast.success('Deleted');
          setOpenDeleteId(null);
        } catch (err) {
          console.error(err);
          toast.error('Delete failed');
        }
      };

  return (
    <>
    <Nav title={"Expenses"}></Nav>
    <div className="transactionPage" onClick={()=> setOpenDeleteId(null)}>
      <div className="carContainer">
        <div className="head">
          <h3>Current Balance</h3>
          <h3>{trip.totalBalance}</h3>
        </div>
        <div className="txnList">
           {txs.length === 0 ? (
    <p className="no-trips">No transaction save yet!</p>
  ) : (
    txs.map((tx) => (
          <div className={`txnCard ${tx.type === "add" ? "txn-add" : "txn-use"}`}>
             <div className="desAmount">
              <span>
                <span className='h'>{tx.remarks}</span>
                <p>{formatDate(tx.date)}</p>
              </span>
              <span className={`amount ${tx.type === "add" ? "add" : "use"}`}>₹{tx.amount}</span>
             </div>
             <div className="txnCat">
              <span className='h1'>Category :</span>
              <span className='h2'>{tx.category}</span>
             </div>
             <div className="expenseBy">
              <span className='h1'>Expense by :</span>
              <span className='h2'>{tx.user?.name}</span>
             </div>
             <div className="shareBy">
              <div className="part1">
                 <span className='h1'>Share by :</span>
                 <span className='h2'>All</span>
              </div>
              <img 
  src="/assets/three dots.png" 
  width="20px" 
  alt="" 
  onClick={(e) =>{ e.stopPropagation(); setOpenDeleteId(tx._id)}} 
/>

{openDeleteId === tx._id && (
  <button onClick={(e) =>{ e.stopPropagation();
    toast.error("Not Authorised");  setOpenDeleteId(null);
  }
  //  del(tx._id)}
      }className='deletebutton'>
    Delete
  </button>
)}
             </div>
          </div>
           ))
  )}
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
  )
}

export default TransactionCard