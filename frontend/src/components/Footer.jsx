import React from 'react'
import './Styles/Footer.css'

const Footer = () => {
  return (
    <div className='footerCont'>
        <div className="blackFooter">
        <h2>Share,Track & Settle with Transparency</h2>
        <p>Keep every trip fair and stress-free with real-time expense tracking</p>
        <div className="socialIcons">
            <img src="/src/assets/Insta.png" width="60px" alt="" />
            <img src="/src/assets/LinkedIn logo.webp" width="45px" alt="" />
            <img src="/src/assets/github logo.webp" width="35px" alt="" />
            <img src="/src/assets/facebook_logo.png" width="50px" alt="" />
        </div>
        </div>
        <div className="copyRigth">
            <p>&#169;2025 Trip Expense Management. All rights reserved. Design by Ambikesh Verma</p>
        </div>
    </div>
  )
}

export default Footer