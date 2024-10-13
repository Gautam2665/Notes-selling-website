import React from 'react'
import { useLoaderData } from 'react-router-dom'

const SingleNotes = () => {
    // Destructure all relevant properties from the loader data
    const { _id, notesTitle, imageURL, creator, notesDescription } = useLoaderData();
    
    return (
      <div className='mt-28 px-4 lg:px-24'>
        {/* Display the image */}
        <img src={imageURL} alt={notesTitle} className='h-96 w-full object-cover' />

        {/* Display note title */}
        <h2 className='text-4xl font-bold mt-4'>{notesTitle}</h2>

        {/* Optionally display additional details */}
        <p className='text-gray-600 my-2'>Created by: {creator}</p>
        <p className='text-lg text-gray-800'>{notesDescription}</p>
      </div>
    );
}

export default SingleNotes;
