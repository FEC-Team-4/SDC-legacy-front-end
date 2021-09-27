import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@popperjs/core/dist/umd/popper.js'

const Answer = ({ answer, first }) => {
  const [ helpfulness, setHelpfulness ] = useState(null);
  const [ helpfulClick, setHelpfulClick ] = useState(false);
  const [ reportClick, setReportClick ] = useState(false);

  useEffect(() => {
    setHelpfulness(answer.helpfulness)
  }, [])

  const increaseHelpful = () => {
    axios.put(`/api/QA/answers/${ answer.id }/helpful`)
      .then(() => setHelpfulClick(true))
      .catch(error => console.error(error));
  }

  const handleReport = () => {
    axios.put(`/api/QA/answers/${ answer.id }/report`)
      .then(() => setReportClick(true))
      .catch(error => console.error(error));
  }

  const renderPhotos = (photos) => {
    if (photos.length === 0) return;
    return (
      <div className='container'>
        <div className='row'>
          { photos.map((photo, idx) => {
            if (photo.includes('blob')) {
              photo = photo.slice(5);
            }
            return (
              <img key={idx}
                style={{
                  'width': '25%', 'height': '15vw',
                  'objectFit': 'cover', 'padding': '5px'
                }}
                className='card col-sm-3 img-fluid' src={ photo }>
              </img>
            )
          })}
        </div>
      </div>
    )
  }

  const readableDate = (date) => {
    return <span> {new Date(date).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}</span>
  }

  const isSeller = () => {
    if (answer.answerer_name.toLowerCase() === 'seller') {
      return <b className='badge bg-success text-light'>{ answer.answerer_name + '  ' }</b>
    } else {
      return <span>{ answer.answerer_name + '' }</span>
    }
  }

  return (
    <div key={answer.id} value={ answer.id }>
      <div>
        {first
          ? <p><small>A: { answer.body } </small></p>
          : <p><small> { answer.body } </small></p>}
      </div>
      <div>{renderPhotos(answer.photos)}</div>
      <span>
        <div>
          <small className='badge text-dark'>
            by { isSeller() }
            { readableDate(answer.date) }

            <span className='sr-only'>  </span>

            { !helpfulClick
              ? <p style={{ 'cursor': 'pointer' }}
                className='badge bg-light text-dark'
                onClick={() => {
                  setHelpfulness(helpfulness + 1);
                  increaseHelpful()
                }}
              >Helpful?
              </p>

              : <p className='badge bg-success text-light'>
                HELPFUL!
              </p>}

            <span className='sr-only'>  </span>

            <span style={{ 'cursor': 'pointer' }}
              className='badge bg-light text-dark'> Yes {helpfulness}
            </span>

            <span className='sr-only'>  </span>

            {!reportClick
              ? <p style={{ 'cursor': 'pointer' }}
                className='badge bg-light text-dark'
                onClick={ handleReport }>Report</p>
              : <p className='badge bg-danger'>REPORTED</p>}
          </small>
        </div>
      </span>
    </div>
  )
}

export default Answer;