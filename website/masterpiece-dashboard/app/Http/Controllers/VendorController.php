<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vendor;
use App\Models\Service;

class VendorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $vendors = Vendor::where('is_deleted', 0)->get();
        $services = Service::where('is_deleted', 0)->get();

        return view('dashboard.vendor', compact('vendors', 'services'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        // Validate the request
        $request->validate([
            'name' => 'required|string|max:255',
            'service_id' => 'required|exists:services,id',
            'location' => 'required|string|min:10',
            'about' => 'required|string',
            'price' => 'required|numeric|min:0',
        ]);

        // Create the Vendor
        $vendor = Vendor::create([
            'name' => $request->name,
            'service_id' => $request->service_id,
            'location' => $request->location,
            'about' => $request->about,
            'price' => $request->price,
        ]);

        // Return a JSON response
        return response()->json([
            'message' => 'Vendor added successfully!',
            'vendor' => $vendor,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {
        $vendor = Vendor::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'service_id' => 'required|exists:services,id',
            'location' => 'required|string|min:10',
            'about' => 'required|string',
            'price' => 'required|numeric|min:0',
        ]);

        // Update the vendor
        $vendor->update($request->all());

        return response()->json(['message' => 'Vendor updated successfully.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        $vendor = Vendor::findOrFail($id);

        // Soft delete by setting is_deleted to 1
        $vendor->is_deleted = 1;
        $vendor->save();

        return response()->json([
            'message' => 'Vendor deleted successfully!',
        ]);
    }

    // Functions for website
    public function getAllVendors() {
        $vendors = Vendor::where('is_deleted', 0)->get();
        return response()->json([
            'status' => true,
            'message' => 'Vendors data',
            'vendors' => $vendors
        ]);
    }
    public function getVendorsByService($serviceId) {
        $vendors = Vendor::where('service_id', $serviceId)->where('is_deleted', 0)->get();
        return response()->json([
            'status' => true,
            'message' => 'Vendors data',
            'vendors' => $vendors
        ]);
    }
}