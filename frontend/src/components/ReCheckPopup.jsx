import { React, useRef} from 'react'
import { useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import './ReCheckPopup.css'

const ReCheckPrompt = () => {
  const navigate= useNavigate();
  const btnRef= useRef();
  const {
    handleSubmit,
    formState: {isSubmitting}
  }= useForm();

  const noteID = useParams().id;
  const url= import.meta.env.VITE_API_URL;

  const email= localStorage.getItem("email"); //email from LS

  const deleteNote= async()=>{
    try{
      const result= await axios.delete(`${url}/note/deleteNote/${noteID}`, {
        data: {email}
      });

      toast.success(result.data.message);     
      navigate('/');
    }
    catch(err){
      toast.error("OOPS! " + err.message);
    }
  }

  const cancelDelete= ()=>{
    btnRef.current.disabled;
    navigate('/');
  }

  return (
    <div className="outerPopup">
      <div className="popupContainer">
        <form id="popupForm" onSubmit={handleSubmit(deleteNote)}>
          {/* Heading */}
          <div className="popupHeading">
            <h4>Are You Sure You want to Delete?</h4>
          </div>

          {/* YES,Delete & No,Cancel Buttons */}
          <div className="popupBtnGroup">
            <button ref={btnRef} type="submit" className="popupSaveBtn" disabled={isSubmitting}>
              {
                isSubmitting ? "Deleting..." : "YES, Delete"
              }
            </button>
            <button type="button" onClick={cancelDelete} className="popupCancelBtn">
              NO, Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReCheckPrompt