@extends('dashboard.layouts.navbar')

@section('content')
    <div id="toaster"></div>

    <div class="content-wrapper">
        <div class="content">
            <!-- Top Statistics Section -->
            <div class="row">
                <div class="col-xl-3 col-sm-6">
                    <div class="card card-default card-mini">
                        <div class="card-header">
                            <h2>{{ $usersCount }}</h2>
                            
                            <div class="sub-title">
                                <span class="mr-1">Users</span> |
                                <span class="mx-1">20%</span>
                                <i class="mdi mdi-arrow-up-bold text-success"></i>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="chart-wrapper">
                                <div>
                                    <div id="spline-area-1"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6">
                    <div class="card card-default card-mini">
                        <div class="card-header">
                            <h2>1,500 JD</h2>
                            <div class="sub-title">
                                <span class="mr-1">Expense of this year</span> |
                                <span class="mx-1">50%</span>
                                <i class="mdi mdi-arrow-down-bold text-danger"></i>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="chart-wrapper">
                                <div>
                                    <div id="spline-area-2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6">
                    <div class="card card-default card-mini">
                        <div class="card-header">
                            <h2>4,199 JD</h2>
                            <div class="sub-title">
                                <span class="mr-1">Profit of this year</span> |
                                <span class="mx-1">20%</span>
                                <i class="mdi mdi-arrow-down-bold text-danger"></i>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="chart-wrapper">
                                <div>
                                    <div id="spline-area-3"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-sm-6">
                    <div class="card card-default card-mini">
                        <div class="card-header">
                            <h2>{{ $vendorsCount }}</h2>
                            <div class="sub-title">
                                <span class="mr-1">Vendors</span> |
                                <span class="mx-1">35%</span>
                                <i class="mdi mdi-arrow-up-bold text-success"></i>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="chart-wrapper">
                                <div>
                                    <div id="spline-area-4"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Charts Section -->
            <div class="row">
                <!-- First Chart: Static Data -->
                <div class="col-6">
                    <div class="card card-default">
                        <div class="card-header">
                            <h2>Expenses and Profit</h2>
                        </div>
                        <div class="card-body">
                            <canvas id="staticChart" style="width: 100%; height: 400px;"></canvas>
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
        // First Chart: Static Data
        const staticCtx = document.getElementById('staticChart').getContext('2d');
        const staticChart = new Chart(staticCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                        label: 'Expenses',
                        data: [500, 400, 450, 480, 500, 520, 510, 530, 540, 550, 570, 600],
                        borderColor: '#ff6384',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: true,
                    },
                    {
                        label: 'Profit',
                        data: [700, 680, 720, 750, 740, 760, 780, 800, 810, 830, 850, 900],
                        borderColor: '#36a2eb',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        fill: true,
                    }
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
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
                datasets: [{
                    label: 'Count',
                    data: [{{ $usersCount }}, {{ $vendorsCount }}, {{ $bookingsCount }}],
                    backgroundColor: ['#f35991', '#c1a2ea', '#9bbafd'],
                    borderWidth: 1,
                }, ],
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
        console.log("Users Count:", {{ $usersCount }});
        console.log("Vendors Count:", {{ $vendorsCount }});
        console.log("Bookings Count:", {{ $bookingsCount }});
    </script>
@endsection
