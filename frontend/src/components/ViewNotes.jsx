import React from "react";
import axios from 'axios';
import "./ViewNotes.css";
import Notes from './Notes'
import EmptyNotes from './EmptyNotes'
import AddButton from './AddButton'
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const url= import.meta.env.VITE_API_URL;

const ViewNotes = () => {
  const [notes, setNotes]= useState([]);
  const navigate= useNavigate();

  const email = localStorage.getItem("email");

  useEffect(() => {
    if(!email){
      navigate('/signUp');
      return;
    }

    const render= async()=>{
      console.log("1");
      try{
        const res= await axios.get(`${url}/note/allNote/${email}`)
        console.log(res.status);
        setNotes(res.data);
      }
      catch(err){
        console.log(err.message);
      }
      // .then(
      //   console.log("bc")
      //   // result => {
      //   //   console.log(result.status);
      //   //   setNotes(result.data);
      //   // }
      // )
      // .catch(
      //   err =>{
      //     console.log("The Issue is: "+ err.message) 
      //   }
      // )
    }

    render();
  }, [])

  return (
    <div className="allNotes">
      {
        notes.length === 0
        ?
        <EmptyNotes />
        :
        notes.map(note => (
          <Notes key={note._id} topic={note.topic} description={note.description} noteID= {note._id} createdOn={note.createdAt} updatedOn={note.updatedAt}/>
          // noteID, topic, description, createdOn, updatedOn
        ))        
      }

      <AddButton />
    </div>
  );
};

export default ViewNotes;