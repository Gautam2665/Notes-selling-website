import React, { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import { Link } from 'react-router-dom'; // Import Link for navigation

const ManageNotes = () => {
  const [allNotes, setAllNotes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/all-notes')
      .then((res) => res.json())
      .then((data) => setAllNotes(data));
  }, []);

  // delete a note
  const handleDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/notes/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        alert('Deleted successfully');
        setAllNotes((prev) => prev.filter((note) => note._id !== id)); // Update the UI after deletion
      });
  };

  // Columns for React Table
  const columns = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'index', // will be manually added below
      },
      {
        Header: 'Notes Name',
        accessor: 'notesTitle',
      },
      {
        Header: 'Creator Name',
        accessor: 'creator',
      },
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'Prize',
        accessor: 'price',
        Cell: ({ value }) => `$${value || '10.00'}`,
      },
      {
        Header: 'Edit or Manage',
        accessor: '_id',
        Cell: ({ value }) => (
          <div>
            <Link
              className='font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5'
              to={`/admin/dashboard/edit-notes/${value}`}
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(value)}
              className='bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600 ml-2'
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [] // memoize the columns
  );

  // Add index to each note
  const data = useMemo(
    () =>
      allNotes.map((note, index) => ({
        ...note,
        index: index + 1,
      })),
    [allNotes]
  );

  // Using React Table hook
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Manage Notes</h2>

      {/* Table for notes data */}
      <table
        {...getTableProps()}
        className='lg:w-[1180px] table-auto border-collapse border border-gray-300'
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className='border-b border-gray-300'
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className='border p-2 text-left bg-gray-100'
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className='border-b border-gray-300'>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className='border p-2'>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ManageNotes;
