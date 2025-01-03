<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Vendor;
use App\Models\User;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch bookings along with their associated users and vendors
        $bookings = Booking::with('vendors')
            ->where('is_deleted', 0)
            ->get();

        // Fetch active vendors and users
        $vendors = Vendor::where('is_deleted', 0)->get();
        $users = User::where('is_deleted', 0)->get();

        // Return the view with the data
        return view('dashboard.booking', compact('bookings', 'vendors', 'users'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'vendor_id' => 'required|exists:vendors,id',
            'event_date' => 'required|date|after:today',
            'status' => 'string',
        ]);

        // Check if the vendor already exists for this user's bookings
        $existingBooking = Booking::where('user_id', $request->user_id)
            ->whereHas('vendors', function ($query) use ($request) {
                $query->where('vendor_id', $request->vendor_id);
            })
            ->first();

        if ($existingBooking) {
            // Return a response indicating the vendor is already chosen
            return response()->json([
                'message' => 'Vendor already chosen for this user.',
            ], 400); // HTTP 400 Bad Request
        }

        // Create the booking
        $booking = Booking::create([
            'user_id' => $request->user_id,
            'event_date' => $request->event_date,
            'status' => $request->status,
        ]);

        // Attach the selected vendor to the booking
        $booking->vendors()->attach($request->vendor_id);

        // Return a JSON response
        return response()->json([
            'message' => 'Booking added successfully!',
            'booking' => $booking,
        ]);
    }


    public function edit($id)
    {
        $booking = Booking::with('vendors')->findOrFail($id);
        return response()->json(['booking' => $booking]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'vendor_id' => 'required|array',
            'vendor_id.*' => 'exists:vendors,id',
            'event_date' => 'required|date|after:today',
            'status' => 'string',
        ]);

        $booking = Booking::findOrFail($id);
        $booking->user_id = $validated['user_id'];
        $booking->event_date = $validated['event_date'];
        $booking->status = $validated['status'];
        $booking->save();

        // Update vendors
        $booking->vendors()->sync($validated['vendor_id']);

        return response()->json(['message' => 'Booking updated successfully!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $booking = Booking::findOrFail($id);

        // Soft delete by setting is_deleted to 1
        $booking->is_deleted = 1;
        $booking->save();

        return response()->json([
            'message' => 'Booking deleted successfully!',
        ]);
    }

    // User website functions
    /**
     * Get bookings for a specific user along with their associated vendors.
     */
    public function getBooked(Request $request, $id)
    {
        // Fetch bookings for the given user ID along with their vendors
        $bookings = Booking::where('user_id', $id)
            ->where('is_deleted', 0) // Ensure we only fetch non-deleted bookings
            ->with('vendors')
            ->get();

        // Check if there are no bookings
        if ($bookings->isEmpty()) {
            return response()->json([
                'bookings' => [],
            ]);
        }

        // Return a JSON response with the bookings and their vendors
        return response()->json([
            'bookings' => $bookings,
        ]);
    }

    public function deleteUserBooking(Request $request, $id)
    {
        // Validate the vendor_id in the request
        $request->validate([
            'vendor_id' => 'required|exists:vendors,id',
        ]);

        $vendorId = $request->vendor_id;

        // Fetch the booking for the given user ID and vendor ID
        $booking = Booking::where('user_id', $id)
            ->whereHas('vendors', function ($query) use ($vendorId) {
                $query->where('vendor_id', $vendorId);
            })
            ->first();

        // Check if the booking exists
        if (!$booking) {
            return response()->json([
                'message' => 'Booking not found for the specified user and vendor.',
            ], 404);
        }

        // Detach the vendor from the booking
        $booking->vendors()->detach($vendorId);

        // Check if the booking still has vendors associated
        if ($booking->vendors()->count() === 0) {
            // If no vendors are left, soft-delete the booking
            $booking->is_deleted = 1;
            $booking->save();
        }

        return response()->json([
            'message' => 'Booking for the specified vendor has been successfully deleted.',
        ]);
    }

    public function getFinalCost($id)
    {
        // Fetch bookings for the given user ID where the status is 'confirmed'
        $bookings = Booking::where('user_id', $id)
            ->where('is_deleted', 0) 
            ->where('status', 'confirmed')
            ->with('vendors')
            ->get();

        // Check if there are no bookings
        if ($bookings->isEmpty()) {
            return response()->json([
                'total_cost' => 0,
            ]);
        }

        $totalCost = 0;
        foreach ($bookings as $booking) {
            Log::info('Vendors for booking ID ' . $booking->id . ': ', $booking->vendors->toArray());

            if ($booking->vendors->isNotEmpty()) {
                $vendor = $booking->vendors->first();
                $totalCost += $vendor->price;
            }
        }

        return response()->json([
            'total_cost' => $totalCost,
        ]);
    }
}
