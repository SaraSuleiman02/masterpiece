<?php

namespace App\Http\Controllers\APIControllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->only(['profile', 'logout']);
    }

    // public function register(Request $request)
    // {
    //     // Create custom validator instance
    //     $validator = Validator::make($request->all(), [
    //         'name' => 'required|string|max:255',
    //         'email' => 'required|email|unique:users,email|max:255',
    //         'password' => 'required|confirmed|min:8',
    //         'phone' => 'required|regex:/^07[789]\d{7}$/',
    //         'dob' => 'required|date|before:18 years ago',
    //     ], [
    //         // Custom messages
    //         'name.required' => 'The name field is required.',
    //         'name.string' => 'The name must be a valid string.',
    //         'name.max' => 'The name may not be greater than 255 characters.',

    //         'email.required' => 'The email field is required.',
    //         'email.email' => 'Please provide a valid email address.',
    //         'email.unique' => 'This email is already taken. Please choose another.',
    //         'email.max' => 'The email may not be greater than 255 characters.',

    //         'password.required' => 'The password field is required.',
    //         'password.confirmed' => 'Password confirmation does not match.',
    //         'password.min' => 'The password must be at least 8 characters long.',

    //         'phone.required' => 'The phone number field is required.',
    //         'phone.regex' => 'The phone number must be valid, starting with 07 and followed by 7 digits.',

    //         'dob.required' => 'The date of birth field is required.',
    //         'dob.date' => 'Please provide a valid date of birth.',
    //         'dob.before' => 'You must be at least 18 years old.',
    //     ]);

    //     // Check if validation failed
    //     if ($validator->fails()) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'Validation failed.',
    //             'errors' => $validator->errors(),
    //         ], 422); // Return the errors with a 422 status
    //     }

    //     // Create user if validation passes
    //     $user = User::create([
    //         'name' => $request->name,
    //         'email' => $request->email,
    //         'password' => Hash::make($request->password),
    //         'phone' => $request->phone,
    //         'dob' => $request->dob,
    //     ]);

    //     // Return response with user data (excluding sensitive password)
    //     return response()->json([
    //         'status' => true,
    //         'message' => 'User registered successfully',
    //         'user' => [
    //             'id' => $user->id,
    //             'name' => $user->name,
    //             'email' => $user->email,
    //             'phone' => $user->phone,
    //             'dob' => $user->dob,
    //         ],
    //     ]);
    // }


    public function register(Request $request)
    {
        // Create custom validator instance
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email|max:255',
            'password' => 'required|confirmed|min:8',
            'phone' => 'required|regex:/^07[789]\d{7}$/',
            'dob' => 'required|date|before:18 years ago',
            'partner_name' => 'required|string|max:255',
            'event_type' => 'required|array',
            'event_type.*' => 'in:pre-wedding,wedding,honeymoon',
            'event_date' => 'required|date|after:today',
            'budget' => 'required|numeric|min:0',
            'vendors_needed' => 'required|string',
            'city' => 'required|in:Amman,Zarqa,Irbid,Aqaba,Mafraq,Jerash,Madaba,Ajloun,Salt,Karak,Tafilah,Ma’an',
        ], [
            // Custom error messages for user fields
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

            // Custom error messages for user_details fields
            'partner_name.required' => 'The partner name field is required.',
            'partner_name.string' => 'The partner name must be a valid string.',
            'partner_name.max' => 'The partner name may not be greater than 255 characters.',

            'event_type.required' => 'The event type field is required.',
            'event_type.array' => 'The event type must be an array.',
            'event_type.*.in' => 'Each event type must be one of the following: pre-wedding, wedding, honeymoon.',

            'event_date.required' => 'The event date field is required.',
            'event_date.date' => 'Please provide a valid event date.',
            'event_date.after' => 'The event date must be after today.',

            'budget.required' => 'The budget field is required.',
            'budget.numeric' => 'The budget must be a valid number.',
            'budget.min' => 'The budget must be at least 0.',

            'vendors_needed.required' => 'The vendors needed field is required.',

            'city.required' => 'The city field is required.',
            'city.in' => 'The city must be one of the following: Amman, Zarqa, Irbid, Aqaba, Mafraq, Jerash, Madaba, Ajloun, Salt, Karak, Tafilah, Ma’an.',
        ]);

        // Check if validation failed
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed.',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            // Create the user if validation passes
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone' => $request->phone,
                'dob' => $request->dob,
            ]);

            // Prepare the data for the user details
            $eventType = implode(',', $request->event_type);

            // Create the user detail record
            $userDetail = UserDetail::create([
                'user_id' => $user->id,  // Link the user detail with the created user
                'partner_name' => $request->partner_name,
                'event_type' => $eventType,
                'event_date' => $request->event_date,
                'budget' => $request->budget,
                'vendors_needed' => $request->vendors_needed,
                'city' => $request->city,
            ]);

            $token = $user->createToken('myToken')->plainTextToken;

            // Return the response with both user and user detail data
            return response()->json([
                'status' => true,
                'message' => 'User registered successfully!',
                'token' => $token,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'dob' => $user->dob,
                ],
                'userDetail' => $userDetail,
            ]);
        } catch (\Exception $e) {
            // Log the exception for debugging
            Log::error('Error during registration: ' . $e->getMessage());

            // Return error message
            return response()->json([
                'status' => false,
                'message' => 'An error occurred while registering the user.',
                'error' => $e->getMessage(),
            ], 500);
        }
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
        if ($user = $request->user()) {
            $currentAccessToken = $user->currentAccessToken();

            if ($currentAccessToken) {
                $currentAccessToken->delete();

                return response()->json([
                    'status' => true,
                    'message' => 'Logged out successfully',
                ], 200);
            }

            return response()->json([
                'status' => false,
                'message' => 'No active session found',
            ], 400);
        }

        return response()->json([
            'status' => false,
            'message' => 'No authenticated user found',
        ], 401);
    }
}
