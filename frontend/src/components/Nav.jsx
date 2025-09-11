import React from 'react'
import './Styles/Nav.css'

const Nav = (props) => {
  return (
    <div className="navbar">
        <div className="logo">
            <img src="/src/assets/Logo.png" width="130px" alt="" />
        </div>
         <h4>{props.title}</h4>
        <button>Logout</button>
    </div>
  )
}

export default Nav