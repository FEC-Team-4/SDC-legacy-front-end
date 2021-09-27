import React from 'react';
import Characteristic from './Characteristic.jsx';

const CharacteristicsBreakdown = ({ characteristics }) => {
  const characteristicTags = Object.keys(characteristics);

  return (
    <div className="row mt-1">
      {characteristicTags.map(characteristic => (
        characteristics[characteristic].id !== 0
          && <Characteristic
            key={characteristics[characteristic].id}
            characteristicName={characteristic}
            characteristicValue={characteristics[characteristic].value} />
      ))}
    </div>
  )
}

export default CharacteristicsBreakdown;