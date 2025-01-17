import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";

// Get available cars for the requested dates
export async function GET(req: Request) {
  const url = new URL(req.url);
  const pickUpDate = url.searchParams.get("pickUpDate");
  const dropOffDate = url.searchParams.get("dropOffDate");

  if (!pickUpDate || !dropOffDate) {
    return NextResponse.json(
      { error: "Pick-up and Drop-off dates are required" },
      { status: 400 }
    );
  }

  try {
    // Parse input dates
    const pickUp = new Date(pickUpDate);
    const dropOff = new Date(dropOffDate);

    console.log(pickUp, dropOff);

    const carsRef = collection(db, "Cars");
    const snapshot = await getDocs(carsRef);

    if (snapshot.empty) {
      return NextResponse.json({ message: "No cars found" }, { status: 404 });
    }

    // Find cars that are available in the requested date range
    const availableCars = snapshot.docs.filter((doc) => {
      const car = doc.data();
      const periods = car.availablePeriod || [];

      // Check if any period overlaps with the requested dates
      return periods.some((period: any) => {
        const startDate = new Date(period.startDate.seconds * 1000);
        const endDate = new Date(period.endDate.seconds * 1000);

        // Logic: The requested period should fully fit within the available period
        console.log("Requested pickUpDate:", pickUp);
        console.log("Requested dropOffDate:", dropOff);
        console.log("Car availability period:", startDate, "to", endDate);

        return pickUp < endDate && dropOff > startDate;
      });
    });

    if (availableCars.length === 0) {
      return NextResponse.json(
        { message: "No cars available for the selected dates" },
        { status: 404 }
      );
    }

    // Return the available cars with necessary fields
    const cars = availableCars.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      image: doc.data().image,  // Add image field
    }));

    return NextResponse.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
