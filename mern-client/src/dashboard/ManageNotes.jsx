import React, { useState, useEffect, useMemo, useContext } from 'react';
import { useTable } from 'react-table';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { CategoryContext } from '../context/CategoryContext'; // Adjust the import path based on your folder structure

const ManageNotes = () => {
  const [allNotes, setAllNotes] = useState([]);
  const { categories } = useContext(CategoryContext); // Get categories from context

  useEffect(() => {
    fetch('http://localhost:5000/all-notes')
      .then((res) => res.json())
      .then((data) => {
        console.log('Notes fetched:', data); // Debugging
        setAllNotes(data);
      })
      .catch((err) => console.error('Error fetching notes:', err));
  }, []);

  // Delete a note
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/notes/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        alert('Deleted successfully');
        setAllNotes((prev) => prev.filter((note) => note._id !== id)); // Update the UI after deletion
      });
  };

  // Helper function to get category name by ID or name
  const getCategoryNameById = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId || cat.name === categoryId); 

    if (category) {
      return category.name;
    } else {
      console.error('Category ID not found:', categoryId); // Debugging
      return 'Unknown Category'; // Return a default value if not found
    }
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
        accessor: 'category', // Use category ID
        Cell: ({ value }) => getCategoryNameById(value), // Display the category name
      },
      {
        Header: 'Price',
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
    [categories] // memoize the columns
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
          {headerGroups.map((headerGroup) => {
            const headerGroupProps = headerGroup.getHeaderGroupProps();
            const { key, ...restHeaderGroupProps } = headerGroupProps; // Extract key from header group props
            
            return (
              <tr key={key} {...restHeaderGroupProps} className='border-b border-gray-300'>
                {headerGroup.headers.map((column) => {
                  const columnProps = column.getHeaderProps();
                  const { key: columnKey, ...restColumnProps } = columnProps; // Extract key from column props

                  return (
                    <th
                      key={columnKey} // Use the key directly for the th element
                      {...restColumnProps}
                      className='border p-2 text-left bg-gray-100'
                    >
                      {column.render('Header')}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const rowProps = row.getRowProps();
            const { key, ...restRowProps } = rowProps; // Separate key from row props
          
            return (
              <tr key={key} {...restRowProps} className='border-b border-gray-300'>
                {row.cells.map((cell) => {
                  const cellProps = cell.getCellProps();
                  const { key: cellKey, ...restCellProps } = cellProps; // Separate key from cell props
                  return (
                    <td key={cellKey} {...restCellProps} className='border p-2'>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ManageNotes;