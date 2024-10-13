import React from 'react'
import Banner from '../components/Banner';
import BestSellerNotes from './BestSellerNotes';
import FavNotes from './FavNotes';
import PromoBanner from './PromoBanner';
import OtherNotes from './OtherNotes';
import Review from './Review';

const Home = () => {
  return (
    <div>
      <Banner/>
      <BestSellerNotes/>
      <FavNotes/>
      <PromoBanner/>
      <OtherNotes/>
      <Review/>
    </div>
      
  )
}

export default Home
