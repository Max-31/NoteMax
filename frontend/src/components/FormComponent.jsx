import {React} from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import './FormComponent.css'

const url= import.meta.env.VITE_API_URL;

const FormComponent = () => {
  const location= useLocation();
  const navigate= useNavigate()
  const isSignUp= location.pathname === '/signUp';
  const {
    register,
    handleSubmit,
    // formState: { errors, isSubmitting },
    formState: { isSubmitting },
  } = useForm();

  const credNew= async(data)=>{
    try{
      const {email, userName, password}= data;
      const result= await axios.post(`${url}/user/register`, {email, userName, password});
    
      toast.success(result.data.message);
      localStorage.setItem("email", email);
      navigate('/login')
    }
    catch(err){
      toast.error("OOPS!" + err.message);
    }
  }
  
  const credCheck= async(data)=>{
    try{      
      const {email, password}= data;
      const result= await axios.post(`${url}/user/login`, {email, password});
      
      toast.success("DONE " + result.data.message);
      localStorage.setItem("email", email);
      navigate('/')
    }
    catch(err){
      toast.error("OOPS!" + err.message);
    }
  }

  return (
    <div className="outerLoginContainer">
      <div className="loginContainer">
        <form onSubmit= {isSignUp? handleSubmit(credNew): handleSubmit(credCheck)}>
          {/* Heading */}
          <div className="formHeading">
            <h2>{isSignUp? "SignUp" : "Login"}</h2>
          </div>

          {/* Email Field */}
          <div className="inputBox">
            <input
              type="text"
              id="email"
              placeholder="Enter Email"
              {
                ...register("email", {
                  required: true
                })
              }
            />
          </div>

          {/* Username Field -------------> Conditional Rendering: if SignUp then Render, else NOT*/}
          {
            isSignUp &&  (
              <div className="inputBox">
                <input
                  type="text"
                  id="userName"
                  placeholder="Enter Username"
                  {
                    ...register("userName", {
                      required: true
                    })
                  }
                />
              </div>
            )
          }

          {/* Password Field */}
          <div className="inputBox">
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              {
                ...register("password", {
                  required: true
                })
              }
            />
          </div>

          {/* Submit Button */}
          <div className="btn">
            <button type="submit" className="loginBtn">
              {isSubmitting? (isSignUp? "Registering" : "Logging In") : (isSignUp? "SignUp" : "Login")}
            </button>
          </div>

          {/* Redirect Link */}
          <div className="signUp">
              {
                isSignUp
                ? 
                <p>
                  Already have Account? <Link to='/login'>Login</Link>
                </p> 
                : 
                <p>
                  New Here? <Link to='/signUp'>SignUp</Link>
                </p> 
              }
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormComponent