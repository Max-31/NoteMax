import React from 'react';
import './Navbar.css'; 
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Navbar = ({onSearch}) => {
    const navigate= useNavigate();
    const {
      register,
      handleSubmit,
      formState: {isSubmitting},
    }= useForm();

    const logout= ()=>{
      console.log("logout clicked");

      localStorage.removeItem("email");
      console.log("email cleared");
      
      navigate('/login');
      console.log("navigate hit");
      // window.location.reload();
    }

    const handleSearch= (data)=>{
      onSearch(data.searchQuery);
    }

  return (
    <nav className="navbar">
        {/* Logo */}
        <div className="logo">
            NoteMax
        </div>

        <div className="searchBox">
          <form onChange={handleSubmit(handleSearch)}>
            <input 
              type= "text" 
              id= "searchQuery"
              placeholder= "Search"
              {
                ...register("searchQuery")
              }
            />
            {/* <button className= "btn searchBtn" type="submit">
              {isSubmitting ? "Searching" : "Search"}
            </button> */}
          </form>
        </div>

        {/* Options */}
        <div className="options">
        <button onClick={()=> navigate('/create')} className="btn createBtn">+ Create Note</button>
        <button onClick={()=> navigate('/')} className="btn MainMenu">Main Menu</button>
        <button onClick={logout} className="btn logOut">Logout</button>
        </div>
    </nav>
  );
};

export default Navbar;
