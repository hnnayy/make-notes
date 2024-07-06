import React from "react";
import "../styles/Note.css";

function Note({ note, onDelete }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

    return (
        <div className="note-container">
            <div className="note-content">
                <p className="note-title">{note.title}</p>
                <p className="note-date">{formattedDate}</p>
                <p className="note-text">{note.content}</p>
            </div>
            <button className="delete-button" onClick={() => onDelete(note.id)}>
                Delete
            </button>
        </div>
    );
}

export default Note;
