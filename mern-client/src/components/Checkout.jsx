import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thankYouMessage, setThankYouMessage] = useState('');
  const navigate = useNavigate();

  const handlePayment = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    // Simulate payment processing
    setTimeout(() => {
      // Show thank you message first
      setThankYouMessage('Thank you for your purchase!');
      setIsSubmitting(false);
  
      // Delay for 3 seconds before clearing the cart and redirecting
      setTimeout(() => {
        // Clear the cart in state and localStorage
        setCart([]);  // Reset cart state to empty
        localStorage.removeItem('cart');  // Remove cart from localStorage
  
        // Redirect user to homepage
        navigate('/');
      }, 3000);  // Delay for 3 seconds before clearing the cart and redirecting
    }, 2000);  // Simulate a 2-second payment processing delay
  };

  const calculateSubtotal = (item) => {
    const quantity = Number(item.quantity) || 1;
    return (item.price * quantity).toFixed(2);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * (Number(item.quantity) || 1)), 0).toFixed(2);
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
      Cell: ({ cell: { value } }) => (
        <p className="text-gray-700">{value || 1}</p>
      ),
    },
    {
      Header: 'Subtotal',
      accessor: 'subtotal',
      Cell: ({ row }) => (
        <p className="text-green-600 font-semibold">${calculateSubtotal(row.original)}</p>
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
      <h2 className="text-3xl mb-8 font-semibold mt-14 text-center">Checkout</h2>

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

      <div className="flex justify-end mt-4">
        <p className="text-lg font-semibold">Total: ${calculateTotal()}</p>
      </div>

      <form onSubmit={handlePayment} className='flex flex-col gap-4 mt-8'>
        <label htmlFor='email' className='block mb-6'>
          <span className='text-gray-800 font-semibold text-lg mb-3 block'>
            Email Address
          </span>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='w-full px-4 py-3 text-base border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition duration-300 ease-in-out bg-white hover:bg-gray-50'
            placeholder='Enter your email address'
          />
        </label>

        <button
          type='submit'
          className='bg-blue-700 text-white px-4 py-2 rounded hover:bg-black transition-all ease-in duration-200'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Pay'}
        </button>
      </form>

      {thankYouMessage && <p className='mt-4 text-green-600'>{thankYouMessage}</p>}
    </div>
  );
};

export default Checkout;