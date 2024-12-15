<?php

namespace App\Http\Controllers\APIControllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->only(['profile', 'logout']);
    }

    public function register(Request $request)
    {
        // Create custom validator instance
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email|max:255',
            'password' => 'required|confirmed|min:8',
            'phone' => 'required|regex:/^07[789]\d{7}$/',
            'dob' => 'required|date|before:18 years ago',
        ], [
            // Custom messages
            'name.required' => 'The name field is required.',
            'name.string' => 'The name must be a valid string.',
            'name.max' => 'The name may not be greater than 255 characters.',

            'email.required' => 'The email field is required.',
            'email.email' => 'Please provide a valid email address.',
            'email.unique' => 'This email is already taken. Please choose another.',
            'email.max' => 'The email may not be greater than 255 characters.',

            'password.required' => 'The password field is required.',
            'password.confirmed' => 'Password confirmation does not match.',
            'password.min' => 'The password must be at least 8 characters long.',

            'phone.required' => 'The phone number field is required.',
            'phone.regex' => 'The phone number must be valid, starting with 07 and followed by 7 digits.',

            'dob.required' => 'The date of birth field is required.',
            'dob.date' => 'Please provide a valid date of birth.',
            'dob.before' => 'You must be at least 18 years old.',
        ]);

        // Check if validation failed
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
            ], 422); // Return the errors with a 422 status
        }

        // Create user if validation passes
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'dob' => $request->dob,
        ]);

        // Return response with user data (excluding sensitive password)
        return response()->json([
            'status' => true,
            'message' => 'User registered successfully',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'dob' => $user->dob,
            ],
        ]);
    }


    public function login(Request $request)
    {
        // Validation for login
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user) {
            // Check if password matches
            if (Hash::check($request->password, $user->password)) {
                // Create token
                $token = $user->createToken('myToken')->plainTextToken;

                return response()->json([
                    'status' => true,
                    'message' => 'Login successful',
                    'token' => $token,
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                    ],
                ]);
            }
            return response()->json([
                'status' => false,
                'message' => 'Password did not match'
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'Invalid login credentials'
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
}
