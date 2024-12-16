import React from "react";
import Image from "next/image";

const cars = [
  {
    id: 1,
    name: "BMW 3 Series 2013",
    price: 276,
    image: "/bmw.png",
    seats: 5,
    transmission: "Automatic",
    mileage: "Unlimited mileage",
  },
  {
    id: 2,
    name: "Jeep Wrangler 4xe 2022",
    price: 448,
    image: "/jeep.png",
    seats: 5,
    transmission: "Automatic",
    mileage: "Unlimited mileage",
  },
  {
    id: 3,
    name: "Tesla Model X 2017",
    price: 435,
    image: "/tesla.png",
    seats: 5,
    transmission: "Automatic",
    mileage: "Unlimited mileage",
  },
];

export default function CarList() {
  return (
    <div className="w-full max-w-screen-2xl mx-auto mt-6 px-6 space-y-6">
      {cars.map((car) => (
        <div
          key={car.id}
          className="flex bg-white shadow-md rounded-lg overflow-hidden h-64 border border-gray-200"
        >
          {/* Left Section: Car Image */}
          <div className="relative w-1/3 h-full">
            <Image
              src={car.image}
              alt={car.name}
              layout="fill"
              objectFit="cover"
            />
          </div>

          {/* Middle Section: Car Details */}
          <div className="w-1/3 flex items-center justify-start px-8">
            <div>
              <h3 className="text-3xl font-extrabold text-gray-900 mb-4">
                {car.name}
              </h3>
              <div className="flex text-gray-700 space-x-8 text-2xl font-semibold mb-2">
                <span>👤 {car.seats}</span>
                <span>{car.transmission}</span>
              </div>
              <p className="text-gray-600 text-2xl">{car.mileage}</p>
            </div>
          </div>

          {/* Right Section: Price and Reserve Button */}
          <div className="w-1/3 flex items-center justify-center text-center px-8">
            <div>
              <span className="text-2xl font-extrabold text-gray-900 block mb-4">
                CA ${car.price} total
              </span>
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-lg text-xl">
                Reserve
              </button>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
