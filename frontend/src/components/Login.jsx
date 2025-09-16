import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from '../api';
import './Styles/Registration.css'
import {toast } from 'react-toastify';
import Loader from "./Loader";

const Login = ({ setToken, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const reset = ()=>{
    setUsername("")
    setPassword("");
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await api.post('/api/auth/login', { username, password });
      setToken(res.data.token);
      setUser(res.data.user);

      toast.success("Login Successfully")
      navigate("/");
    } catch (err) {
        toast.error(err?.response?.data?.msg || 'Login failed');
    }finally {
        setLoading(false); 
      }
  };
  return (
    <>
      <div className="fullPage">
        <div className="regContainer">
          <div className="imageCont">
            <img src="/assets/Logo transparent.png" width="300px" alt="" />
          </div>
          <div className="formCont">
            <form action="" onSubmit={handleLogin}>
              <h1>Sign in</h1>
              <div className="sign">Sign in with Open Account</div>
              <div className="google">
                <span className="google1">
                  <img src="/assets/Google icon.webp" width="20px" alt="" />
                  <h5>Google</h5>
                </span>
                <span className="google1">
                  <img src="/assets/Apple Icon.png" width="20px" alt="" />
                  <h5>Apple ID</h5>
                </span>
              </div>
              <div className="inputBox">
                <label htmlFor="">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  placeholder="Enter your username"
                  required
                />
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                /> 
                {loading && <Loader></Loader>}
                <div className="buttons">
                  <button className="cancel" onClick={reset}>Reset</button>
                  <button className="post" type="submit" >Login</button>
                </div>
              </div>
              <p className="dont">
                Don't have an account?{" "}
                <Link to="/register" className="link">
                  Sign up here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;