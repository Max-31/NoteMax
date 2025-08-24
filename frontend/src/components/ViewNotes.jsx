// import React from "react";
// import axios from 'axios';
import "./ViewNotes.css";
import Notes from './Notes'
import EmptyNotes from './EmptyNotes'
import AddButton from './AddButton'
// import { useState } from "react";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const url= import.meta.env.VITE_API_URL;

const ViewNotes = ({notes}) => {
  // If no notes
  if (notes.length === 0) {
    return (
      <div className="empty-notes-container">
        <EmptyNotes />
        <AddButton />
      </div>
    );
  }

  // grid of notes
  return (
    <div className="allNotes">
      {notes.map(note => (
        <Notes 
          key={note._id} 
          topic={note.topic} 
          description={note.description} 
          noteID={note._id} 
          createdOn={note.createdAt} 
          updatedOn={note.updatedAt}
        />
      ))}
      <AddButton />
    </div>
  );
};

export default ViewNotes;