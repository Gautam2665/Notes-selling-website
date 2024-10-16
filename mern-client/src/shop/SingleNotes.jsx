import React from 'react';
import { useLoaderData } from 'react-router-dom';

const SingleNotes = () => {
    // Destructure all relevant properties from the loader data
    const { _id, notesTitle, imageURL, creator, notesDescription, price } = useLoaderData();
    
    return (
        <div className='mt-28 px-4 lg:px-24'>
            <div className='flex flex-col lg:flex-row items-center lg:items-start'>
                {/* Image on the left */}
                <div className='lg:w-1/2 flex justify-center lg:justify-start'>
                    <img 
                        src={imageURL} 
                        alt={notesTitle} 
                        className='w-[500px] h-[500px] object-cover rounded-lg shadow-lg'
                    />
                </div>

                {/* Content on the right */}
                <div className='lg:w-1/2 lg:pl-12 mt-6 lg:mt-0 flex flex-col justify-center'>
                    {/* Display note title */}
                    <h2 className='text-4xl font-bold'>{notesTitle}</h2>

                    {/* Display creator */}
                    <p className='text-gray-600 my-2'>Created by: {creator}</p>

                    {/* Display price */}
                    <p className='text-2xl font-semibold text-green-600 mt-2'>${price || '10.00'}</p>

                    {/* Display note description */}
                    <p className='text-lg text-gray-800 mt-4'>{notesDescription}</p>
                </div>
            </div>
        </div>
    );
}

export default SingleNotes;
