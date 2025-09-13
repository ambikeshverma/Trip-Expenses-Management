import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import TripList from './components/TripList';
import TripPage from './components/TripPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import CreateTripForm from './components/CreateTripForm';
import Stats from './components/Stats';
import Nav from './components/Nav';
import TransactionCard from './components/TransactionCard';

export default function App(){
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
    }
  }, [token, user]);


  return (
    <div className="container">
     
      <Routes>
        <Route path='/home' element={<Home></Home>}/>
        <Route path="/register" element={<Register setToken={setToken} setUser={setUser} />} />
        <Route path="/login" element={<Login setToken={setToken} setUser={setUser} />} />
        <Route element={<ProtectedRoute token={token}></ProtectedRoute>}> 
           <Route path="/" element={<Dashboard token={token}/>} />
           <Route path="/createTrip" element={<CreateTripForm token={token}/>} />
           <Route path="/transactions/:tripId" element={<TransactionCard token={token}/>} />
           <Route path="/triplist" element={<TripList token={token} />} />
           <Route path="/trips/:id" element={<TripPage token={token} />} />
           <Route path="/stats" element={<Stats token={token}></Stats>} />
        </Route>
      </Routes>

      <ToastContainer position="top-right" />
    </div>
  );
}
