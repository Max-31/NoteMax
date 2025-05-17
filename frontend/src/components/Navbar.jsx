import React from 'react';
import './Navbar.css'; 
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate= useNavigate();
    const logout= ()=>{
      console.log("logout clicked");

      localStorage.removeItem("email");
      console.log("email cleared");
      
      navigate('/');
      console.log("navigate hit");
      window.location.reload();
    }

  return (
    <nav className="navbar">
        {/* Logo */}
        <div className="logo">
            NoteMax
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
