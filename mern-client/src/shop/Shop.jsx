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
      <h2 className='text-5xl font-bold text-center mb-8'>All Notes Available</h2>

      {/* Notes Grid */}
      <div className='grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1'>
        {
          notes.map(note => (
            <Card key={note._id} className='shadow-lg p-4 rounded-lg'>
              {/* Image Section */}
              <div className='w-full h-60 mb-4 overflow-hidden rounded-lg'>
                <img src={note.imageURL} alt={note.notesTitle} className='w-full h-full object-cover' />
              </div>
              
              {/* Notes Title */}
              <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {note.notesTitle}
              </h5>

              {/* Notes Description */}
              <p className="font-normal text-gray-700 dark:text-gray-400 mb-4">
                {note.notesDescription.length > 100 ? `${note.notesDescription.slice(0, 100)}...` : note.notesDescription}
              </p>
              
              {/* Price and Buy Section */}
              <div className='flex justify-between items-center'>
                <p className='text-lg font-semibold text-green-600'>${note.price || '10.00'}</p>
                <button className='bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg'>
                  Buy Now
                </button>
              </div>
            </Card>
          ))
        }
      </div>
    </div>
  );
}

export default Shop;
