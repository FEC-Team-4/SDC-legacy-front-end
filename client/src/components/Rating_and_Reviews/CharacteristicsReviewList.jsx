import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import CharacteristicReview from './CharacteristicReview.jsx';

const CharacteristicsReviewList = ({ characteristics }) => {
  const methods = useFormContext();
  const { formState: { errors } } = methods;
  const characteristicTags = Object.keys(characteristics);
  const characteristicsDescriptors = {
    Size: ['A size too small', `1/2 a size too small`, 'Perfect', `1/2 a size too big`, 'A size too wide'],
    Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
    Comfort: ['Uncomfortable', 'Slightly comfortable', 'Ok', 'Comfortable', 'Perfect'],
    Quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
    Length: ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
    Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']
  }

  return (
    <div className="row mt-2">
      <Form.Group>
        <Form.Label>Characteristics *</Form.Label>
        <div>
          {characteristicTags.map(characteristic => (
            characteristics[characteristic].id
              && <CharacteristicReview
                key={characteristics[characteristic].id}
                characteristicName={characteristic}
                characteristicId={characteristics[characteristic].id}
                characteristicDescriptors={characteristicsDescriptors[characteristic]} />
          ))}
        </div>
        {errors.characteristics && <Form.Text className="text-danger text-opacity-80">
          Please select an option for each characteristic.
        </Form.Text>}
      </Form.Group>
    </div>
  )
}

export default CharacteristicsReviewList;