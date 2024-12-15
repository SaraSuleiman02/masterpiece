<?php

namespace App\Http\Controllers;

use App\Models\Guestlist;
use Illuminate\Http\Request;

class GuestlistController extends Controller
{
    /**
     * Retrieve the guestlist data along with the guestgroup name.
     */
    public function index($id)
    {
        $guestlists = Guestlist::with('guestGroup')->where('user_id', $id) -> get();

        if (!$guestlists) {
            return response()->json([
                'status' => false,
                'message' => 'There are no guests, add guests!'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'Guestlist data',
            'guestlists' => $guestlists
        ]);
    }

    /**
     * Create a new guestlist.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'name' => 'required|string|max:255',
            'attendance' => 'required|in:Attending,Pending,Cancelled',
            'guestGroup_id' => 'required|exists:guestgroups,id',
        ]);

        $guestlist = Guestlist::create($validated);
        return response()->json([
            'message' => 'Guest added successfully',
            'guestlist' => $guestlist
        ], 201);
    }

    /**
     * Edit the name, attendance, and guestGroup_id of a guestlist.
     */
    public function update(Request $request, $guestlist_id)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'attendance' => 'sometimes|required|in:Attending,Pending,Cancelled',
            'guestGroup_id' => 'sometimes|required|exists:guestgroups,id',
        ]);

        $guestlist = Guestlist::findOrFail($guestlist_id);

        if ($request->has('name')){
            $guestlist->name = $request->name;
        }
        if ($request->has('attendance')){
            $guestlist->attendance = $request->attendance;
        }
        if ($request->has('guestGroup_id')){
            $guestlist->guestGroup_id = $request->guestGroup_id;
        }

        $guestlist->save();

        return response()->json([
            'status' => true,
            'message' => 'Guest Info updated successfully!',
            'user' => $guestlist
        ]);
    }

    /**
     * Delete a guestlist.
     */
    public function destroy($guestlistId)
    {
        $guestlist = Guestlist::findOrFail($guestlistId);
        $guestlist->delete();
        return response()->json(['message' => 'Guestlist deleted successfully.']);
    }
}
