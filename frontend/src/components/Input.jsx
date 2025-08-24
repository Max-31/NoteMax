import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./Input.css";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const url = import.meta.env.VITE_API_URL;

// const Input = (props) => {
const Input = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isEditPage = location.pathname.startsWith("/edit");
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors, isSubmitting },
    formState: { isSubmitting },
  } = useForm();

  const noteID= useParams().id;
  const email = localStorage.getItem("email"); //email from LocalStorage
  // const prevTopic= location.state.topic || ""; //from state of useNavigation
  // const prevDescription= location.state.description || ""; //from state of useNavigation

  const submitFunc = async (data) => {
    try{
      const { topic, description } = data;
  
      const response = await axios.post(`${url}/note/newNote`, { topic, description, email });
      toast.success(response.data.message);
      navigate('/');
    }
    catch(err){
      toast.error("OOPS! " + err.message);
    }
  };

  const editFunc = async (data) => {
    try {
      console.log("NoteId: " + noteID);
      const response = await axios.put(`${url}/note/editNote/${noteID}`, {
        topic: data.topic,
        description: data.description,
        email: email
      });
  
      toast.success(response.data.message);
      navigate("/"); // or navigate to the notes list page
    } catch (err) {
      toast.error("OOPS! " + err.message);
    }
  };

  return (
    <div className="outerInputContainer">
      <div className="noteContainer">
        <form id="newNoteForm" onSubmit={isEditPage ? handleSubmit(editFunc) : handleSubmit(submitFunc)}>
          {/* Heading */}
          <div className="heading">
            <h2>{isEditPage ? "Edit Note" : "New Note"}</h2>
          </div>

          {/* Topic Input */}
          <div className="inputBox">
            <input
              type="text"
              id="topic"
              placeholder="Topic"
              defaultValue={isEditPage ? location.state.topic : ""}
              {...register("topic", {
                required: true,
              })}
            />
          </div>

          {/* Description */}
          <div className="inputBox">
            <textarea
              id="description"
              placeholder="Description"
              defaultValue={isEditPage ? location.state.description : ""}
              {...register("description")}
            ></textarea>
          </div>

          {/* Save & Cancel Buttons */}
          <div className="btnGroup">
            <button type="submit" className="saveBtn" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="cancelBtn"
              onClick={() => {reset(); navigate('/');}}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Input;
