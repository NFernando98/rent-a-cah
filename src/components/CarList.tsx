"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

// Car data
const cars = [
  {
    id: 1,
    name: "BMW 3 Series 2013",
    price: 276,
    image: "/bmw.png",
    seats: 5,
    transmission: "Automatic",
    mileage: "Unlimited mileage",
    extraInfo: "This is a sporty and comfortable sedan with great handling.",
  },
  {
    id: 2,
    name: "Jeep Wrangler 4xe 2022",
    price: 448,
    image: "/jeep.png",
    seats: 5,
    transmission: "Automatic",
    mileage: "Unlimited mileage",
    extraInfo: "An off-road beast with hybrid capabilities and a rugged design.",
  },
  {
    id: 3,
    name: "Tesla Model X 2017",
    price: 435,
    image: "/tesla.png",
    seats: 5,
    transmission: "Automatic",
    mileage: "Unlimited mileage",
    extraInfo: "A futuristic electric SUV with falcon-wing doors and autopilot.",
  },
];

export default function CarList() {
  const router = useRouter();

  // Function to handle navigation to booking page
  const handleReserve = (car: any) => {
    const carData = encodeURIComponent(JSON.stringify(car));
    router.push(`/booking?car=${carData}`);
  };

  return (
    <div className="w-full max-w-[90rem] mx-auto p-4">
      {/* Accordion container */}
      <Accordion type="single" collapsible>
        {cars.map((car) => (
          <AccordionItem
            key={car.id}
            value={`item-${car.id}`}
            className="border rounded-lg shadow mb-4"
          >
            {/* Car row (collapsed view) */}
            <AccordionTrigger className="p-4 flex items-center justify-between gap-4 w-full">
              {/* Car Image */}
              <div className="w-1/4">
                <Image
                  src={car.image}
                  alt={car.name}
                  width={300}
                  height={200}
                  className="rounded-lg object-cover"
                />
              </div>

              {/* Car Details */}
              <div className="w-1/2 text-left">
                <h3 className="text-3xl font-bold">{car.name}</h3>
                <p className="text-gray-600 text-sm">
                  👤 {car.seats} Seats
                </p>
                <p className="text-gray-600 text-sm">
                  ⚙️ {car.transmission}
                </p>
                <p className="text-gray-600 text-sm">
                  🛣️{" "}{car.mileage}
                </p>
              </div>

              {/* Price and Reserve Button */}
              <div className="w-1/4 text-center flex flex-col justify-center items-center">
                <span className="text-2xl font-semibold mb-2">CA ${car.price}</span>
                <div
                  onClick={() => handleReserve(car)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded cursor-pointer text-sm">
                  Reserve
                </div>
              </div>
            </AccordionTrigger>

            {/* Expanded Content */}
            <AccordionContent>
              <div className="p-4 border-t text-gray-700 text-lg">
                <p>{car.extraInfo}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
