<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = Service::where('is_deleted', '0')->get();

        return view('dashboard.service', compact('services'));
    }

    /**
     * Store a newly created resource in storage.
     */
    // app/Http/Controllers/ServiceController.php

    public function store(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,webp|max:2048', // Image validation
        ]);

        try {
            // Check if the image is in the request
            if ($request->hasFile('image')) {
                // Check if the file is valid
                if ($request->file('image')->isValid()) {
                    // Move the image to the correct directory
                    $imageName = time() . '.' . $request->file('image')->getClientOriginalExtension(); // Create a unique name
                    $imagePath = $request->file('image')->move(public_path('assets/images/services'), $imageName);

                    // Create a new service and save it to the database
                    $service = new Service();
                    $service->name = $request->input('name');
                    $service->description = $request->input('description');
                    $service->img_path = 'assets/images/services/' . $imageName; // Save the path
                    $service->save();

                    // Return the new service data to be used on the client-side
                    return response()->json([
                        'message' => 'Service added successfully!',
                        'service' => $service,  // Send the new service data back
                    ]);
                } else {
                    // Image is not valid
                    return response()->json(['error' => 'Invalid image uploaded.'], 400);
                }
            } else {
                // No image provided
                return response()->json(['error' => 'Image is required.'], 400);
            }
        } catch (\Exception $e) {
            // Catch any errors and show them
            return response()->json(['error' => 'Failed to add service: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $service = Service::findOrFail($id);

        // Validate the request
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,webp|max:2048',
        ]);

        // Update the service attributes
        $service->name = $request->name;
        $service->description = $request->description;

        // Handle the image upload if a new image is provided
        if ($request->hasFile('image')) {
            // Remove old image if it exists
            if (file_exists(public_path($service->img_path))) {
                unlink(public_path($service->img_path));
            }

            $imageName = time() . '.' . $request->file('image')->getClientOriginalExtension();
            $imagePath = $request->file('image')->move(public_path('assets/images/services'), $imageName);
            $service->img_path = 'assets/images/services/' . $imageName;
        }

        $service->save();

        return response()->json([
            'message' => 'Service updated successfully.',
            'service' => $service, // Return updated service data
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $service = Service::findOrFail($id);

        // Soft delete by setting is_deleted to 1
        $service->is_deleted = 1;
        $service->save();

        // Return a JSON response
        return response()->json([
            'message' => 'Service deleted successfully!',
        ]);
    }

    // Website functions 
    public function getServices() {
        $services = Service::where('is_deleted', '0')->get();
        return response()->json([
            'services' => $services
        ], 200);
    }
}