import React from 'react'
import BannerCard from '../home/BannerCard'

const Banner = () => {
  return (
    <div className='px-4 lg:px-24 bg-teal-100 flex items-center'>
        <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>
            {}
            <div className='md:w1/2 space-y-8 h-full'>
                <h2 className='text-5xl font-bold leading-snug text-black'>Buy and Sell your notes<span className='text-blue-700'> for the best prices</span></h2>
                <p className='md:w-4/5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. At iure nesciunt maxime, adipisci praesentium sint consectetur illo, deserunt consequatur natus sed ea nulla minima velit cum? Molestiae accusantium autem sed.</p>
                <div>
                    <input type="text" name="search" id="search" placeholder='search notes' className='py-2 px-2 rounded-s-sm outline-none'/>
                    <button className='bg-blue-700 text-white px-6 py-2 font-medium hover:bg-black transition-all ease-in duration-200'>Search</button>
                </div>
            </div>

            {}
            <div>
              <BannerCard/>
            </div>
        </div>
    </div>
  )
}

export default Banner
