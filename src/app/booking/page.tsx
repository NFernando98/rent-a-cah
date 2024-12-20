"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function BookingPage() {
    const router = useRouter();

    const searchParams = useSearchParams();
    const carData = searchParams.get("car");

    // Parse the car data
    const car = carData ? JSON.parse(decodeURIComponent(carData)) : null;

    // Re-route to car list
    const handleSelectCarClick = (e : any) => {
        e.preventDefault();

        router.push("/");
    };

    //Re-route to payment page
    const handlePayOnline = (e : any) => {
        e.preventDefault();

        router.push("/payment");
    };

    return (
        <div className="w-full mx-auto p-8">
            {/* Steps */}
            <div className="flex justify-center my-12">
                <div className="flex items-center gap-12 text-2xl">
                    <div 
                        className="flex flex-col items-center text-gray-500 cursor-pointer transform transition-all duration-200 hover:text-yellow-500 hover:scale-105 active:scale-100 active:opacity-75"
                        onClick={handleSelectCarClick}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                        </svg>
                        <span>Select Your Car</span>
                    </div>
                    <div className="border-t-4 border-gray-300 w-24"></div>
                    <div className="flex flex-col items-center text-yellow-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                        </svg>
                        <span>Booking & Confirm</span>
                    </div>
                    <div className="border-t-4 border-gray-300 w-24"></div>
                    <div className="flex flex-col items-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                        </svg>
                        <span>Payment</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-12">
                {/* Contact Details */}
                <Card className="flex-1 p-6">
                    <CardHeader>
                        <CardTitle className="text-4xl">Contact Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-6">
                            <div className="flex gap-6">
                                <div className="w-1/2">
                                    <label className="block mb-2 text-xl font-medium">First Name*</label>
                                    <Input className="w-full" />
                                </div>
                                <div className="w-1/2">
                                    <label className="block mb-2 text-xl font-medium">Last Name*</label>
                                    <Input className="w-full" />
                                </div>
                            </div>
                            <div>
                                <label className="block mb-2 text-xl font-medium">Address*</label>
                                <Input className="w-full" />
                            </div>
                            <div className="flex gap-6">
                                <div className="w-1/3">
                                    <label className="block mb-2 text-xl font-medium">Country</label>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cad">CAD +1</SelectItem>
                                            <SelectItem value="usa">USA +1</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="w-2/3">
                                    <label className="block mb-2 text-xl font-medium">Phone Number*</label>
                                    <Input className="w-full" />
                                </div>
                            </div>
                            <div>
                                <label className="block mb-2 text-xl font-medium">Email*</label>
                                <Input className="w-full" />
                            </div>
                            <div className="flex items-center gap-4">
                                <Button type="button" className="bg-yellow-400 hover:bg-yellow-500 text-xl text-black">
                                    ⬆ Upload Licence
                                </Button>
                                <span className="text-gray-500">licence.png</span>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Price Details */}
                <Card className="w-1/3 bg-gray-200 p-6">
                    <CardHeader>
                        <CardTitle className="text-4xl">{car.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-lg">
                        <div>
                            📅 <strong>Pickup:</strong> December 20 | 10:00 AM
                        </div>
                        <hr />
                        <div>
                            📅 <strong>Return:</strong> December 25 | 10:00 AM
                        </div>
                        <hr className="border-gray-400" />
                        <div className="flex justify-between">
                            <span>Rental Charges</span>
                            <span>CAD ${car.price}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Extra Driver Fee</span>
                            <span>CAD $20</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Taxes</span>
                            <span>CAD ${(car.price * 0.13).toFixed(2)}</span>
                        </div>
                        <hr className="border-gray-400" />
                        <div className="flex justify-between text-3xl font-bold">
                            <span>Total</span>
                            <span>CAD ${(car.price + car.price * 0.13 + 20).toFixed(2)}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Payment Buttons */}
            <div className="flex justify-end items-center mt-8 gap-4">
                <Button
                    onClick={handlePayOnline}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-8 px-10 text-3xl">
                    Pay Online
                </Button>
                <span className="text-3xl font-medium">or</span>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-8 px-10 text-3xl">
                    Pay at Pickup
                </Button>
            </div>
        </div>
    );
}