import React, { createContext, useEffect, useState } from 'react';

// Create Context
export const CategoryContext = createContext();

// Create Provider Component
export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  // Fetch categories from the server
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Function to add a new category
  const addCategory = (newCategory) => {
    setCategories((prevCategories) => [
      ...prevCategories,
      { name: newCategory, _id: newCategory }, // Ensure each category has a unique ID
    ]);
  
    // Optionally: Save the new category to the database here
    fetch("http://localhost:5000/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCategory }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("Category added:", data); // Verify the response from the server
    });
  };

  return (
    <CategoryContext.Provider value={{ categories, addCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};