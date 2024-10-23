import React, { useState, useEffect, useContext } from 'react';
import { Select, Card, Button } from 'flowbite-react';
import { CategoryContext } from '../context/CategoryContext'; 

const Buy = () => {
  const [notes, setNotes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const { categories } = useContext(CategoryContext); 

  useEffect(() => {
    const categoryQuery = selectedCategory !== 'All Categories' ? `?category=${selectedCategory}` : '';
    fetch(`http://localhost:5000/all-notes${categoryQuery}`)
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error('Error fetching notes:', err));
  }, [selectedCategory]);

  const handleAddToCart = (note) => {
    const exists = cart.find((item) => item._id === note._id);
    if (!exists) {
      const updatedCart = [...cart, note];  
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));  
      alert(`${note.notesTitle} has been added to the cart!`);
      window.location.href = '/cart';  
    } else {
      alert(`${note.notesTitle} is already in the cart.`);
    }
  };

  const handleBuyNow = (note) => {
    handleAddToCart(note);
    window.location.href = '/checkout';
  };

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold mt-20 text-center'>Buy Notes</h2>

      {/* Category Selection */}
      <div className='mb-4'>
        <Select
          name="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className='rounded-lg border border-gray-300 shadow-md'
        >
          <option value="All Categories">All Categories</option>
          {categories.map(category => (
            <option key={category._id} value={category.name}>{category.name}</option>
          ))}
        </Select>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {notes.map(note => (
          <Card key={note._id} className='w-full border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <img 
              src={note.imageURL} 
              alt={note.notesTitle} 
              className='w-full h-48 object-contain rounded-t-lg' 
              style={{ height: '200px', width: '100%' }} 
            />
            <div className='p-4'>
              <h3 className='text-lg font-bold mb-2'>{note.notesTitle}</h3>
              <p className='text-gray-700 mb-1'><strong>Creator:</strong> {note.creator}</p>
              <p className='text-gray-700 mb-1'><strong>Category:</strong> {note.category}</p>
              <p className='text-lg font-semibold text-blue-600 mb-2'>${note.price}</p>
              <p className='text-gray-600 mb-4'>{note.notesDescription || 'No description available.'}</p>
              <div className='flex justify-between mt-6'> {/* Added margin-top here for extra spacing */}
                <Button onClick={() => handleAddToCart(note)} className='bg-green-500 hover:bg-green-600 text-white'>
                  Add to Cart
                </Button>
                <Button onClick={() => handleBuyNow(note)} className='bg-blue-600 hover:bg-blue-700 text-white'>
                  Buy Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Buy;
