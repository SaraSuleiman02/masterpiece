<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Wishlist;
use App\Models\Vendor;
use App\Models\User;

class WishlistController extends Controller
{
    // wishlist functions for dashboard
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

    // wishlist functions for the website
    public function getWishlist(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        // Get the user's wishlist with vendors
        $wishlists = Wishlist::where('user_id', $validated['user_id'])
            ->with('vendors')
            ->get();

        return response()->json([
            'wishlists' => $wishlists
        ], 200);
    }

    public function toggleWishlist(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'vendor_id' => 'required|exists:vendors,id',
        ]);

        // Find or create the wishlist for the user
        $wishlist = Wishlist::firstOrCreate(
            ['user_id' => $validated['user_id'], 'is_deleted' => 0]
        );

        // Check if the vendor is already in the wishlist
        $vendorExists = $wishlist->vendors()->where('vendor_id', $validated['vendor_id'])->exists();

        if ($vendorExists) {
            // If the vendor is already in the wishlist, detach it
            $wishlist->vendors()->detach($validated['vendor_id']);
            return response()->json([
                'message' => 'Vendor removed from wishlist successfully',
                'isFavorite' => false
            ], 200);
        }

        // If the vendor is not in the wishlist, attach it
        $wishlist->vendors()->attach($validated['vendor_id']);
        return response()->json([
            'message' => 'Vendor added to wishlist successfully',
            'isFavorite' => true
        ], 201);
    }

    public function isInWishlist(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'vendor_id' => 'required|exists:vendors,id',
        ]);

        // Check if the vendor is in the user's wishlist
        $isFavorite = Wishlist::where('user_id', $validated['user_id'])
            ->whereHas('vendors', function ($query) use ($validated) {
                $query->where('vendor_id', $validated['vendor_id']);
            })
            ->exists();

        return response()->json([
            'isFavorite' => $isFavorite
        ], 200);
    }
}
