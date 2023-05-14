import React from 'react';
import ListItem from './ListItem';
// import './Sidebar.css';

function Sidebar({ notes, selectedNote, onNoteSelect, onNoteAdd, onNoteDelete, onNoteEdit}) {
  return (
    <div className="sidebar">
      <div className="sidebar-buttons">
        <button className="add-note-button" onClick={onNoteAdd}>
          Add
        </button>
        <button className="delete-note-button" onClick={onNoteDelete} disabled={!selectedNote}>
          Delete
        </button>
        <button className="edit-note-button" onClick={onNoteEdit} disabled={!selectedNote}>
          Edit
        </button>
      </div>
      <ul className="sidebar-list">
        {notes.map((note) => (
          <ListItem
            key={note.id}
            note={note}
            selected={selectedNote ? (selectedNote.id === note.id) : false}
            onNoteSelect={onNoteSelect}
          />
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
