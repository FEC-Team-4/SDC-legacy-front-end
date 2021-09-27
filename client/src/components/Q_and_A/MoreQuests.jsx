import React from 'react';

const MoreQuests = ({ moreQuestions, setMoreQuestions }) => {
  return (
    <div className='col'>
    { !moreQuestions
      ? <button onClick={() => setMoreQuestions(!moreQuestions)} className="btn btn-outline-dark">More Questions</button>
      : <button onClick={() => setMoreQuestions(!moreQuestions)} className="btn btn-outline-dark">Less Questions</button>
    }
    </div>
  )
}

export default MoreQuests;