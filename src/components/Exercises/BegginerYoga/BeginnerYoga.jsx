import React from 'react'
import '../../../css/BegginerYoga.css'


const BeginnerYoga = () => {
  return (
    <div className="beg-container">
      <div className="top-row">
        <h1 className='day-cnt'>Day - 1</h1>
        <div className="prgress-tracker">
          <h3>Progress</h3>
          <div className="prog-bar-cont">
            <div className="bar"></div>
          </div>
        </div>
      </div>

      
      <div className="bottom-row"></div>
    </div>
  )
}

export default BeginnerYoga