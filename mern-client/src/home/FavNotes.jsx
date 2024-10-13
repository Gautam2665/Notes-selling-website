import React from 'react'
import FavNotesImg from "../assets/favoritebook.jpg"
import { Link } from 'react-router-dom'

const FavNotes = () => {
  return (
    <div className='px-4 lg:px-24 my-20 flex flex-col md:flex-row justify-between items-center gap-12'>
        <div className='md:w-1/2'>
            <img src={FavNotesImg} alt="" className='rounded md:w-10/12' />
        </div>

        <div className='md:w-1/2 space-y-6'>
            <h2 className='text-5xl font-bold my-5 md:w-3/4 leading-snug'>Find your fav <span className='text-blue-700'>Notes Here!</span></h2>
            <p className='mb-10 text-lg md:w-5/6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, deleniti? Quam excepturi illo pariatur accusantium fugiat officiis perspiciatis libero voluptas ducimus optio? Molestiae officia ab harum minima id, architecto totam?</p>
            {}
            <div className='flex flex-col sm:flex-row justify-between gap-6 md:w-3/4 my-14'>
            </div>


            <Link to="/shop" className='mt-8'><button className='bg-blue-700 text-white font-semibold px-5 py-2 rounded hover:bg-black transition-all duration-300'>Explore More</button></Link>           
            
            
            <div className='flex flex-col sm:flex-row justify-between gap-6 md:w-3/4 my-14'>
                <div>
                    <h3 className='text-3xl font-bold'>200+</h3>
                    <p className='text-base'>Notes Listing</p>
                </div>

                <div>
                    <h3 className='text-3xl font-bold'>200+</h3>
                    <p className='text-base'>Registered Users</p>
                </div>

                <div>
                    <h3 className='text-3xl font-bold'>200+</h3>
                    <p className='text-base'>PDF downloads</p>
                </div>
            </div>
        </div>      
    </div>
  )
}

export default FavNotes
