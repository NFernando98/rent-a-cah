import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const pickUpDate = url.searchParams.get("pickUpDate");
  const dropOffDate = url.searchParams.get("dropOffDate");

  if (!pickUpDate || !dropOffDate) {
    console.error("Pick-up and Drop-off dates are required");
    return NextResponse.json(
      { error: "Pick-up and Drop-off dates are required" },
      { status: 400 }
    );
  }

  try {
    // Parse and normalize the dates (ignoring the time part)
    const pickUp = new Date(pickUpDate);
    const dropOff = new Date(dropOffDate);
    pickUp.setHours(0, 0, 0, 0); // Set time to 00:00 for pickUp
    dropOff.setHours(0, 0, 0, 0); // Set time to 00:00 for dropOff

    console.log(
      `Filtering cars from ${pickUp.toISOString()} to ${dropOff.toISOString()}`
    );

    const carsRef = collection(db, "Cars");
    const snapshot = await getDocs(carsRef);

    if (snapshot.empty) {
      console.log("No cars found in Cars collection.");
      return NextResponse.json({ message: "No cars found" }, { status: 404 });
    }

    // Filter available cars based on the dates
    const availableCars = snapshot.docs.filter((doc) => {
      const car = doc.data();
      const carAvailableDates = car.availablePeriod || []; // Access "Available" field directly

      return carAvailableDates.some((date: any) => {
        const availableDate = new Date(date.seconds * 1000); // Convert Firestore timestamp to Date
        availableDate.setHours(0, 0, 0, 0); // Normalize to midnight for comparison

        // Check if the available date falls within the range [pickUpDate, dropOffDate]
        return availableDate >= pickUp && availableDate <= dropOff;
      });
    });

    // If no cars are available, return a 404 response
    if (availableCars.length === 0) {
      console.log("No cars available for the selected dates");
      return NextResponse.json(
        { message: "No cars available for the selected dates" },
        { status: 404 }
      );
    }

    // Map available cars to return relevant data (e.g., name, price, id)
    const cars = availableCars.map((doc) => ({
      id: doc.id,
      name: doc.data().Name, // Include car name
    }));

    // Return the available cars as the response
    return NextResponse.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
