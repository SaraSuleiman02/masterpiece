<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserDetail;
use App\Models\User;


class UserDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch all user details where `is_deleted` is 0
        $userDetails = UserDetail::where('is_deleted', 0)->get();
        $users = User::where('is_deleted', 0)->get();

        return view('dashboard.user-detail', compact('userDetails', 'users'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'partner_name' => 'required|string|max:255',
            'event_type' => 'required|array',
            'event_type.*' => 'in:pre-wedding,wedding,honeymoon',
            'event_date' => 'required|date|after:today',
            'budget' => 'required|numeric|min:0',
            'vendors_needed' => 'required|string',
            'city' => 'required|in:Amman,Zarqa,Irbid,Aqaba,Mafraq,Jerash,Madaba,Ajloun,Salt,Karak,Tafilah,Ma’an',
        ]);

        // Combine the event types into a single string
        $eventType = implode(',', $request->event_type);

        // Create the user detail
        $userDetail = UserDetail::create([
            'user_id' => $request->user_id,
            'partner_name' => $request->partner_name,
            'event_type' => $eventType,
            'event_date' => $request->event_date,
            'budget' => $request->budget,
            'vendors_needed' => $request->vendors_needed,
            'city' => $request->city,
        ]);

        // Return a JSON response
        return response()->json([
            'message' => 'User detail added successfully!',
            'userDetail' => $userDetail,
        ]);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $userDetail = UserDetail::findOrFail($id);

        $request->validate([
            'partner_name' => 'required|string|max:255',
            'event_type' => 'required|array',
            'event_type.*' => 'in:pre-wedding,wedding,honeymoon',
            'event_date' => 'required|date|after:today',
            'budget' => 'required|numeric|min:0',
            'vendors_needed' => 'required|string',
            'city' => 'required|in:Amman,Zarqa,Irbid,Aqaba,Mafraq,Jerash,Madaba,Ajloun,Salt,Karak,Tafilah,Ma’an',
        ]);

        // Convert event_type array to a comma-separated string
        $eventTypeString = implode(',', $request->event_type);

        // Update the user detail
        $userDetail->update([
            'partner_name' => $request->partner_name,
            'event_type' => $eventTypeString,
            'event_date' => $request->event_date,
            'budget' => $request->budget,
            'city' => $request->city,
            'user_id' => $request->user_id,
        ]);

        return response()->json(['message' => 'User detail updated successfully.']);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $userDetail = UserDetail::findOrFail($id);

        // Soft delete by setting is_deleted to 1
        $userDetail->is_deleted = 1;
        $userDetail->save();

        return response()->json([
            'message' => 'User detail deleted successfully!',
        ]);
    }

    public function getVendors($id)
    {
        $userDetail = UserDetail::where('user_id', $id)->first();

        if (!$userDetail) {
            return response()->json([
                'status' => false,
                'message' => 'User details are not found!'
            ]);
        }

        // Convert the vendors_needed string to an array
        $vendorsNeeded = array_map('trim', explode(',', $userDetail->vendors_needed));

        return response()->json([
            'status' => true,
            'message' => 'Vendors needed are found!',
            'vendors' => $vendorsNeeded
        ]);
    }

    public function getEventDate($id)
    {
        $userDetail = UserDetail::where('user_id', $id)->first();

        if (!$userDetail) {
            return response()->json([
                'status' => false,
                'message' => 'User details are not found!'
            ]);
        }

        // Convert the vendors_needed string to an array
        $eventDate = $userDetail->event_date;

        return response()->json([
            'status' => true,
            'message' => 'Vendors needed are found!',
            'date' => $eventDate
        ]);
    }

    public function addVendors(Request $request, $id) {
        $userDetail = UserDetail::where('user_id', $id)->first();

        if (!$userDetail) {
            return response()->json([
                'status' => false,
                'message' => 'User details are not found!'
            ]);
        }
        $vendors_needed = implode(',', $request->vendors);
        $userDetail->update([
           'vendors_needed' => $vendors_needed, 
        ]);
        return response()->json(['message' => 'Vendors updated successfully.']);
    }
}
