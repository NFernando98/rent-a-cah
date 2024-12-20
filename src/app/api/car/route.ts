import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";

// Get all cars documents
export async function GET(request: any) {
    try {
        console.log("Fetching Cars collection from Firestore...");
        const carsRef = collection(db, "Cars"); // Reference to Cars collection
        const snapshot = await getDocs(carsRef); // Fetch all documents in Cars

        // Check if there are any documents in the snapshot
        if (snapshot.empty) {
            console.log("No documents found in Cars collection.");
            return NextResponse.json({ message: "No cars found" }, { status: 404 });
        }

        // Map through the documents and prepare the response
        const cars = snapshot.docs.map((doc) => ({
            id: doc.id, // Include the document ID
            ...doc.data(), // Include document fields
        }));

        console.log("Cars fetched successfully:", cars);
        return NextResponse.json(cars); // Return cars data as JSON
    } catch (error: any) {
        console.error("Error fetching Cars:", error.message);
        return NextResponse.json(
            { error: "Failed to fetch Cars", details: error.message },
            { status: 500 }
        );
    }
}

// Get car documents that are available
