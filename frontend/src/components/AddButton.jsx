import React from "react";
import { Link } from "react-router-dom";
import './AddButton.css'

const AddButton = () => {
  return (
    <div>
      <div className="addNote">
        <button>
          <Link to='/create'>+</Link>
        </button>
      </div>
    </div>
  );
};

export default AddButton;
