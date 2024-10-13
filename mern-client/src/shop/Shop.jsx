import React, { useState, useEffect } from 'react';
import { Card } from "flowbite-react";

const Shop = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/all-notes")
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  return (
    <div className='mt-28 px-4 lg:px-24'>
      <h2 className='text-5xl font-bold text-center'>All notes are here</h2>

      <div className='grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1'>
        {
          notes.map(note => (
            <Card key={note._id}>
              <img src={note.imageURL} alt={note.notesTitle} className='h-96'/>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>{note.notesTitle}</p> 
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {note.notesDescription}
              </p>
              <button className='bg-blue-700 font-semibold text-white py-2 rounded'>Buy now</button>
            </Card>
          ))
        }
      </div>
    </div>
  );
}

export default Shop;
