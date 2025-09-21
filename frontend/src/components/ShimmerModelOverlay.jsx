import React from 'react'
import './Styles/SimmerModelOverlay.css'
import Loader from './Loader'

const ShimmerModelOverlay = () => {
  return (
    <div className="shimmerModelOverlay">
        <div className="shimmerModel">
            <h5>Redirecting to Dashboard....</h5>
            <h5>Please wait</h5>
            <div><Loader></Loader></div>
        </div>
    </div>
  )
}

export default ShimmerModelOverlay