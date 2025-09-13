import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Styles/CreateTripForm.css'
import Nav from './Nav';
import Footer from './Footer';

const CreateTripForm = ({token}) => {
  const navigate =useNavigate()
    const [title, setTitle] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const create = async (e) => {
    e.preventDefault();
    try {
      await api.post('http://localhost:3000/api/trips', { title, startDate, endDate }, { headers: { Authorization: 'Bearer ' + token }});
      setTitle('');
      toast.success('New Trip is created Successfully');
      navigate("/")
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Failed to create trip");
    }
  };

  return (
    <>
    <Nav title={"New Trip Creation"}></Nav>
    <div className="background">
    <div className='TripModelOverlay'>
        <div className="tripModel">
            <div className="heading">
                <h2>Create New Trip</h2>
            </div>
            <form action="" onSubmit={create}>
                <label htmlFor="">Enter Trip Title</label>
                <input type="text" 
                  value={title}
                  placeholder='e.g., Manali,Kashmir'
                  onChange={(e)=>setTitle(e.target.value)}
                />
                <div className="date">
                    <label htmlFor="">Start date</label>
                    <input type="date"
                    value={startDate}
                    placeholder='dd-mm-yyyy'
                    onChange={(e)=>setStartDate(e.target.value)}
                     />
                      <label htmlFor="">End date</label>
                    <input type="date"
                    value={endDate}
                    placeholder='dd-mm-yyyy'
                    onChange={(e)=>setEndDate(e.target.value)}
                     />
                </div>
                <label htmlFor="">Cover Photo</label>
                <input type="file" 
                placeholder='e.g., Group photo'
                />
                <button className='tripBtn' type='submit'>Create</button>

            </form>
        </div>
    </div>
    </div>
    <Footer></Footer>
    </>
  )
}

export default CreateTripForm