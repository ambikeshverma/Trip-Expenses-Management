import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './Styles/Nav.css'

const Nav = (props) => {
  const navigate = useNavigate()
  const handleLogout = ()=>{
    localStorage.removeItem("token");
    toast.success("User Logout Successfully")
    navigate("/home")
  }

  return (
    <div className="navbar">
        <div className="logo">
            <img src="/src/assets/Logo.png" width="130px" alt="" />
        </div>
         <h4>{props.title}</h4>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Nav