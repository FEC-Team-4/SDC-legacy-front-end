import React from 'react';
import { GoTriangleDown } from 'react-icons/go';

const Characteristic =  ({ characteristicName, characteristicValue }) => {

  const descriptors = (name) => {
    if (name === 'Fit') {
      return (
        <div className="row">
          <div className="col-sm-6 text-start"><small className="fw-light">Runs tight</small></div>
          <div className="col-sm-6 text-end"><small className="fw-light">Runs long</small></div>
        </div>
      )
    }

    if (name === 'Length') {
      return (
        <div className="row">
          <div className="col-sm-6 text-start"><small className="fw-light">Runs short</small></div>
          <div className="col-sm-6 text-end"><small className="fw-light">Runs long</small></div>
        </div>
      )
    }

    if (name === 'Comfort') {
      return (
        <div className="row">
          <div className="col-sm-6 text-start"><small className="fw-light">Uncomfortable</small></div>
          <div className="col-sm-6 text-end"><small className="fw-light">Perfect</small></div>
        </div>
      )
    }
    if (name === 'Quality') {
      return (
        <div className="row">
          <div className="col-sm-6 text-start"><small className="fw-light">Poor</small></div>
          <div className="col-sm-6 text-end"><small className="fw-light">Perfect</small></div>
        </div>
      )
    }

    if (name === 'Width') {
      return (
        <div className="row">
          <div className="col-sm-6 text-start"><small className="fw-light">Too narrow</small></div>
          <div className="col-sm-6 text-end"><small className="fw-light">Too wide</small></div>
        </div>
      )
    }

    if (name ==='Size') {
      return (
        <div className="row">
          <div className="col-sm-6 text-start"><small className="fw-light">A size too small</small></div>
          <div className="col-sm-6 text-end"><small className="fw-light">A size too wide</small></div>
        </div>
      )
    }
  }

  return (
    <div>
      <div className="row">
        <div>{characteristicName}</div>
      </div>
      <div className="characteristic-rating row align-items-start" style={{height: '10px'}}>
        <GoTriangleDown className="col-auto" style={{transform: `translateX(${Number(characteristicValue).toPrecision(3) * 100}%)`}}/>
      </div>
      {descriptors(characteristicName)}
    </div>
  )
}

export default Characteristic;