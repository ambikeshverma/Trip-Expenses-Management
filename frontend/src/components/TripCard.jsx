import React from "react";
import "./Styles/TripCard.css";

const TripCard = (props) => {

         //for date formatting
     const formatDate = (dateStr) => {
    const date = new Date(dateStr);
  
    const day = date.getDate().toString().padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
  
    const pref1 = `${day}-${month}-${year}`; 
    const pref2 = `${day}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${year}`;
  
    return `${pref1}`;
  };

  return (
    <div className="cardCont">
      <div className="imageBox">
        <img src="/src/assets/bg3.jpg" alt="" />
      </div>
      <div className="tripDate1">
        <p>({formatDate(props.startDate)}) - ({formatDate(props.endDate)})</p>
      </div>
      <div className="dataCont">
        <div className="tripTitle">
          <h3>{props.title}</h3>
        </div>
        <div className="moneyData">
          <div>
            <span className="bl1">Balance :</span>
            <span className="bl">₹{props.totalBalance}</span>
          </div>
          <div>
            <span className="sp1">Spent :</span>
            <span className="sp">₹{props.totalExpenses}</span>
          </div>
        </div>
        <div className="memberBtn">
          <div>
            <img src="/src/assets/Profile2.png" width="25px" alt="" />
            <span>{props.creator?.username}</span>
          </div>
          <button>View trip</button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
