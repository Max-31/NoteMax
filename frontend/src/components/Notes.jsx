import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Notes.css";

/**
 * Note component – Topic, Timestamp, Desc, Actions(Edit/Delete)
 *  • Timestamp – "Created on" or "Edited on" depending on props.updatedOn
 *  • Description – truncated preview with SHOW MORE / SHOW LESS toggle
 * 
 * Props expected: { noteID(unique id), topic(string), description(string), createdOn(ISO), updatedOn(ISO) }
 */

const Notes = ({ noteID, topic, description, createdOn, updatedOn }) => {
  const navigate = useNavigate();
  const [showFull, setShowFull] = useState(false);

  /* navigation */
  const goToEdit = () =>
    navigate(`/edit/${noteID}`, {
      state: { topic, description }
    });

  const goToDelete = () => navigate(`/delete/${noteID}`);

  /*  timestamps */
  const createdDate = new Date(createdOn);
  const updatedDate = updatedOn ? new Date(updatedOn) : null;
  const isEdited = updatedDate && updatedDate.getTime() !== createdDate.getTime();
  const timestampLabel = isEdited ? "Edited on" : "Created on";
  const timestampDate = isEdited ? updatedDate : createdDate;

  /*  description preview  */
  const WORD_LIMIT = 10; // how many words to keep in preview
  const words = description.trim().split(/\s+/);
  const shouldTruncate = words.length > WORD_LIMIT;
  const preview = words.slice(0, WORD_LIMIT).join(" ");

  return (
    <div className="note">
      {/* heading */}
      <div className="noteHead">
        <h4>{topic}</h4>
      </div>

      {/* timestamp */}
      <div className="noteTimestamp">
        <small>
          {timestampLabel} {timestampDate.toLocaleString()}
        </small>
      </div>

      {/* description */}
      <div className="noteDesc">
        <p>{(showFull || !shouldTruncate) ? description : `${preview}...`}</p>

        {shouldTruncate && (
          <button className="toggleBtn" onClick={() => setShowFull(!showFull)}>
            {showFull ? "Show Less" : "Read More"}
          </button>
        )}
      </div>

      {/* actions */}
      <div className="noteActions">
        <button onClick={goToEdit} className="editBtn">
          Edit
        </button>
        <button onClick={goToDelete} className="deleteBtn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Notes;


// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import './Notes.css'

// const Notes = (props) => {
//     const navigate= useNavigate();

//     const goToEdit= ()=>{
//         navigate(`/edit/${props.noteID}`,{
//             state:{
//                 topic: props.topic,
//                 description: props.description        
//             }
//         });
//     }

//     const goToDelete= ()=>{
//         navigate(`/delete/${props.noteID}`);
//     }

//   return (

//     <div className="note">
//         {/* Note Heading  */}
//         <div className="noteHead">
//             <h4>{props.topic}</h4>
//         </div>

//         {/* Note Description  */}
//         <div className="noteDesc">
//             <p>
//                 {props.description}
//             </p>
//         </div>

//         {/* Edit & Delete Buttons  */}
//         <div className="noteActions">
//             <button onClick={goToEdit} className="editBtn">Edit</button>
//             <button onClick={goToDelete} className="deleteBtn">Delete</button>
//         </div>
//     </div>
//   )
// }

// export default Notes