import React, { useState, useEffect } from 'react';
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const ManageNotes = () => {
  const [allNotes, setAllNotes] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/all-notes').then((res) => res.json()).then((data) => setAllNotes(data));
  }, []);

  //delete a note
  const handleDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/notes/${id}`, {
      method: 'DELETE',
    }).then(res => res.json()).then(data=> {
      alert("Deleted successfully")
        //setAllNotes(data)
    })
  }
  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Manage Notes</h2>

      {/* Table for notes data */}
      <Table className='lg:w-[1180px]'>
    <Table.Head>
      <Table.HeadCell>
        No
      </Table.HeadCell>
      <Table.HeadCell>
        Notes Name
      </Table.HeadCell>
      <Table.HeadCell>
        Creator Name
      </Table.HeadCell>
      <Table.HeadCell>
        Category
      </Table.HeadCell>
      <Table.HeadCell>
        Prize
      </Table.HeadCell>
      <Table.HeadCell>
        <span>
          Edit or Manage
        </span>
      </Table.HeadCell>
    </Table.Head>
      {
        allNotes.map((note, index) => <Table.Body className='divide-y' key={note._id}>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {index + 1}
          </Table.Cell>
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {note.notesTitle}
          </Table.Cell>
          <Table.Cell>
            {note.creator}
          </Table.Cell>
          <Table.Cell>
            {note.category}
          </Table.Cell>
          <Table.Cell>
            ${note.price || '10.00'}
          </Table.Cell>
          <Table.Cell>
            <Link 
              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5" 
              to={`/admin/dashboard/edit-notes/${note._id}`}
            >
                Edit
            </Link>
            <button onClick={() => handleDelete(note._id)} className='bg-red-600 px-4 py-1 font-semibold text-white rounded-sm
            hover:bg-sky-600 ml-2'>Delete</button>
          </Table.Cell>
        </Table.Row>
        </Table.Body>)
      }

    </Table>

    </div>
  )
}

export default ManageNotes;