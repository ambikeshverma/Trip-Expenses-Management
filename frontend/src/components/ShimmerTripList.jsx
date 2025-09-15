import React from 'react'
import './Styles/ShimmerTripCard.css'

const ShimmerTripList = () => {
  const mapped = Array.from({ length: 4 }).map((_, idx) => (
    <div key={idx} className="cardContShim">
      <div className="imageBoxShim"></div>
      <div className="tripDate1Shim"></div>
      <div className="dataContShim">
        <div className="tripTitleShim"></div>
        <div className="memberBtnShim">
          <div></div>
          <span></span>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      {mapped}
    </>
  );
};

export default ShimmerTripList;
