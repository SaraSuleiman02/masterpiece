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
        // Counts for users, vendors, and bookings
        $usersCount = User::count();
        $vendorsCount = Vendor::count();
        $bookingsCount = Booking::count();

        // Monthly registration data for users and vendors
        $usersMonthly = $this->getMonthlyRegistrations(User::class);
        $vendorsMonthly = $this->getMonthlyRegistrations(Vendor::class);

        return view('dashboard.home', compact('usersCount', 'vendorsCount', 'bookingsCount', 'usersMonthly', 'vendorsMonthly'));
    }

    private function getMonthlyRegistrations($model)
    {
        $monthlyData = [];
        for ($month = 1; $month <= 12; $month++) {
            $monthlyData[date('M', mktime(0, 0, 0, $month, 1))] = $model::whereMonth('created_at', $month)->count();
        }
        return $monthlyData;
    }
}
