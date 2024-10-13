import React from 'react';

const PromoBanner = () => {
  return (
    <div className="mt-16 py-12 bg-teal-100 text-center">
      <h2 className="text-3xl font-bold mb-4">Get the Best Notes for Your Studies!</h2>
      <p className="text-lg mb-8">Find high-quality notes across various subjects at affordable prices.</p>
      <a href="/shop" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300">
        Shop Now!
      </a>
    </div>
  );
};

export default PromoBanner;
