import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddQuest from './AddQuest.jsx';
import MoreQuests from './MoreQuests.jsx';
import QuestAnswerContainer from './QuestAnswerContainer.jsx';
import QuestSearch from './QuestSearch.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@popperjs/core/dist/umd/popper.js'


const QandA = ({ prodInfo, prodId }) => {
  const [ questInfo, setQuestInfo ] = useState([]);
  const [ constQuestInfo, setConstQuestInfo ] = useState([]);
  const [ searched, setSearched ] = useState(false);

  useEffect(() => {
    axios.get(`/api/QA/questions/${prodInfo.id}`)
      .then(response => {
        setQuestInfo(sortQuestions(response.data.results));
        setConstQuestInfo(sortQuestions(response.data.results));
      })
      .catch(error => console.error(error));
  }, [ prodInfo.id ])

  const sortQuestions = (questions) => {
    return questions.sort((a, b) => {
      if (a.question_helpfulness > b.question_helpfulness) return -1;
      if (a.question_helpfulness < b.question_helpfulness) return 1;
      return 0
    });
  }

  return (
    <div>
      <h1 className='card-title px-3 my-5 h3'>Questions & Answers</h1>
      <QuestSearch
        questInfo={ questInfo }
        setQuestInfo={ setQuestInfo }
        constQuestInfo={ constQuestInfo }
        searched={ searched }
        setSearched={ setSearched }
      />
      <QuestAnswerContainer
        questInfo={ questInfo }
        prodInfo={ prodInfo }
        setQuestInfo={ setQuestInfo }
        searched={ searched }
      />
    </div>
  )
}

export default QandA;