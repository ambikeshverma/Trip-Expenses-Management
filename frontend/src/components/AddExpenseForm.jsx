import React, { useState } from 'react'
import { toast } from 'react-toastify';
import api from "../api";
import './Styles/AddExpenForm.css'


const AddExpenseForm = ({ tripId, token, isOpenAddExpenForm, closeExpenseForm, refreshTrip}) => {
    const [useMoneyAmount, setUseMoneyAmount] = useState("")
    const [category, setCategory] = useState("")
     const [type, setType] = useState("use");
    const [remarks, setRemarks] = useState("")
    const headers = { headers: { Authorization: "Bearer " + token } };

     const useMoney = async (e) => {
        e.preventDefault();
        try {
            console.log(tripId,type,useMoneyAmount,remarks)
          await api.post(
            "http://localhost:3000/api/transactions",
            { tripId, type, amount: Number(useMoneyAmount), remarks },
            headers
          );
          setUseMoneyAmount("")
          setCategory("")
          setRemarks("");
          if (typeof refreshTrip === "function") {
            refreshTrip();
          }
          closeExpenseForm();
          toast.success("Transaction added");
        } catch (err) {
          toast.error(err.response?.data?.msg || "Transaction failed");
        }
      };

   if(!isOpenAddExpenForm){
    return null
   }
  return (
    <div className="addMoneyCont" onClick={closeExpenseForm}>
        <div className="formBox" onClick={(e)=>e.stopPropagation()}>
            <h2>Add Expense</h2>
            <form action="" onSubmit={useMoney}>
                <label htmlFor="">Enter Amount</label>
                <input type="number" placeholder='Use Money' value={useMoneyAmount} onChange={(e)=>setUseMoneyAmount(e.target.value)} />
                <label htmlFor="">Category</label>
                <select name="" id="" value={category} onChange={(e)=>setCategory(e.target.value)}>
                    <option value="">--select category--</option>
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Toll">Toll</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Parking">Parking</option>
                    <option value="Other">Other</option>
                </select>
                <label htmlFor="">Remark</label>
                <input type="text" placeholder='Something you want' value={remarks} onChange={(e)=>setRemarks(e.target.value)} />
                <button type='submit' className='ExpenseBtn'> <span>+</span><span>Save Expense</span></button>
            </form>
        </div>
    </div>
  )
}

export default AddExpenseForm