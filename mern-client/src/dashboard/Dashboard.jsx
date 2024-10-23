import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalNotes: 0,
    totalPurchases: 0,
    favoriteCategory: '',
    mostPurchasedNote: '',
  });

  useEffect(() => {
    // Fetch user's statistics from an API endpoint
    fetch("http://localhost:5000/user-stats")
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  return (
    <div>
        <div className='px-4 my-12'>
      <h2 className='text-3xl font-bold mb-8'>Your Statistics</h2>
      <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
        <div className='p-4 bg-white shadow rounded'>
          <h3 className='text-xl font-semibold'>Total Notes Uploaded</h3>
          <p className='text-2xl font-bold'>{stats.totalNotes}</p>
        </div>
        <div className='p-4 bg-white shadow rounded'>
          <h3 className='text-xl font-semibold'>Total Purchases</h3>
          <p className='text-2xl font-bold'>{stats.totalPurchases}</p>
        </div>
        <div className='p-4 bg-white shadow rounded'>
          <h3 className='text-xl font-semibold'>Favorite Category</h3>
          <p className='text-xl'>{stats.favoriteCategory}</p>
        </div>
        <div className='p-4 bg-white shadow rounded'>
          <h3 className='text-xl font-semibold'>Most Purchased Note</h3>
          <p className='text-xl'>{stats.mostPurchasedNote}</p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Dashboard