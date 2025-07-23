import { NextRequest, NextResponse } from "next/server";
import { BookingRequest, TBooking } from "@/types/booking";
import { bookingStore } from "@/lib/booking-store";
import {
  checkBookingConflicts,
  validateBookingTimes,
} from "@/lib/booking-utils";

export async function POST(request: NextRequest) {
  try {
    const body: BookingRequest = await request.json();
    const { resource, startTime, endTime, requestedBy } = body;

    // Validate required fields
    if (!resource || !startTime || !endTime || !requestedBy) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate booking times
    const timeValidationError = validateBookingTimes(startTime, endTime);
    if (timeValidationError) {
      return NextResponse.json({ error: timeValidationError }, { status: 400 });
    }

    // Check for conflicts
    const conflictCheck = checkBookingConflicts(resource, startTime, endTime);
    if (conflictCheck.hasConflict) {
      return NextResponse.json(
        {
          error: "Booking conflict detected",
          message: conflictCheck.message,
          conflictingBookings: conflictCheck.conflictingBookings,
        },
        { status: 409 }
      );
    }

    const newBooking: TBooking = {
      id: Date.now().toString(),
      resource,
      startTime,
      endTime,
      requestedBy,
      createdAt: new Date().toISOString(),
    };

    const createdBooking = bookingStore.create(newBooking);
    return NextResponse.json(
      {
        message: "Booking created successfully",
        booking: createdBooking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
