import React from 'react'
import './Styles/TripCard.css'

const TripListShimmer = () => {
  return (
    <div className="cardCont">
        <div className="imageBox shimmer">

        </div>
        <div className="tripDate1 shimmer"></div>
        <div className="dataCont">
            <div className="tripTitle shimmer"></div>
            <div className="memberBtn shimmer">
                <div></div>
            </div>
        </div>
    </div>
  )
}

export default TripListShimmer