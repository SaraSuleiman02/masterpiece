<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Wishlist;
use App\Models\Vendor;
use App\Models\User;

class WishlistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $wishlists = Wishlist::with('vendors')
            ->where('is_deleted', 0)
            ->get();
        $vendors = Vendor::where('is_deleted', 0)->get();
        $users = User::where('is_deleted', 0)->get();

        return view('dashboard.wishlist', compact('wishlists', 'vendors', 'users'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'vendor_id' => 'required|array', // Ensure vendor_id is an array for multiple vendors
            'vendor_id.*' => 'exists:vendors,id', // Ensure each vendor exists
        ]);

        // Create a new Wishlist or find an existing one for the user
        $wishlist = Wishlist::updateOrCreate(
            ['user_id' => $request->user_id],
            ['is_deleted' => 0] // Prevent accidental deletion if the wishlist exists
        );

        // Sync the vendors in the pivot table
        $wishlist->vendors()->sync($request->vendor_id);

        return response()->json([
            'message' => 'Wishlist updated successfully!',
            'wishlist' => $wishlist->load('vendors'), // Return the wishlist with the vendors
        ]);
    }
}