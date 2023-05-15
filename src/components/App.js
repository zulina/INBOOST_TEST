import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Workspace from "./Workspace";
import SearchBox from "./SearchBox";
import * as Request from "./Request";
import "./App.scss";

function App() {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        Request.getAllNotes().then((result) => setNotes(result));
    }, []);

    const onNoteAdd = () => {
        Request.addNote({
            text: "", 
            date: new Date().toLocaleDateString(), 
            time: new Date().toLocaleTimeString()
            }).then(() => {
            Request.getAllNotes().then((result) => {
                setNotes(result);
                setSelectedNote(result[result.length-1]);
            });
        });
    };

    const onNoteDelete = () => {
        Request.deleteNote(selectedNote.id).then(() => {
            Request.getAllNotes().then((result) => {
                setNotes(result);
                setSelectedNote(null);
            });
        });
    };

    const onNoteEdit = (note) => {
        note.date = new Date().toLocaleDateString(); 
        note.time = new Date().toLocaleTimeString();
        Request.updateNote(note).then(() => {
            Request.getAllNotes().then((result) => {
                setNotes(result);
                setSelectedNote(note);
            });
        });
    };

    const handleSelectNote = (note) => {
        if (!selectedNote || note.id !== selectedNote.id) {
            setSelectedNote(note);
            setEditMode(false);
        }
    };

    const handleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
        setSelectedNote(null);
        setEditMode(false);
    };

    return (
        <div className="app">
            <Sidebar
                notes={notes}
                selectedNote={selectedNote}
                editMode={editMode}
                searchText={searchText}
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
