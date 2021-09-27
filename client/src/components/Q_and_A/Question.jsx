import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Answer from './Answer.jsx';
import AnswerForm from './AnswerForm.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@popperjs/core/dist/umd/popper.js'

const Question = ({ question, helperIdx, prodInfo, idx, questInfo, setQuestInfo }) => {
  const [ moreAnswers, setMoreAnswers ] = useState(false);
  const [ helpfulness, setHelpfulness ] = useState(null);
  const [ helpfulClick, setHelpfulClick ] = useState(false);

  useEffect(() => {
    setHelpfulness(question.question_helpfulness)
  }, [])

  const increaseHelpful = () => {
    axios.put(`/api/QA/questions/${question.question_id}/helpful`)
      .then(() => setHelpfulClick(true))
      .catch(error => console.error(error));
  }

  const loadAndUnloadAnswers = () => {
    setMoreAnswers(!moreAnswers);
  }

  const renderAnswers = (answers) => {
    if (Object.keys(answers).length === 0) return;
    let allAnswers = [];
    let topTwo = [];

    for (const key in answers) {
      if (answers[key].answerer_name.toLowerCase() === 'seller') {
        topTwo.unshift(answers[key])
      }
      allAnswers.push(answers[key])
    }

    allAnswers.sort((a, b) => {
      if (a.helpfulness > b.helpfulness) return -1;
      if (a.helpfulness < b.helpfulness) return 1;
      return 0;
    })

    if (topTwo.length === 1 || allAnswers.length === 1) {
      topTwo.push(allAnswers[0]);
    } else {
      topTwo.push(allAnswers[0], allAnswers[1]);
    }

    if (moreAnswers) {
      return (
        <div>
          {allAnswers.map((answer, idx) => {
            if (idx === 0) {
              return <Answer first={true} key={idx} answer={answer} />
            } else return <Answer key={answer.id} answer={answer} />
          }
          )}
          <button
          className='btn btn-outline-dark'
            onClick={loadAndUnloadAnswers}
          >Hide Additional Answers
          </button>
        </div>)
    } else {
      return (
        <div>
          {topTwo.map((answer, idx) => {
            if (idx === 0) {
              return <Answer first={true} key={idx} answer={answer} />
            } else return <Answer key={answer.id} answer={answer} />
          }
          )}
          {allAnswers.length > 2 &&
            <button
            type='button'
            className='btn btn-outline-dark'
              onClick={loadAndUnloadAnswers}>Load More Answers
            </button>}
        </div>)
    }
  }
  // bg-dark text-light
  return (
    <div className="accordion-item border-dark">
      <h2 className="accordion-header">
        <AnswerForm
          questInfo={ questInfo }
          setQuestInfo={ setQuestInfo }
          question={ question }
          prodInfo={ prodInfo }
          idx={ idx }
        />
        <div
          className="accordion-button collapsed d-flex
          align-items-baseline justify-content-start flex-column"
          type="button" data-bs-toggle="collapse"
          data-bs-target={`#${helperIdx}`}
          aria-expanded="true" aria-controls={helperIdx}
        >
          <div className='p-2 question'>Q: {question.question_body}</div>
          <div className='mb-auto p-2 badge'>
            {!helpfulClick
              ? <p className='badge bg-light text-dark'
                onClick={() => {
                  setHelpfulness(helpfulness + 1);
                  increaseHelpful()
                }}
              >Helpful?
              </p>
              : <p className='badge bg-success text-light'>HELPFUL!</p>}
            <span className='sr-only'>  </span>

            <span className='badge bg-light text-dark'>
              Yes {helpfulness}
            </span>

            <span className='sr-only'>  </span>
            <span
              className='badge bg-light text-dark'
              data-bs-toggle='modal'
              href={`#answer-form-${idx}`}>Add Answer
            </span>
          </div>
        </div>
      </h2>
      <div id={helperIdx}
        className="accordion-collapse collapse"
        data-bs-parent="#quest-accordion"
        aria-labelledby={'col' + question.question_id}
      >
        {/* bg-dark text-light */}
        <div className="accordion-body">
          {renderAnswers(question.answers)}
        </div>
      </div>
    </div>
  )

}



export default Question;