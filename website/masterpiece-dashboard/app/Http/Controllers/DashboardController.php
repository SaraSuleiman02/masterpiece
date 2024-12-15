<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Vendor;
use App\Models\Booking;

class DashboardController extends Controller
{

public function index()
{
    $usersCount = User::count();
    $vendorsCount = Vendor::count();
    $bookingsCount = Booking::count();

    return view('dashboard.home', compact('usersCount', 'vendorsCount', 'bookingsCount'));
}

}