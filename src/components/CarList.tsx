// components/CarList.js
import React from 'react';

const cars = [
  {
    id: 1,
    name: "BMW 3 Series 2013",
    price: 276,
    image: "/images/bmw-3-series.jpg",
    seats: 5,
    transmission: "Automatic",
    mileage: "Unlimited mileage",
  },
  {
    id: 2,
    name: "Jeep Wrangler 4xe 2022",
    price: 448,
    image: "/images/jeep-wrangler.jpg",
    seats: 5,
    transmission: "Automatic",
    mileage: "Unlimited mileage",
  },
  {
    id: 3,
    name: "Tesla Model X 2017",
    price: 435,
    image: "/images/tesla-model-x.jpg",
    seats: 5,
    transmission: "Automatic",
    mileage: "Unlimited mileage",
  },
];

export default function CarList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <div
          key={car.id}
          className="bg-white rounded shadow overflow-hidden border border-gray-200"
        >
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{car.name}</h3>
            <p className="text-gray-700 text-sm mb-1">Seats: {car.seats}</p>
            <p className="text-gray-700 text-sm mb-1">Transmission: {car.transmission}</p>
            <p className="text-gray-700 text-sm mb-2">{car.mileage}</p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-gray-900">CA ${car.price} total</span>
              <button className="bg-yellow-500 text-black px-4 py-2 rounded">
                Reserve
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
