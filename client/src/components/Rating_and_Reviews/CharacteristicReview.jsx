import React, { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

const CharacteristicReview = ({ characteristicName, characteristicDescriptors, characteristicId }) => {
  const methods = useFormContext();
  const { register, formState: { errors } } = methods;

  return (
    <div className="row">
      <div className="row">
        {[...Array(5)].map((rating, index) => {
            index += 1;
            return (
              <div className="form-check-inline form-check col d-flex justify-content-center" key={`${characteristicId} ${index}`}>
                <input
                  className="form-check-input"
                  type="radio"
                  value={index}
                  name={characteristicId}
                  data-characteristic-name={characteristicName}
                  style={{transform: 'translateX(1em)'}}
                  {...register(`characteristics.x${characteristicId}`, { required: true})}/>
              </div>
              )
            })}
      </div>
      <div className="row">
        {characteristicDescriptors.map((descriptor, index) => <div className="col text-center fw-light" key={index}>{descriptor}</div>)}
      </div>
    </div>
  )
}

export default CharacteristicReview;