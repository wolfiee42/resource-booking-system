import { NextRequest, NextResponse } from "next/server";
import { BookingRequest, TBooking } from "@/types/booking";
import { bookingStore } from "@/lib/booking-store";
import {
  checkBookingConflicts,
  validateBookingTimes,
} from "@/lib/booking-utils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const resource = searchParams.get("resource");
    const date = searchParams.get("date");

    let bookings = bookingStore.getAll();

    if (resource) {
      bookings = bookings.filter((booking) => booking.resource === resource);
    }

    if (date) {
      const targetDate = new Date(date).toDateString();
      bookings = bookings.filter(
        (booking) => new Date(booking.startTime).toDateString() === targetDate
      );
    }

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

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
