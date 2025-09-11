import React from "react";
import "./Styles/TripCard.css";

const TripCard = (props) => {
  return (
    <div className="cardCont">
      <div className="imageBox">
        <img src="/src/assets/bg3.jpg" alt="" />
      </div>
      <div className="tripDate1">
        <img src="" alt="" />
        <p>Jan 2 - Dec 2</p>
      </div>
      <div className="dataCont">
        <div className="tripTitle">
          <h3>{props.title}</h3>
        </div>
        <div className="moneyData">
          <div>
            <span>Balance</span>
            <span>45000</span>
          </div>
          <div>
            <span>Spent</span>
            <span>2100</span>
          </div>
        </div>
        <div className="memberBtn">
          <div>
            <img src="" alt="" />
            <span>{props.creator?.username}</span>
          </div>
          <button>View trip</button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
