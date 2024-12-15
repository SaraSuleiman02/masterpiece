<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\UserDetail;

class UserController extends Controller
{
    public function index()
    {
        $users = User::where('is_deleted', 0)->paginate(5);

        return view('dashboard.user', compact('users'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8', // Default password
            'phone' => ['regex:/^07[789]\d{7}$/'],
            'dob' => 'date|before:18 years ago',
            'role' => 'string|max:50',
        ]);

        // Create the user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password), // Hash the password
            'phone' => $request->phone,
            'role' => $request->role,
        ]);

        // Return a JSON response
        return response()->json([
            'message' => 'User added successfully!',
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string|unique:users,email,|max:255',
            'email' => 'required|email|max:255',
            'phone' => [
                'required',
                'regex:/^07[789]\d{7}$/',
            ],
            'role' => 'required|string|max:50',
        ]);

        $user->update($request->all());

        return response()->json(['message' => 'User updated successfully.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);

        // Soft delete by setting is_deleted to 1
        $user->is_deleted = 1;
        $user->save();

        // Return a JSON response
        return response()->json([
            'message' => 'User deleted successfully!',
        ]);
    }

    // Functions for Admin Profile
    public function adminProfile()
    {
        $id = Auth::id();
        // Get the user data from the database based on the ID
        $userData = User::find($id);

        if (!$userData) {
            return redirect()->route('login')->with('error', 'User not found. Please log in again.');
        }

        return view('dashboard.profile', compact('userData'));
    }

    public function updateInfo(Request $request)
    {
        $id = Auth::id();
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'string|max:255',
            'email' => 'email|max:255|unique:users,email,',
        ]);

        $user->update($request->all());
        return response()->json(['success' => 'Profile updated successfully!']);
    }

    public function updatePassword(Request $request)
    {
        $id = Auth::id();
        $user = User::findOrFail($id);

        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:8|confirmed',
        ]);


        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['error' => 'Current password is incorrect'], 422);
        }

        $user->password = Hash::make($request->new_password);
        $user->update($request->all());

        return response()->json(['success' => 'Password updated successfully!']);
    }

    // Functions for user Profile
    public function userProfile($id)
    {
        $user = User::with('userDetail')->find($id);

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'message' => 'User profile data',
            'user' => $user
        ]);
    }

    public function updateUserProfile(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found'
            ], 404);
        }

        // Validate input for user
        $request->validate([
            'name' => 'sometimes|string',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'phone' => [
                'sometimes',
                'regex:/^07[789]\d{7}$/',
            ],
            'dob' => 'sometimes|date|before:18 years ago',
        ]);

        // Update user details
        if ($request->has('name')) {
            $user->name = $request->name;
        }
        if ($request->has('email')) {
            $user->email = $request->email;
        }
        if ($request->has('password')) {
            $user->password = Hash::make($request->password);
        }
        if ($request->has('phone')) {
            $user->phone = $request->phone;
        }
        if ($request->has('dob')) {
            $user->dob = $request->dob;
        }

        $user->save();

        // Update user detail if exists, or create a new one if not
        $userDetail = $user->userDetail; // Check if the user detail exists

        if ($userDetail) {
            // If the user detail exists, update it
            if ($request->has('partner_name')) {
                $userDetail->partner_name = $request->partner_name;
            }
            if ($request->has('event_type')) {
                $userDetail->event_type = $request->event_type;
            }
            if ($request->has('budget')) {
                $userDetail->budget = $request->budget;
            }
            if ($request->has('city')) {
                $userDetail->city = $request->city;
            }

            $userDetail->save();
        } else {
            // If the user detail doesn't exist, create a new one
            $userDetail = new UserDetail();

            $userDetail->user_id = $user->id;
            $userDetail->partner_name = $request->partner_name ?? '';
            $userDetail->event_type = $request->event_type ?? 'wedding';
            $userDetail->budget = $request->budget ?? 0.00;
            $userDetail->city = $request->city ?? 'Amman';
            $userDetail->is_deleted = 0;

            $userDetail->save();
        }

        return response()->json([
            'status' => true,
            'message' => 'User and user details updated successfully',
            'user' => $user,
            'user_detail' => $userDetail
        ]);
    }

    public function updateUserPassword(Request $request, $id)
    {
        $user = User::findOrFail($id);

        // Create a Validator instance for custom validation
        $validator = Validator::make($request->all(), [
            'current_password' => 'required',
            'new_password' => 'required|min:8|confirmed',
        ], [
            'current_password.required' => 'The current password is required.',
            'new_password.required' => 'The new password is required.',
            'new_password.min' => 'The new password must be at least 8 characters.',
            'new_password.confirmed' => 'The new password confirmation does not match.',
        ]);

        // Check for validation failures
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation errors occurred.',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Check if the current password matches
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'status' => false,
                'message' => 'Current password is incorrect.',
            ], 422);
        }

        // Update the user's password
        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'Password updated successfully!',
        ]);
    }
}
