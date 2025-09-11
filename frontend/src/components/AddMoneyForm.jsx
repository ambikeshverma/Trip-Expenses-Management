import React, { useState } from 'react'
import { toast } from 'react-toastify';
import './Styles/AddMoneyForm.css'
import api from "../api";

const AddMoneyForm = ({ tripId, token, isOpenAddMoneyForm, closeMoneyForm, refreshTrip }) => {
    const [addMoney, setAddMoney] = useState("")
    const [personAmount, setPersonAmount] = useState("")
    const [type, setType] = useState("add");
    const [remarks, setRemarks] = useState("");
    const headers = { headers: { Authorization: "Bearer " + token } };


    const AddMoney = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        "http://localhost:3000/api/transactions",
        { tripId, type, amount: Number(addMoney), remarks },
        headers
      );
      setAddMoney("")
      setPersonAmount("")
      setRemarks("");
      if (typeof refreshTrip === "function") {
        refreshTrip();
      }
      closeMoneyForm();
      toast.success("Transaction added");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Transaction failed");
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
                <input type="number" placeholder='Amount' value={addMoney} onChange={(e)=>setAddMoney(e.target.value)} />
                <label htmlFor="">Amount per Person</label>
                <input type="number" placeholder='Amount/Person' value={personAmount} onChange={(e)=>setPersonAmount(e.target.value)} />
                <label htmlFor="">Remark</label>
                <input type="text" placeholder='Something you want' value={remarks} onChange={(e)=>setRemarks(e.target.value)} />
                <button> <span>+</span><span>Add Money</span></button>
            </form>
        </div>
    </div>
  )
}

export default AddMoneyForm