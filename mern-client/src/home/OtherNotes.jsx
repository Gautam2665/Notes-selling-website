import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import NotesCards from '../components/NotesCards';

const OtherNotes = () => {
    const [notes, setNotes]=useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/all-notes").then(res=>res.json()).then(data=>setNotes(data.slice(0,4)))
    },[])
  return (
    <div>
      <NotesCards notes={notes} headline="Other notes"/>      
    </div>
  )
}

export default OtherNotes
