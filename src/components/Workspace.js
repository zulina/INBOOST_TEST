import React from 'react';
import ReactMarkdown from 'react-markdown';
// import moment from 'moment';

const Workspace = ({ note, editMode, onNoteEdit }) => {
  const {date, time, text} = note ? note : {
    date: '', time: '', text: ''
  };
  return (
    <div className="workspace">
      <div className="workspace__header">
          {date + ' ' + time}
      </div>
      <div className="workspace__content">
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Workspace;
