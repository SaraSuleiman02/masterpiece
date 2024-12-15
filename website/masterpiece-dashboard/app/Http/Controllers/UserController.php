<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::where('is_deleted',0)->paginate(5);

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
    public function adminProfile(){
        $id = Auth::id();
        // dd($id);
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
            'email' => 'email|max:255|unique:users,email,' ,
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
}