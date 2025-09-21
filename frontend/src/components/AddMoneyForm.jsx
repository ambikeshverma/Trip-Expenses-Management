import React, { useState } from 'react'
import { toast } from 'react-toastify';
import './Styles/AddMoneyForm.css'
import api from "../api";
import Loader from './Loader';

const AddMoneyForm = ({ tripId, token, isOpenAddMoneyForm, closeMoneyForm, refreshTrip }) => {
    const [addMoney, setAddMoney] = useState("")
    const [personAmount, setPersonAmount] = useState("")
    const [type, setType] = useState("add");
    const [remarks, setRemarks] = useState("");
    const [loading, setLoading] = useState(false);
    const headers = { headers: { Authorization: "Bearer " + token } };


    const AddMoney = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post(
        "/api/transactions",
        { tripId, type, amount: Number(addMoney), remarks },
        headers
      );
      setAddMoney("")
      setPersonAmount("")
      setRemarks("");
      setLoading(false);
      if (typeof refreshTrip === "function") {
        refreshTrip();
      }
      closeMoneyForm();
      toast.success("Transaction added");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Transaction failed");
    }finally {
        setLoading(false); 
      }
  };
  if(!isOpenAddMoneyForm){
    return null
  }
  return (
    <div className="addMoneyCont" onClick={closeMoneyForm}>
        <div className="formBox" onClick={(e)=>e.stopPropagation()}>
            <h2>Contribution Money</h2>
            <form action="" onSubmit={AddMoney}>
                <label htmlFor="">Enter Total Amount to Deposite</label>
                <input type="number" placeholder='Amount' value={addMoney} onChange={(e)=>setAddMoney(e.target.value)} required/>
                <label htmlFor="">Amount per Person</label>
                <input type="number" placeholder='Amount/Person' value={personAmount} onChange={(e)=>setPersonAmount(e.target.value)} />
                <label htmlFor="">Remark</label>
                <input type="text" placeholder='Something you want' value={remarks} onChange={(e)=>setRemarks(e.target.value)} required/>
                {loading ? <button disabled style={{cursor:"not-allowed"}}> <span><Loader></Loader></span><span>Adding...</span></button> :
                <button> <span>+</span><span>Add Money</span></button>}
            </form>
        </div>
    </div>
  )
}

export default AddMoneyForm