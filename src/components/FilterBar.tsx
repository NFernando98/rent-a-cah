// components/FilterBar.js
import React from 'react';

export default function FilterBar() {
  return (
    <div className="bg-white shadow py-4 px-4">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <select className="border border-gray-300 rounded px-4 py-2">
          <option>Daily price</option>
          <option>Low to High</option>
          <option>High to Low</option>
        </select>

        <select className="border border-gray-300 rounded px-4 py-2">
          <option>Vehicle Type</option>
          <option>Sedan</option>
          <option>SUV</option>
          <option>Truck</option>
        </select>

        <select className="border border-gray-300 rounded px-4 py-2">
          <option>Seats</option>
          <option>2 Seats</option>
          <option>5 Seats</option>
          <option>7+ Seats</option>
        </select>

        <select className="border border-gray-300 rounded px-4 py-2">
          <option>Deliver to Me</option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>
    </div>
  );
}
