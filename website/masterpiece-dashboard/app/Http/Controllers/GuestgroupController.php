<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Guestgroup;

class GuestgroupController extends Controller
{
    /**
     * Create a new guest group.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $guestgroup = Guestgroup::create($validated);
        return response()->json($guestgroup, 201);
    }

    /**
     * Retrieve a guest group.
     */
    public function show()
    {
        $guestgroup = Guestgroup::get();
        return response()->json($guestgroup);
    }
}
