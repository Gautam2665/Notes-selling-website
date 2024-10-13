import React, { useState } from 'react';
import { Select, Button, Label, TextInput, Textarea } from 'flowbite-react';

const UploadNotes = () => {
  const notesCategory = [
    "MU (Mumbai University)",
    "SPPU (Savitribai Phule Pune University)",
    "IIT JEE Mains",
    "NEET",
    "Physics",
    "Mathematics",
    "Computer Science",
    "UPSC Civil Services",
    "GATE (General Aptitude Test for Engineers)",
    "Python Programming",
    "Web Development",
    "CFA (Chartered Financial Analyst)"






  ];

  const [selectedNotesCategory, setSelectedNotesCategory] = useState(notesCategory[0]);

  const handleChangeSelectedValue = (event) => {
    console.log(event.target.value);
    setSelectedNotesCategory(event.target.value);
  }


  const handleNotesSubmit = (event) => {
    event.preventDefault();
    const form=event.target;

    const notesTitle=form.notesTitle.value;
    const creator=form.creator.value;
    const imageURL=form.imageURL.value;
    const category=form.categoryName.value;
    const notesDescription=form.notesDescription.value;
    const notesPDFURL=form.notesPDFURL.value;

    const notesObj={
      notesTitle, creator, imageURL, category, notesDescription, notesPDFURL
    }

    console.log(notesObj);

    fetch("http://localhost:5000/upload-notes", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notesObj)

    }).then(res =>res.json()).then(data=>{
      //console.log(data);
      alert("Notes uploaded successfully");
      form.reset();
    });

  }

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


        {/* second row*/}
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

          {/*category*/ }
          <div className='lg:w-1/2'>
          <div className="mb-2 block">
              <Label 
                htmlFor="inputState" 
                value="Notes Category" 
              />
            </div> 
            <Select id='inputState' name='categoryName' className='w-full rounded' value={selectedNotesCategory}
            onChange={handleChangeSelectedValue}>
              {
                notesCategory.map((option) => <option key={option} value={option}>{option}</option>)
              }
            </Select>


          </div>
        </div>

        {/*notes description*/}
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

        {/*notes PDF link*/ }
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
            placeholder='Notes PDF url'
            required
            type='text'
          />
        </div>

        <Button type='submit'  className='bg-blue-700 text-white px-6 py-2 font-medium hover:bg-black transition-all ease-in duration-200 flex justify-center items-center'>Upload Notes</Button>

      </form>
    </div>
  )
}

export default UploadNotes;