import React from "react";
import Navbar from "./Navbar";
import ViewNotes from "./ViewNotes";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const url= import.meta.env.VITE_API_URL;

const Home = () => {
  const [notes, setNotes]= useState([]);
  const [searchQuery, setSearchQuery]= useState('');

  const email= localStorage.getItem("email");

  useEffect(
    ()=>{
        const getSearch= async () => {
            try {
                // let res;
                // if(searchQuery){

                console.log("searching");
                    const res= await axios.get(`${url}/note/allNote/${email}`, {
                    params: {
                        search: searchQuery 
                    }
                    }
                    );

                    // setSearchQuery(searchQuery);
                // }
                // else{
                //     res= await axios.get(`${url}/note/allNote/${email}`);
                // }
                console.log(res.data);
                console.log(searchQuery);

                setNotes(res.data);

            } catch(err){
                console.log(err.message);
            }
        };

        getSearch();
    },
    [searchQuery]
  )

  return (
    <div>
      <Navbar onSearch={setSearchQuery} />
      <ViewNotes notes={notes} />
    </div>
  );
};

export default Home;
