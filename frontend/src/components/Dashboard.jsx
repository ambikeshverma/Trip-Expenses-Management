import React, { useState, useEffect } from 'react'
import './Styles/Dashboard.css'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import api from '../api';
import TripCard from './TripCard'
import Footer from './Footer'
import Nav from './Nav';

const Dashboard = ({token}) => {
    const navigate = useNavigate()
    const [trips, setTrips] = useState([]);
      useEffect(()=>{ load() }, [token]);
    
      const load = async () => {
        if (!token) return;
        try {
          const res = await api.get('/api/trips', { headers: { Authorization: 'Bearer ' + token }});
          setTrips(res.data);
        } catch (err) {
          toast.error(err.response?.data?.msg||'Failed to load trips');
        }
      };
    
  return (
    <>
    <Nav title={"Dashboard"}></Nav>
    <div className='dashboardPage'>
        <div className="tagDiv">
        <div className="tag">
          <img src="/assets/Diary.png" width="18px" alt="" />
          <p>Trusted Digital Diary</p>
        </div>
        </div>
       <div className="dashHeading">
        <div className="headingPart">
        <h1>Your Trips</h1>
        <h4>All visited place are shown here</h4>
        </div>
        <div className="buttonPart">
            <div className="createTripbtn">
            <button onClick={()=> navigate("/createTrip")}>
                <span>+</span>
                <span className='span2'>Create New Trip</span>
                <span className='span3'>Trip</span>
            </button>
        </div>
        </div>
       </div>
     <div className="tripList">
  {trips.length === 0 ? (
    <p className="no-trips">No trips available. Create one trip by add button bellow to get started!</p>
  ) : (
    trips.map((trip) => (
      <Link
        to={`/trips/${trip._id}`}
        key={trip._id}
        className="trip-link"
      >
        <TripCard {...trip} />
      </Link>
    ))
  )}
</div>
        {/* <div className="tripHeading">
            <h1>Total Trips Data</h1>
            <h4>OverAll amount over the all trips </h4>
        </div>
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
        </div> */}
    </div>
    <Footer></Footer>
    </>
  )
}

export default Dashboard