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
import AddMoneyForm from './components/AddMoneyForm';
import AddExpenseForm from './components/AddExpenseForm';
import Stats from './components/Stats';

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
    }
  }, [token, user]);

  

  return (
    <div className="container">
      {/* <nav>
        <Link to="/">Home</Link>
        {token ? <>
          <span>Welcome {user?.username}</span>
          <button onClick={logout}>Logout</button>
        </> : <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>}
      </nav> */}

      <Routes>
        <Route path='/' element={<Home></Home>}/>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard token={token}/></ProtectedRoute>} />
        <Route path="/createTrip" element={<ProtectedRoute><CreateTripForm token={token}/></ProtectedRoute>} />
        <Route path="/triplist" element={<ProtectedRoute><TripList token={token} /></ProtectedRoute>} />
        <Route path="/register" element={<Register setToken={setToken} setUser={setUser} />} />
        <Route path="/login" element={<Login setToken={setToken} setUser={setUser} />} />
        <Route path="/trips/:id" element={<TripPage token={token} />} />
        <Route path="/addMoney" element={<AddMoneyForm token={token}/>} />
        <Route path="/addExpense" element={<AddExpenseForm token={token}/>} />
         <Route path="/stats" element={<Stats token={token}></Stats>} />
      </Routes>

      <ToastContainer position="top-right" />
    </div>
  );
}
