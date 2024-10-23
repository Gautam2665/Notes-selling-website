import React, { useState, useEffect } from 'react';
import { Select, Button, Label, TextInput, Textarea } from 'flowbite-react';

const UploadNotes = () => {
  const [categories, setCategories] = useState([]);
  const [selectedNotesCategory, setSelectedNotesCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');

  // Fetch categories from the database
  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        if (data.length > 0) {
          setSelectedNotesCategory(data[0].name); // Assuming categories have a 'name' property
        }
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  // Handle new category addition
// Handle new category addition
const handleAddCategory = () => {
  if (newCategory.trim()) {
    const newCategoryObj = { newCategory }; // Correctly structure the request

    // Save new category to the database
    fetch("http://localhost:5000/add-category", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCategoryObj) // Send newCategory as part of the object
    })
    .then(res => res.json())
    .then(data => {
      if (data.message) {
        // Fetch updated categories from the database after adding a new category
        return fetch("http://localhost:5000/categories");
      } else {
        throw new Error('Error adding category');
      }
    })
    .then(res => res.json())
    .then(data => {
      setCategories(data); // Update the categories state with the latest data
      setSelectedNotesCategory(data[data.length - 1].name); // Automatically select the new category
      setNewCategory(''); // Clear the input field
      alert("Category added successfully");
    })
    .catch(error => console.error('Error adding category:', error));
  }
};


  // Handle the form submission for uploading notes
  const handleNotesSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
  
    const notesTitle = form.notesTitle.value;
    const creator = form.creator.value;
    const imageURL = form.imageURL.value;
    const category = selectedNotesCategory;
    const notesDescription = form.notesDescription.value;
    const notesPDFURL = form.notesPDFURL.value;
    const price = form.price.value; 
  
    const notesObj = {
      notesTitle,
      creator,
      imageURL,
      category, // Ensure this is set correctly
      notesDescription,
      notesPDFURL,
      price 
    };
  
    console.log("Submitting notes:", notesObj); // Debug the object being sent
  
    fetch("http://localhost:5000/upload-notes", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notesObj)
    })
    .then(res => res.json())
    .then(data => {
      alert("Notes uploaded successfully");
      form.reset();
    })
    .catch((error) => {
      console.error("Error uploading notes:", error);
    });
  };
  

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Upload Notes</h2>

      <form onSubmit={handleNotesSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        {/* first row title */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label 
                htmlFor="notesTitle" 
                value="Notes Title" 
              />
            </div>
            <TextInput 
              id="notesTitle"
              name='notesTitle' 
              type="text" 
              placeholder="Enter the title of the notes" 
              required
            />
          </div>

          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label 
                htmlFor="creator" 
                value="Notes Creator" 
              />
            </div>
            <TextInput 
              id="creator"
              name='creator' 
              type="text" 
              placeholder="Enter creator's name" 
              required
            />
          </div>
        </div>

        {/* second row */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label 
                htmlFor="imageURL" 
                value="Notes Image URL" 
              />
            </div>
            <TextInput 
              id="imageURL"
              name='imageURL'
              placeholder='Notes Image URL'
              required
              type="text"
            />
          </div>

          {/* category and add new category */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label 
                htmlFor="inputState" 
                value="Notes Category" 
              />
            </div> 

            {/* Category dropdown and add category input/button */}
            <div className="flex items-center gap-2">
              <Select
                id='inputState'
                name='categoryName'
                className='w-full rounded'
                value={selectedNotesCategory}
                onChange={(e) => setSelectedNotesCategory(e.target.value)}
              >
                {
                  categories.map((option) => <option key={option.name} value={option.name}>{option.name}</option>)
                }
              </Select>
              
              {/* New category input */}
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New category"
                className="border rounded px-2 py-1 flex-1"
              />

              {/* Add button */}
              <Button
                onClick={handleAddCategory}
                className='bg-blue-700 text-white font-medium hover:bg-black transition-all ease-in duration-200 flex justify-center items-center'>
                Add
              </Button>
            </div>
          </div>
        </div>

        {/* notes description */}
        <div>
          <div className="mb-2 block">
            <Label 
              htmlFor="notesDescription" 
              value="Notes Description" 
            />
          </div>
          <Textarea 
            id="notesDescription"
            name='notesDescription'
            placeholder='Write notes description...'
            required
            className='w-full'
            rows={6}
          />
        </div>

        {/* notes PDF link */}
        <div>
          <div className="mb-2 block">
            <Label 
              htmlFor="notesPDFURL" 
              value="Notes PDF URL" 
            />
          </div>
          <TextInput 
            id="notesPDFURL"
            name='notesPDFURL'
            placeholder='Notes PDF URL'
            required
            type='text'
          />
        </div>

        {/* price field */}
        <div>
          <div className="mb-2 block">
            <Label 
              htmlFor="price" 
              value="Price" 
            />
          </div>
          <TextInput 
            id="price"
            name='price'
            placeholder='Enter the price'
            required
            type='number'
            step="0.01"
          />
        </div>

        <Button type='submit'  className='bg-blue-700 text-white px-6 py-2 font-medium hover:bg-black transition-all ease-in duration-200 flex justify-center items-center'>Upload Notes</Button>
      </form>
    </div>
  )
};

export default UploadNotes;
