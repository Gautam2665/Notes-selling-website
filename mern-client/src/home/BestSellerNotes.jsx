import React, { useState, useEffect } from 'react';
import NotesCards from '../components/NotesCards';

const BestSellerNotes = () => {
    const [notes, setNotes]=useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/all-notes").then(res=>res.json()).then(data=>setNotes(data.slice(0,6)))
    },[])
  return (
    <div>
      <NotesCards notes={notes} headline="Best seller notes"/>      
    </div>
  )
}

export default BestSellerNotes
