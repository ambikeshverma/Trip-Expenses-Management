import React from "react";
import { Link } from "react-router-dom";
import { useState, } from "react";
import {toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import api from '../api';
import "./Styles/Registration.css";
const Register = ({ setToken, setUser }) => {
   const [username, setUsername] = useState('');
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();


  const validateForm = () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!username.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!password) {
      toast.error("Password is required");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const reset = () => {
    setName("");
    setUsername("")
    setPassword("");
    setConfirmPassword("");
  }

  const handleRegister = async (e) => {
    e.preventDefault();
      if (!validateForm()) {
      return;
    }
    
    try {
      const res = await api.post(
        'http://localhost:3000/api/auth/register',
        {
          username,
          name,
          password,
        }
      );
     setToken(res.data.token);
      setUser(res.data.user);

      toast.success(
        `Registration successful! Welcome, ${name}! Username is ${username}`
      );

      // Clear form
      setName("");
      setUsername("")
      setPassword("");
      setConfirmPassword("");
     
      navigate("/login")

    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
      toast.error(
        error.response?.data?.msg || "Registration failed. Please try again."
      );
    }
  }
};

  return (
    <>
      <div className="fullPage">
        <div className="regContainer">
          <div className="imageCont">
            <img src="/src/assets/Logo transparent.png" width="300px" alt="" />
          </div>
          <div className="formCont">
            <form action="" onSubmit={handleRegister}>
              <h1>Create Account</h1>
              <div className="sign">Sign up with Open Account</div>
              <div className="google">
                <span className="google1">
                  <img src="/src/assets/Google icon.webp" width="20px" alt="" />
                  <h5>Google</h5>
                </span>
                <span className="google1">
                  <img src="/src/assets/Apple Icon.png" width="20px" alt="" />
                  <h5>Apple ID</h5>
                </span>
              </div>
              <div className="inputBox">
                <label htmlFor="">Enter your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Name"
                  required
                />
                <label htmlFor="">Enter your Username</label>
                <input
                  type="email"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  placeholder="Username"
                  required
                />
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
                <label htmlFor="">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  required
                />
                <div className="buttons">
                  <button className="cancel" onClick={reset}>Reset</button>
                  <button className="post" type="submit">Register</button>
                </div>
              </div>
              <p className="dont"> Already have an account?{" "}
              <Link to="/login" className="link">
                Sign in here
              </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;