@extends('dashboard.layouts.navbar')

@section('content')
<div id="toaster"></div>

<div class="content-wrapper">
    <div class="content">
        <!-- Charts Section -->
        <div class="row">
            <!-- First Chart: Monthly Registrations -->
            <div class="col-6">
                <div class="card card-default">
                    <div class="card-header">
                        <h2>Monthly Registrations</h2>
                    </div>
                    <div class="card-body">
                        <canvas id="registrationChart" style="width: 100%; height: 400px;"></canvas>
                    </div>
                </div>
            </div>

            <!-- Second Chart: Dynamic Data -->
            <div class="col-6">
                <div class="card card-default">
                    <div class="card-header">
                        <h2>Users, Vendors, and Bookings</h2>
                    </div>
                    <div class="card-body">
                        <canvas id="overviewChart" style="width: 100%; height: 400px;"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Include Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
    // First Chart: Monthly Registrations
    const registrationCtx = document.getElementById('registrationChart').getContext('2d');
    const registrationChart = new Chart(registrationCtx, {
        type: 'bar',
        data: {
            labels: {!! json_encode(array_keys($usersMonthly)) !!},
            datasets: [
                {
                    label: 'Users',
                    data: {!! json_encode(array_values($usersMonthly)) !!},
                    backgroundColor: '#36a2eb',
                    borderWidth: 1,
                },
                {
                    label: 'Vendors',
                    data: {!! json_encode(array_values($vendorsMonthly)) !!},
                    backgroundColor: '#ff6384',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });

    // Second Chart: Dynamic Data
    const dynamicCtx = document.getElementById('overviewChart').getContext('2d');
    const dynamicChart = new Chart(dynamicCtx, {
        type: 'bar',
        data: {
            labels: ['Users', 'Vendors', 'Bookings'],
            datasets: [
                {
                    label: 'Count',
                    data: [{{ $usersCount }}, {{ $vendorsCount }}, {{ $bookingsCount }}],
                    backgroundColor: ['#f35991', '#c1a2ea', '#9bbafd'],
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
            },
        },
    });

    // Debugging Output
    console.log("Users Monthly:", {!! json_encode($usersMonthly) !!});
    console.log("Vendors Monthly:", {!! json_encode($vendorsMonthly) !!});
    console.log("Users Count:", {{ $usersCount }});
    console.log("Vendors Count:", {{ $vendorsCount }});
    console.log("Bookings Count:", {{ $bookingsCount }});
</script>
@endsection
