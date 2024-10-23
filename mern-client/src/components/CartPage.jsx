import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { Button } from 'flowbite-react'; 

const CartPage = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); 
  };

  const calculateSubtotal = (item) => {
    const quantity = Number(item.quantity) || 1; 
    return (item.price * quantity).toFixed(2);
  };

  const data = React.useMemo(() => cart, [cart]);

  const columns = React.useMemo(() => [
    {
      Header: 'Title',
      accessor: 'notesTitle', 
    },
    {
      Header: 'Creator',
      accessor: 'creator', 
    },
    {
      Header: 'Price',
      accessor: 'price', 
      Cell: ({ cell: { value } }) => <p className="text-blue-600 font-semibold">${value}</p>,
    },
    {
      Header: 'Quantity',
      accessor: 'quantity', 
      Cell: ({ cell: { value }, row }) => (
        <input
          type="number"
          min="1"
          value={value || 1}
          className="w-16 border border-gray-300 text-center"
          onChange={(e) => {
            const updatedCart = cart.map((item) => {
              if (item._id === row.original._id) {
                return { ...item, quantity: parseInt(e.target.value, 10) };
              }
              return item;
            });
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart)); 
          }}
        />
      ),
    },
    {
      Header: 'Subtotal',
      accessor: 'subtotal',
      Cell: ({ row }) => (
        <p className="text-green-600 font-semibold">${calculateSubtotal(row.original)}</p>
      ),
    },
    {
      Header: 'Actions',
      id: 'remove',
      Cell: ({ row }) => (
        <Button className='bg-blue-700 text-white font-medium hover:bg-black transition-all ease-in duration-200 flex justify-center items-center' onClick={() => handleRemoveFromCart(row.original._id)}>
          Remove
        </Button>
      ),
    },
  ], [cart]);

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  if (cart.length === 0) {
    return <h2 className='text-center text-xl mt-16'>Your cart is empty.</h2>;
  }

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl mb-8 font-semibold mt-14 text-center">Your Cart</h2>

      <table {...getTableProps()} className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="px-4 py-2 text-left border-b border-gray-300 font-semibold">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-gray-50">
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="px-4 py-2 border-b border-gray-300">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex justify-end mt-6">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => window.location.href = '/checkout'}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
