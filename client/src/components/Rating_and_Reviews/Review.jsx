import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Collapse from 'react-bootstrap/Collapse';
import { FcCheckmark } from 'react-icons/fc';
import { IoIosStarOutline, IoIosStar } from 'react-icons/io';

const Review = ({ reviewData }) => {
  const [ photoClicked, setPhotoClicked ] = useState(false);
  const [ photoURL, setPhotoURL ] = useState('');
  const [ readMore, setReadMore ] = useState(false);
  const [ yesClicked, setYesClicked ] = useState(false);
  const [ reportClicked, setReportClicked ] = useState(false);
  const { date, rating, reviewer_name, summary, body, recommend, response, helpfulness, review_id, photos } = reviewData;
  const readableDate = new Date(date).toLocaleDateString(
    'en-us',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  );

  const handleYesClick = () => {
    axios.put(`/api/reviews/${review_id}/helpful`)
      .then(() => {
        setYesClicked(true);
        console.log(`Marked review as helpful! :)`)
      })
      .catch((err) => console.log(`Couldn't mark review as helpful :(`, err));
  }

  const handleReportClick = () => {
    axios.put(`/api/reviews/${review_id}/report`)
      .then(() => {
        setReportClicked(true);
        console.log(`Reported review! :)`)
      })
      .catch((err) => console.log(`Couldn't report the review :(`, err));
  }

  const handlePhotoClick = (e) => {
    setPhotoClicked(true);
    setPhotoURL(e.target.src);
  }

  const handlePhotoModalClose = () => {
    setPhotoClicked(false);
  }

  return (
    <div className="row mt-3">
      <div className="row">
        <div className="col d-flex">
          {[...Array(5)].map((starRating, index) => {
            index += 1;
            return (
              <div className="col-auto">
                {index <= rating && <IoIosStar size={'1em'} key={`up to star ${index}`}/>}
                {index > rating && <IoIosStarOutline size={'1em'} key={`less than star ${index}`}/>}
              </div>
            )
          })}
        </div>
        <div className="col text-end">{reviewer_name}, {readableDate}</div>
      </div>
      <div className="fw-bold mt-2">{summary}</div>
      {body.length <= 250 && <div className="text-wrap">{body}</div>}
      {body.length > 250 &&
        <div style={{width: '100%'}}>
          <p className="review-body">{body.slice(0, 250)}...</p>
          <Collapse in={readMore}>
            <p className="review-body">...{body.slice(250)}</p>
          </Collapse>
          <button className="btn btn-outline-dark" onClick={() => setReadMore(!readMore)}>Show more</button>
        </div>}
      {photos.length > 0 &&
        <div className="row mt-2">
          {photos.map((photo, index) => {
            return (
              <div className="col-auto" key={photo.id} style={{width:100, height:100, borderRadius: '50%'}}>
                <img className="img-thumbnail" src={photo.url} style={{maxHeight:'100%', maxWidth:'100%'}} onClick={handlePhotoClick}></img>
              </div>
            )
          })}
        </div>}
      {recommend && <div className="row align-items-center mt-2">
        <div className="col-auto"><FcCheckmark style={{transform: 'translateY(-10%)'}} size={'1.25em'}/></div>
        <div className="col" style={{'paddingLeft': '0px'}}>I recommend this product</div>
      </div>}
      {response && <div className="mt-2 seller-response">{response}</div>}
      <div className="row mt-2 fw-light">
        <div className="col-auto">
          <span className="badge bg-light text-dark">
            Helpful?
          </span>
           <span
            className="badge bg-light text-dark"
            style={{cursor: 'pointer'}}
            onClick={handleYesClick}>Yes</span>({helpfulness}) | <span
              className="badge bg-light text-dark"
              style={{cursor: 'pointer'}}
              onClick={handleReportClick}>Report</span>
        </div>
        {yesClicked && <div className="col helpful-yes">Sent as helpful!</div>}
        {reportClicked && <div className="col helpful-report">Reported!</div>}
      </div>
      <Modal show={photoClicked} onHide={handlePhotoModalClose}>
        <Modal.Header>
          <button type="button" className="btn-close" aria-label="Close" onClick={handlePhotoModalClose}></button>
        </Modal.Header>
        <Modal.Body>
          <img src={photoURL}></img>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Review;