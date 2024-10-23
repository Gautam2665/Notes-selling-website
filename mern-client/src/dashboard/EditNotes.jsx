import React, { useState, useContext, useEffect } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { Select, Button, Label, TextInput, Textarea } from 'flowbite-react';
import { CategoryContext } from '../context/CategoryContext'; // Adjust the import path based on your folder structure

const EditNotes = () => {
  const { id } = useParams();
  const { notesTitle, creator, imageURL, category, notesDescription, notesPDFURL, price } = useLoaderData();
  
  const { categories } = useContext(CategoryContext); // Get categories from context
  const [selectedNotesCategory, setSelectedNotesCategory] = useState(category); // Initialize with existing category

  const handleChangeSelectedValue = (event) => {
    setSelectedNotesCategory(event.target.value);
  }

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;

    const notesTitle = form.notesTitle.value;
    const creator = form.creator.value;
    const imageURL = form.imageURL.value;
    const notesDescription = form.notesDescription.value;
    const notesPDFURL = form.notesPDFURL.value;
    const price = form.price.value;

    const updateNotesObj = {
      notesTitle,
      creator,
      imageURL,
      category: selectedNotesCategory, // Use selected category
      notesDescription,
      notesPDFURL,
      price,
    }

    fetch(`http://localhost:5000/notes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateNotesObj),
    })
    .then(res => res.json())
    .then(data => {
      alert("Notes updated successfully");
      form.reset();
    });
  }

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Update Notes Data</h2>

      <form onSubmit={handleUpdate} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        {/* First Row: Title and Creator */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="notesTitle" value="Notes Title" />
            </div>
            <TextInput 
              id="notesTitle"
              name='notesTitle' 
              type="text" 
              placeholder="Enter the title of the notes" 
              required
              defaultValue={notesTitle}  
            />
          </div>

          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="creator" value="Notes Creator" />
            </div>
            <TextInput 
              id="creator"
              name='creator' 
              type="text" 
              placeholder="Enter creator's name" 
              required
              defaultValue={creator} 
            />
          </div>
        </div>

        {/* Second Row: Image URL and Category */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="imageURL" value="Notes Image URL" />
            </div>
            <TextInput 
              id="imageURL"
              name='imageURL'
              placeholder='Notes Image URL'
              required
              type="text"
              defaultValue={imageURL}
            />
          </div>

          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="inputState" value="Notes Category" />
            </div> 
            <Select 
              id='inputState' 
              name='categoryName' 
              className='w-full rounded' 
              value={selectedNotesCategory}
              onChange={handleChangeSelectedValue}
            >
              {categories.map((option) => (
                <option key={option.name} value={option.name}>{option.name}</option>
              ))}
            </Select>
          </div>
        </div>

        {/* Notes Description */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="notesDescription" value="Notes Description" />
          </div>
          <Textarea 
            id="notesDescription"
            name='notesDescription'
            placeholder='Write notes description...'
            required
            className='w-full'
            rows={6}
            defaultValue={notesDescription}
          />
        </div>

        {/* Notes PDF URL */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="notesPDFURL" value="Notes PDF URL" />
          </div>
          <TextInput 
            id="notesPDFURL"
            name='notesPDFURL'
            placeholder='Notes PDF URL'
            required
            type='text'
            defaultValue={notesPDFURL}
          />
        </div>

        {/* Price Section */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="price" value="Notes Price ($)" />
          </div>
          <TextInput 
            id="price"
            name='price'
            placeholder='Enter the price for the notes'
            required
            type='number'
            min='0'
            defaultValue={price || '10.00'}
          />
        </div>

        {/* Submit Button */}
        <Button type='submit' className='bg-blue-700 text-white px-6 py-2 font-medium hover:bg-black transition-all ease-in duration-200 flex justify-center items-center'>
          Update Notes
        </Button>
      </form>
    </div>
  );
}

export default EditNotes;
