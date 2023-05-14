import React from "react";

const ListItem = ({ note, selected, onNoteSelect }) => {
    return (
        <li
            className={`list-item ${selected ? "active" : ""}`}
            onClick={() => onNoteSelect(note)}
        >
            <div className="list-item__datetime">
                <div className="list-item__date">{note.date}</div>
                <div className="list-item__date">{note.time}</div>
            </div>
            <div className="list-item__text">{note.text ? note.text : "Empty"}</div>
        </li>
    );
};

export default ListItem;
