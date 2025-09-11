import React, { useState, useEffect } from 'react'
import './Styles/Dashboard.css'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../api';
import TripCard from './TripCard'

const Dashboard = ({token}) => {
    const navigate = useNavigate()
    const [trips, setTrips] = useState([]);
      useEffect(()=>{ load() }, [token]);
    
      const load = async () => {
        if (!token) return;
        try {
          const res = await api.get('http://localhost:3000/api/trips', { headers: { Authorization: 'Bearer ' + token }});
          setTrips(res.data);
        } catch (err) {
          console.error(err);
          toast.error('Failed to load trips');
        }
      };
    
  return (
    <div className='dashboardPage'>
        <div className="dashboardData">
            <div className="dashdataBox totalTrip">
                <h5>Total Trips</h5>
                <h2>2</h2>
            </div>
            <div className="dashdataBox totalBalance">
                <h5>Total Balance</h5>
                <h2>2050</h2>
            </div>
            <div className="dashdataBox totalExpenses">
                <h5>Total Expenses</h5>
                <h2>2410</h2>
            </div>
        </div>
        <div className="tripHeading">
            <h1>Your Trips</h1>
            <h4>All visited place are shown here</h4>
        </div>
        
        <div className="createTripbtn">
            <button onClick={()=> navigate("/createTrip")}>
                <span>+</span>
                <span>Create New Trip</span>
            </button>
        </div>
        <div className="tripList">
            {trips.map((trip)=>(
            <Link to={`/trips/${trip._id}`} key={trip._id} className="trip-link">
            <TripCard {...trip}></TripCard>
            </Link>
        ))}
        </div>
        
    </div>
  )
}

export default Dashboard