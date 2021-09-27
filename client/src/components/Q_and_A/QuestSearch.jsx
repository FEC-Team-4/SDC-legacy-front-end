import React, { useState, useEffect } from 'react';

const QuestSearch = ({ questInfo, setQuestInfo, constQuestInfo, searched, setSearched }) => {
  const [ searchText, setSearchText ] = useState('');

  const questParser = () => {
    setQuestInfo(questInfo.filter(question => {  
      return question.question_body.toLowerCase().includes(searchText);
    }))
  }
    // const question = document.querySelectorAll('.question');
    // const questionText = [];
    // question.forEach(question => {
    //   if (question.innerHTML.includes(searchText)) {
    //     let innerHTML = question.innerHTML;
    //     const index = question.innerHTML.indexOf(searchText);
    //     if (index >= 0) {
    //       innerHTML = innerHTML.substring(0, index) + "<span class='highlight'>" + innerHTML.substring(index, index + searchText.length) + "</span>" + innerHTML.substring(index + searchText.length);
    //       question.innerHTML = innerHTML;
    //      }
    //      if (!searched) {
    //        const span = document.querySelectorAll('.highlight');
    //        span.forEach(span => span.classList.remove('highlight'))
    //      }
    //   }
    // })

  const handleText = (e) => {
    setSearchText(e.target.value.toLowerCase());
    if (searchText.length >= 3) {
      setSearched(true);
      questParser();
    }
    if (searchText.length < 3) {
      setSearched(false);
      setQuestInfo(constQuestInfo);
    }
  }

  return (
    <div className="input-group mb-3 my-3 px-3" >
      <input
        onChange={ handleText }
        type="text" className="form-control"
        placeholder="Have a question? Search for answers..."
        aria-label="Have a question? Search for answers..."
        aria-describedby="basic-addon2"
      />
      <div className ="input-group-append">
        <span className ="input-group-text"
          id="basic-addon2"><img style={{'width': '2em'}}
          src='search-solid.svg'></img>
        </span>
      </div>
    </div>
  )
}

export default QuestSearch;