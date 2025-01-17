'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import Image from "next/image";

export default function SelectCar() {
    const searchParams = useSearchParams();
    const pickUpDate = searchParams.get('pickUpDate');
    const dropOffDate = searchParams.get('dropOffDate');

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `/api/car?pickUpDate=${encodeURIComponent(pickUpDate!)}&dropOffDate=${encodeURIComponent(dropOffDate!)}`
                );

                if (!response.ok) {
                    throw new Error(`Failed to fetch cars: ${response.status}`);
                }

                const data = await response.json();
                setCars(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (pickUpDate && dropOffDate) {
            fetchCars();
        }
    }, [pickUpDate, dropOffDate]);

    return (
        <main className="bg-gray-50 min-h-screen">
            {/* Navbar */}
            <Navbar />

            <div className="container mx-auto py-8">
                {/* Page Heading */}
                <h1 className="text-3xl font-bold mb-6">Available Cars</h1>

                {/* Loading State */}
                {loading && <p className="text-lg text-gray-600">Loading cars...</p>}

                {/* Error State */}
                {error && (
                    <p className="text-red-500 text-lg">
                        Error: {error}. Please try again later.
                    </p>
                )}

                {/* No Cars Available */}
                {!loading && !error && cars.length === 0 && (
                    <p className="text-lg text-gray-600">No cars are available for the selected dates.</p>
                )}

                {/* Car List */}
                {!loading && !error && cars.length > 0 && (
                    <div className="w-full max-w-[90rem] mx-auto p-4">
                        {/* Accordion container */}
                        <Accordion type="single" collapsible>
                            {cars.map((car: any) => (
                                <CarCard key={car.id} car={car} />
                            ))}
                        </Accordion>
                    </div>
                )}
            </div>
        </main>
    );
}

const CarCard = ({ car }: { car: any }) => {
    const router = useRouter();

    const handleReserve = (car: any) => {
        const carData = encodeURIComponent(JSON.stringify(car));
        router.push(`/booking?car=${carData}`);
    };

    return (
        <AccordionItem
            key={car.id}
            value={`item-${car.id}`}
            className="border rounded-lg shadow mb-4"
        >
            {/* Car row (collapsed view) */}
            <AccordionTrigger className="p-4 flex items-center justify-between gap-4 w-full">
                {/* Car Image */}
                <div className="w-1/4 max-w-[200px]">
                    <img
                        src="https://via.placeholder.com/300x200" // Temporary image placeholder
                        alt={car.name}
                        className="h-[100px] w-full object-cover rounded-lg"
                    />
                </div>

                {/* Car Details */}
                <div className="w-1/2 text-left">
                    <h3 className="text-2xl font-bold">{car.name}</h3>
                    {car.seats && <p className="text-gray-600 text-sm">👤 {car.seats} Seats</p>}
                    {car.transmission && <p className="text-gray-600 text-sm">⚙️ {car.transmission}</p>}
                    {car.mileage && <p className="text-gray-600 text-sm">🛣️ {car.mileage}</p>}
                </div>

                {/* Price and Reserve Action */}
                <div className="w-1/4 text-center flex flex-col justify-center items-center">
                    {car.price && (
                        <span className="text-xl font-semibold mb-2">CA ${car.price}</span>
                    )}
                    {/* Change button to div or span */}
                    <div
                        onClick={() => handleReserve(car)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded cursor-pointer text-sm"
                    >
                        Reserve
                    </div>
                </div>
            </AccordionTrigger>

            {/* Expanded Content */}
            <AccordionContent>
                <div className="p-4 border-t text-gray-700 text-lg">
                    {car.extraInfo || "No additional information available for this car."}
                </div>
            </AccordionContent>
        </AccordionItem>
    );
};
