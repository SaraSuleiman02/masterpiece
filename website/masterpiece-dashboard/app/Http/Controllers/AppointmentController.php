<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class AppointmentController extends Controller
{
    // Store appointment from React front
    public function storeFromReact(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'date' => 'required|date|after:today', // Ensure date is after today
            'time' => 'required|date_format:H:i',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $userId = $request->user_id;
        $date = $request->date;
        $time = $request->time;

        // Check if the user already has a future or current appointment
        $existingAppointment = Appointment::where('user_id', $userId)
            ->where('date', '>=', Carbon::today())
            ->orderBy('date', 'desc')
            ->first();

        if ($existingAppointment) {
            $formattedDate = Carbon::parse($existingAppointment->date)->format('Y-m-d');
            return response()->json([
                'message' => "You already have an appointment on $formattedDate. Please complete or cancel it before booking a new one."
            ], 400);
        }

        // Check if the same date and time already exist
        $appointmentExists = Appointment::where('date', $date)
            ->where('time', $time)
            ->exists();

        if ($appointmentExists) {
            return response()->json(['message' => 'This time slot is already booked. Please choose a different date or time.'], 400);
        }

        // Create a new appointment
        $appointment = Appointment::create([
            'user_id' => $userId,
            'date' => $date,
            'time' => $time,
        ]);

        return response()->json([
            'message' => 'Appointment booked successfully.',
            'appointment' => $appointment
        ]);
    }



    // Store appointment from admin dashboard
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $date = $request->date;
        $time = $request->time;

        $existingAppointment = Appointment::where('date', $date)->where('time', $time)->first();
        if ($existingAppointment) {
            return response()->json(['message' => 'This time is already booked. Please choose another time.'], 400);
        }

        $appointment = Appointment::create([
            'user_id' => $request->user_id,
            'date' => $date,
            'time' => $time,
        ]);

        return response()->json(['message' => 'Appointment added successfully.', 'appointment' => $appointment]);
    }

    // Retrieve all appointments
    public function index()
    {
        $appointments = Appointment::all();
        return response()->json(['appointments' => $appointments]);
    }

    // Retrieve a specific user's appointments
    public function userAppointments($userId)
    {
        $appointments = Appointment::where('user_id', $userId)->get();
        if ($appointments->isEmpty()) {
            return response()->json(['message' => 'No appointments found for this user.'], 404);
        }

        return response()->json(['appointments' => $appointments]);
    }

    // Delete an appointment
    public function destroy($id)
    {
        $appointment = Appointment::find($id);

        if (!$appointment) {
            return response()->json(['message' => 'Appointment not found.'], 404);
        }

        $appointment->delete();

        return response()->json(['message' => 'Appointment deleted successfully.']);
    }
}
