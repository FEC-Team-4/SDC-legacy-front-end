import React, { useState, useRef } from 'react';
import validator from 'email-validator'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@popperjs/core/dist/umd/popper.js'
import config from '../../../../config.js';

const AnswerForm = ({ prodInfo, question, idx, questInfo, setQuestInfo }) => {
  const [ answerText, setAnswerText ] = useState('');
  const [ nickname, setNickname ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ submissionCheck, setSubmissionCheck ] = useState(true);
  const [ photos, setPhotos ] = useState([]);
  const [ photo, setPhoto ] = useState('');
  const [ photoURL, setPhotoURL ] = useState('');
  const [ photoURLs, setPhotoURLs ] = useState([]);
  const [ photoCount, setPhotoCount ] = useState(0);
  const inputref = useRef();

  const fileHandler = (e) => {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    data.append('upload_preset', config.CLOUDINARY_PRESET);
    data.append('api_key', config.CLOUDINARY_API)

    axios.post(config.CLOUDINARY_UPLOAD_URL, data, {
      headers: {
        "X-Requested-With": "XMLHttpRequest"
    }
    })
    .then(response => {
      setPhotoURL(response.data.secure_url)})
    .catch(error => console.error(error));

  }

  const handlePhotoSubmit = () => {
    if (!photoURL) return;
    setPhotoURLs([ ...photoURLs, photoURL ]);
    setPhotos([ ...photos, photo ]);
    setPhotoCount(photoCount + 1);
  }

  const handleImagePreviews = () => {
    return (
      <div className='container'>
        <div className='row'>
          {photoURLs.map((url, idx) => {
              return(<img key={ idx } src={ url } style={{ 'width': '50%', 'height': '15vw','object-fit': 'cover', 'padding': '5px' }} className='mt-3 mr-auto card img-fluid'></img>)
          })
          }
        </div>
      </div>)
  }

  const sortQuestions = (questions) => {
    return questions.sort((a, b) => {
      if (a.question_helpfulness > b.question_helpfulness) return -1;
      if (a.question_helpfulness < b.question_helpfulness) return 1;
      return 0
    });
  };

  const handlePost = (e) => {
    const data = {
      body: answerText,
      name: nickname,
      email: email,
      photos: photoURLs
    };
    axios.post(`/api/QA/questions/${question.question_id}/answers`, data)
    .then(() => {
      axios.get(`/api/QA/questions/${prodInfo.id}`)
      .then(response => {
        setQuestInfo(sortQuestions(response.data.results));
      })
    })
    .catch(error => console.error(error))
    const answerCloser = document.getElementById(`answer-form-${ idx }`);
    answerCloser.click();
    e.preventDefault();
  }

  const handleSubmit = (e) => {
    if (!validator.validate(email)) {
      setSubmissionCheck(false)
      return;
    }
    if (nickname.length < 2) {
      setSubmissionCheck(false)
      return;
    }
    if (answerText.length < 5) {
      setSubmissionCheck(false)
      return;
    }
    setSubmissionCheck(true);
  }

  return (
    <div>
      <div id={`answer-form-${ idx }`} className="modal" tabIndex="-1" role='form'>
        <div className="modal-dialog modal-lg">
          <div className="modal-content p-3">
            <form onSubmit={ handlePost }>
              <div className="modal-header">
                <h1 className="modal-title h3">
                  { prodInfo.name }: { question.question_body }
                </h1>

                <button type="button"
                  className="btn btn-outline-dark close"
                  data-bs-dismiss="modal"
                  aria-label="Close">
                  <span className='h4'>×</span>
                </button>
              </div>

              <div className="modal-body">
                <div className='mb-2 text-end'><small className='fs-6 fw-light'>* indicates a required field</small></div>

                { !submissionCheck &&
                  <div className='fs-6 badge bg-danger'>
                    Please check your responses and try again
                  </div>}
                  <div>&#8203;</div>
                <label className='fs-6' id='your-quest'>Your Answer*</label>

                <textarea
                  type='text'
                  className='form-control mb-3'
                  onChange={(e) => setAnswerText(e.target.value) }
                required />

                <label className='fs-6 mt-3' id='nickname'>What is your nickname?*</label>
                <p className='fs-6 font-weight-light text-muted'>
                  <small>
                    For privacy reasons, do not use your full name or email
                  </small>
                </p>

                <input className='input-group mb-3 fs-6 form-control'
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder='Example: jack543!'
                required />

                <label className='fs-6 mt-3' id='email'>Your Email*</label>
                <input type='email'
                  className='input-group mb-3 fs-6 form-control'
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Example: jack@email.com'
                required />

                <label style={{ width: '100%' }}className='fs-6 mt-3'>Upload your photos </label>
                <input
                  type='file'
                  ref={ inputref }
                  onChange={(e) => {
                    setPhoto(e.target.files[0]);
                    fileHandler(e);
                  }}
                  style={{ display: 'none' }}
                />

                <button className='btn btn-outline-dark' onClick={(e) => {
                  e.preventDefault();
                  inputref.current.click();
                }}>Select Photo</button>

                <div className='mt-3 fs-6'>{photo.name}</div>

                <button
                  className="btn btn-outline-dark"
                  style={{ display: photoCount === 5 ? 'none' : 'block' }}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePhotoSubmit();
                  }}>Upload Photo
                </button>
                { handleImagePreviews() }

              </div>
              <div className="modal-footer">
                <div className='fs-6 font-weight-light text-muted'>
                    <small>
                      For authentication reasons you will not be emailed
                    </small>
                </div>
                <div>
                  <button onClick={ handleSubmit }
                    className="btn btn-outline-dark mx-2" type='submit' >Submit
                  </button>

                  <button
                    type="button"
                    id={`answer-form-${ idx }`}
                    className="btn btn-outline-dark"
                    data-bs-dismiss="modal">Close
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnswerForm;