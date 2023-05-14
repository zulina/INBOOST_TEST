import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Workspace from "./Workspace";
import SearchBox from "./SearchBox";
import * as Request from "./Request";
import "./App.scss";

// Request.addNote({text: 'aaa', datetime: '123'}).then(console.log);
Request.getAllNotes().then(console.log);

function App() {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [searchText, setSearchText] = useState("");

    const onNoteAdd = () => {
        Request.addNote({
            text: "", 
            date: new Date().toLocaleDateString(), 
            time: new Date().toLocaleTimeString()
            }).then(() => {
            Request.getAllNotes().then((result) => setNotes(result));
        });
    };

    const onNoteDelete = () => {
        Request.deleteNote(selectedNote.id).then(() => {
            Request.getAllNotes().then((result) => setNotes(result));
        });
    };

    const onNoteEdit = (note) => {
        Request.updateNote(note).then(() => {
            Request.getAllNotes().then((result) => setNotes(result));
        });
    };

    const handleSelectNote = (note) => {
        setSelectedNote(note);
    };

    const handleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    return (
        <div className="app">
            <Sidebar
                notes={notes}
                selectedNote={selectedNote}
                onNoteAdd={onNoteAdd}
                onNoteDelete={onNoteDelete}
                onNoteEdit={handleEditMode}
                onNoteSelect={handleSelectNote}
            />
            <div className="space">
                <SearchBox searchText={searchText} onChange={handleSearchChange} />
                <Workspace note={selectedNote} editMode={editMode} onNoteEdit={onNoteEdit}/>
            </div>
        </div>
    );
}

export default App;
