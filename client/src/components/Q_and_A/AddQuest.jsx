import React, { useState } from 'react';
import QuestForm from './QuestForm.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@popperjs/core/dist/umd/popper.js'

const AddQuest = ({ prodInfo, questInfo, setQuestInfo }) => {
  const [ showModal, setShowModal ] = useState(false);

  return (
    <div className='col'>
      <button type="button"
        data-bs-toggle="modal"
        data-bs-target="#quest-form"
        className="btn btn-outline-dark">
        Add Question +
      </button>
      <QuestForm
        prodInfo={ prodInfo }
        questInfo={ questInfo }
        setQuestInfo={ setQuestInfo }
      />
    </div>
  )
}

export default AddQuest;