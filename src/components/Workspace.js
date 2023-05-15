import React, { useState, useEffect, useRef } from 'react';
// import ReactMarkdown from 'react-markdown';

const Workspace = ({ note, editMode, onNoteEdit }) => {

  const [timeDelay, setTimeDelay] = useState(null);
  const inputEl = useRef(null);

  const {date, time, text} = note ? note : {
    date: '', time: '', text: ''
  };

  useEffect(() => {
    inputEl.current.value = note ? note.text : ''; 
  }, [note]);

  const handleEditNote = (event) => {
    clearTimeout(timeDelay);
    setTimeDelay(setTimeout(() => {
      note.text = event.target.value;
      onNoteEdit(note);
    }, 1000));
  }

  return (
    <div className="workspace">
      <div className="workspace__header">
        <div>
          {date}
        </div>
        <div>
          {time}
        </div>
      </div>
      <div className="workspace__content">
        <textarea ref={inputEl} readOnly={!editMode} onChange={handleEditNote} defaultValue={text} />
      </div>
    </div>
  );
};

export default Workspace;
