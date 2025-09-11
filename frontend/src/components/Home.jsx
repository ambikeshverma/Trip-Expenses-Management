import React from 'react'
import Nav from './Nav'
import './Styles/Home.css'
import Footer from './Footer'

const Home = () => {
  return (
    <>
     <Nav title={"Home"}></Nav>
     <div className="mainPageDiv">
      <div className="headingBox2">
        <h1>Track Group Expenses <span>Made Simple</span></h1>
        <h4>Split bills,tracks shared money, and get real-time notifications. Perfect for trips,roommates, and group activity</h4>
      </div>
      <div className="noticeBox">
        <h2>Instructions for Using Trip Expense Management</h2>
        <div className="points"><span>Create a Trip Card :</span>One member creates a trip and adds all participants.</div>
        <div className="points"><span>Join the Trip :</span> All members must register/login to join and receive notifications.</div>
        <div className="points"><span>Contribute Money :</span> Each member contributes their share; the total amount is shown to everyone.</div>
        <div className="points"><span>Add Expenses :</span> Any member can record an expense (hotel rent, food, taxi, etc.)</div>
        <div className="points"><span>Automatic Balance Update :</span> Every expense is deducted from the trip’s total balance in real time.</div>
        <div className="points"><span>Shared Visibility :</span> All members can see contributions, expenses, and remaining balance instantly.</div>
        <div className="points"><span>Mandatory Expense :</span> Logging Every expense must be updated in the app to avoid mismatches later.</div>
        <div className="points"><span>No Trust Issues :</span> Since all members can see transparent records, no one is blamed for differences.</div>
        <div className="points"><span>Final Settlement :</span> At trip end, the app shows total contributions, total expenses, and balance left.</div>
        <button>Dashboard <span><img src="/src/assets/Arrow.png" width="22px" alt="" /></span></button>
      </div>
     </div>
     <Footer></Footer>
    </>
   
  )
}

export default Home