import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";

function Sidebar({
    notes,
    selectedNote,
    editMode,
    searchText,
    onNoteSelect,
    onNoteAdd,
    onNoteDelete,
    onNoteEdit,
}) {
    const [timeDelay, setTimeDelay] = useState(null);
    const [filteredNotes, setFilteredNotes] = useState(notes);
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        if (searchText === "") {
            setFilteredNotes(notes);
        } else {
            clearTimeout(timeDelay);
            setTimeDelay(
                setTimeout(() => {
                    setFilteredNotes(
                        notes.filter((note) => note.text.includes(searchText))
                    );
                }, 1000)
            );
        }
    }, [notes, searchText]);

    const handleDelete = () => {
        onNoteDelete();
        setShowConfirmation(false);
    };

    const openConfirmation = () => {
        setShowConfirmation(true);
    };

    const closeConfirmation = () => {
        setShowConfirmation(false);
    };

    return (
        <div className="sidebar">
            <div className="sidebar-buttons">
                <button onClick={onNoteAdd} disabled={searchText !== ""}>
                    Add
                </button>
                <button onClick={openConfirmation} disabled={!selectedNote}>
                    Delete
                </button>
                <button
                    onClick={onNoteEdit}
                    disabled={(editMode && selectedNote) || !selectedNote}
                >
                    Edit
                </button>
                {showConfirmation && (
                    <div className="modal">
                        <div className="modal-content">
                            <p>Are you sure?</p>
                            <div className="modal-content-buttons">
                                <button onClick={handleDelete}>Delete</button>
                                <button onClick={closeConfirmation}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <ul className="sidebar-list">
                {filteredNotes.map((note) => (
                    <ListItem
                        key={note.id}
                        note={note}
                        selected={
                            selectedNote ? selectedNote.id === note.id : false
                        }
                        onNoteSelect={onNoteSelect}
                    />
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
