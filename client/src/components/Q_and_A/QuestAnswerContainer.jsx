import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnswerForm from './AnswerForm.jsx';
import MoreQuests from './MoreQuests.jsx';
import AddQuest from './AddQuest.jsx';
import Question from './Question.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@popperjs/core/dist/umd/popper.js'


const QuestAnswerContainer = ({ searched, prodInfo, questInfo, setQuestInfo }) => {
  const [ questAmount, setQuestAmount ] = useState(0);
  const [ moreQuestions, setMoreQuestions ] = useState(false);

  useEffect(() => {
    setQuestAmount(questInfo.length);
  }, [ questInfo.length, moreQuestions, searched ]);

  const renderQuestions = () => {
    if (searched) {
      return (
        <div className='accord-container overflow-auto'>
          <div className='accordion' id='quest-accordion'>
            { questInfo.map((question, idx) => (
              <Question
                prodInfo={ prodInfo }
                helperIdx={ 'collapse' + idx }
                idx={ idx }
                key={ idx }
                question={ question }
                setQuestInfo={ setQuestInfo }
                questInfo={ questInfo }
              />
            ))}
          </div>
        </div>
      )
    } else if (!moreQuestions) {
      const onlyTwo = questInfo.slice(0, 2);
      return (
        <div className='accord-container overflow-auto'>
          <div className='accordion' id='quest-accordion'>
            {onlyTwo.map((question, idx) => (
              <Question
                prodInfo={ prodInfo }
                helperIdx={ 'collapse' + idx }
                idx={ idx }
                key={ idx }
                question={ question }
                setQuestInfo={ setQuestInfo }
                questInfo={ questInfo }
              />
            ))}
          </div>
        </div>
      )
    } else {
      return (
        <div className='accord-container overflow-auto'>
          <div className='accordion' id='quest-accordion'>
            { questInfo.map((question, idx) => (
              <Question
                prodInfo={ prodInfo }
                helperIdx={ 'collapse' + idx }
                idx={ idx }
                key={ idx }
                question={ question }
                setQuestInfo={ setQuestInfo }
                questInfo={ questInfo }
              />
            ))}
          </div>
        </div>
      )
    }
  }

  return (
    <div>
      {questAmount >= 2
        ? <div> {renderQuestions()}
        <div className='container mt-3 mb-3 d-flex justify-content-center'>
          <div className='row row-cols-auto'>
          <MoreQuests
            moreQuestions={moreQuestions}
            setMoreQuestions={setMoreQuestions}
          />
          <AddQuest
            prodInfo={ prodInfo }
            questInfo={ questInfo }
            setQuestInfo={ setQuestInfo }
          />
          </div>
          </div>
        </div>
        : <div> { renderQuestions() }
          <AddQuest
            prodInfo={ prodInfo }
            questInfo={ questInfo }
            setQuestInfo={ setQuestInfo }
          />
        </div>
      }
    </div>
  )
}

export default QuestAnswerContainer;