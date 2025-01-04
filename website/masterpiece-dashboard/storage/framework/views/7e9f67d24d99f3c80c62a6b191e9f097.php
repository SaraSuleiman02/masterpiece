<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Admin Dashboard</title>

    <!-- GOOGLE FONTS -->
    <link href="https://fonts.googleapis.com/css?family=Karla:400,700|Roboto" rel="stylesheet">
    <link href="<?php echo e(asset('assets/plugins/material/css/materialdesignicons.min.css')); ?>" rel="stylesheet" />
    <link href="<?php echo e(asset('assets/plugins/simplebar/simplebar.css')); ?>" rel="stylesheet" />
    <!-- PLUGINS CSS STYLE -->
    <link href="<?php echo e(asset('assets/plugins/nprogress/nprogress.css')); ?>" rel="stylesheet" />
    <link href="<?php echo e(asset('assets/plugins/DataTables/DataTables-1.10.18/css/jquery.dataTables.min.css')); ?>"
        rel="stylesheet" />
    <link href="<?php echo e(asset('assets/plugins/jvectormap/jquery-jvectormap-2.0.3.css')); ?>" rel="stylesheet" />
    <link href="<?php echo e(asset('assets/plugins/daterangepicker/daterangepicker.css')); ?>" rel="stylesheet" />
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
    <link href="<?php echo e(asset('assets/plugins/toaster/toastr.min.css')); ?>" rel="stylesheet" />
    <!-- MONO CSS -->
    <link id="main-css-href" rel="stylesheet" href="<?php echo e(asset('assets/css/style.css')); ?>" />
    <!-- FAVICON -->
    <link href="<?php echo e(asset('assets/images/logo.png')); ?>" rel="shortcut icon" />
    <script src="<?php echo e(asset('assets/plugins/nprogress/nprogress.js')); ?>"></script>
    <!-- SweetAlert2 -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.6.2/css/bootstrap.min.css">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.6.2/js/bootstrap.bundle.min.js"></script>
    <!-- Include DataTables CSS and JS -->
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css">
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js">
    </script>

    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

</head>

<body class="navbar-fixed sidebar-fixed" id="body">
    <script>
        NProgress.configure({
            showSpinner: false
        });
        NProgress.start();
    </script>

    <div class="wrapper">

        
        <aside class="left-sidebar sidebar-dark" id="left-sidebar">
            <div id="sidebar" class="sidebar sidebar-with-footer">
                <!-- Aplication Brand -->
                <div class="app-brand">
                    <a href="<?php echo e(route('dashboard.home')); ?>">
                        <img src="<?php echo e(asset('assets/images/logo.png')); ?>" alt="Lumora">
                    </a>
                </div>
                <!-- begin sidebar scrollbar -->
                <div class="sidebar-left" data-simplebar style="height: 100%;">
                    <!-- sidebar menu -->
                    <ul class="nav sidebar-inner" id="sidebar-menu">
                        <li class="<?php echo e(request()->routeIs('dashboard.home') ? 'active' : ''); ?>">
                            <a class="sidenav-item-link" href="<?php echo e(route('dashboard.home')); ?>">
                                <i class="mdi mdi-briefcase-account-outline"></i>
                                <span class="nav-text">Dashboard</span>
                            </a>
                        </li>

                        <li class="section-title">
                            Tables
                        </li>

                        <li class="<?php echo e(request()->routeIs('dashboard.user') ? 'active' : ''); ?>">
                            <a class="sidenav-item-link" href="<?php echo e(route('dashboard.user')); ?>">
                                <i class="mdi mdi-account-group"></i>
                                <span class="nav-text">Users</span>
                            </a>
                        </li>

                        <li class="<?php echo e(request()->routeIs('dashboard.user_details') ? 'active' : ''); ?>">
                            <a class="sidenav-item-link" href="<?php echo e(route('dashboard.user_details')); ?>">
                                <i class="mdi mdi-account-card-details"></i>
                                <span class="nav-text">User Details</span>
                            </a>
                        </li>

                        <li class="<?php echo e(request()->routeIs('dashboard.service') ? 'active' : ''); ?>">
                            <a class="sidenav-item-link" href="<?php echo e(route('dashboard.service')); ?>">
                                <i class="mdi mdi-briefcase-check"></i>
                                <span class="nav-text">Services</span>
                            </a>
                        </li>

                        <li class="<?php echo e(request()->routeIs('dashboard.vendor') ? 'active' : ''); ?>">
                            <a class="sidenav-item-link" href="<?php echo e(route('dashboard.vendor')); ?>">
                                <i class="mdi mdi-human-greeting"></i>
                                <span class="nav-text">Vendors</span>
                            </a>
                        </li>

                        <li class="<?php echo e(request()->routeIs('dashboard.booking') ? 'active' : ''); ?>">
                            <a class="sidenav-item-link" href="<?php echo e(route('dashboard.booking')); ?>">
                                <i class="mdi mdi-calendar-check"></i>
                                <span class="nav-text">User Bookings</span>
                            </a>
                        </li>

                        <li class="<?php echo e(request()->routeIs('dashboard.appointment') ? 'active' : ''); ?>">
                            <a class="sidenav-item-link" href="<?php echo e(route('dashboard.appointment')); ?>">
                                <i class="mdi mdi-calendar-outline"></i>
                                <span class="nav-text">Appointments</span>
                            </a>
                        </li>

                        <li class="<?php echo e(request()->routeIs('dashboard.wishlist') ? 'active' : ''); ?>">
                            <a class="sidenav-item-link" href="<?php echo e(route('dashboard.wishlist')); ?>">
                                <i class="mdi mdi-heart"></i>
                                <span class="nav-text">User Wishlist</span>
                            </a>
                        </li>

                        <li class="<?php echo e(request()->routeIs('dashboard.contacts') ? 'active' : ''); ?>">
                            <a class="sidenav-item-link" href="<?php echo e(route('dashboard.contacts')); ?>">
                                <i class="mdi mdi-phone"></i>
                                <span class="nav-text">Contact Us</span>
                            </a>
                        </li>

                    </ul>
                </div>
            </div>
        </aside>

        
        <div class="page-wrapper">
            <!-- Header -->
            <header class="main-header" id="header">
                <nav class="navbar navbar-expand-lg navbar-light" id="navbar">
                    <!-- Sidebar toggle button -->
                    <button id="sidebar-toggler" class="sidebar-toggle">
                        <span class="sr-only">Toggle navigation</span>
                    </button>

                    <span class="page-title">dashboard</span>

                    <div class="navbar-right ">
                        <ul class="nav navbar-nav">
                            <!-- User Account -->
                            <li class="dropdown user-menu">
                                <button class="dropdown-toggle nav-link" data-toggle="dropdown">
                                    <img src="<?php echo e(asset('assets/images/user/user.jpg')); ?>"
                                        class="user-image rounded-circle" alt="User Image" />
                                    
                                </button>
                                <ul class="dropdown-menu dropdown-menu-right">
                                    <li>
                                        <a class="dropdown-link-item" href="<?php echo e(route('dashboard.profile')); ?>">
                                            <i class="mdi mdi-account-outline"></i>
                                            <span class="nav-text">My Profile</span>
                                        </a>
                                    </li>

                                    <li class="dropdown-footer">
                                        <form method="POST" action="<?php echo e(route('logout')); ?>" id="logout-form">
                                            <?php echo csrf_field(); ?>
                                            <a href="#" class="dropdown-link-item"
                                                onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                                <i class="mdi mdi-logout"></i> Log Out
                                            </a>
                                        </form>
                                    </li>

                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>


            </header>

            <div class="content-wrapper">
                <?php echo $__env->yieldContent('profile-header'); ?>
                <?php echo $__env->yieldContent('content'); ?>

            </div>

            <!-- Footer -->
            <footer class="footer mt-auto">
                <div class="copyright bg-white">
                    <p>
                        &copy; <span id="copy-year"></span> Copyright Angels Dashboard by <a class="text-primary"
                            href="http://www.iamabdus.com/" target="_blank">Sara</a>.
                    </p>
                </div>
                <script>
                    var d = new Date();
                    var year = d.getFullYear();
                    document.getElementById("copy-year").innerHTML = year;
                </script>
            </footer>
        </div>
    </div>


    <script src="<?php echo e(asset('assets/plugins/jquery/jquery.min.js')); ?>"></script>
    <script src="<?php echo e(asset('assets/plugins/bootstrap/js/bootstrap.bundle.min.js')); ?>"></script>
    <script src="<?php echo e(asset('assets/plugins/simplebar/simplebar.min.js')); ?>"></script>
    <script src="https://unpkg.com/hotkeys-js/dist/hotkeys.min.js"></script>

    <script src="<?php echo e(asset('assets/plugins/apexcharts/apexcharts.js')); ?>"></script>

    <script src="<?php echo e(asset('assets/plugins/DataTables/DataTables-1.10.18/js/jquery.dataTables.min.js')); ?>"></script>

    <script src="<?php echo e(asset('assets/plugins/jvectormap/jquery-jvectormap-2.0.3.min.js')); ?>"></script>
    <script src="<?php echo e(asset('assets/plugins/jvectormap/jquery-jvectormap-world-mill.js')); ?>"></script>
    <script src="<?php echo e(asset('assets/plugins/jvectormap/jquery-jvectormap-us-aea.js')); ?>"></script>

    <script src="<?php echo e(asset('assets/plugins/daterangepicker/moment.min.js')); ?>"></script>
    <script src="<?php echo e(asset('assets/plugins/daterangepicker/daterangepicker.js')); ?>"></script>
    <script>
        jQuery(document).ready(function() {
            jQuery('input[name="dateRange"]').daterangepicker({
                autoUpdateInput: false,
                singleDatePicker: true,
                locale: {
                    cancelLabel: 'Clear'
                }
            });
            jQuery('input[name="dateRange"]').on('apply.daterangepicker', function(ev, picker) {
                jQuery(this).val(picker.startDate.format('MM/DD/YYYY'));
            });
            jQuery('input[name="dateRange"]').on('cancel.daterangepicker', function(ev, picker) {
                jQuery(this).val('');
            });
        });
    </script>

    <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>

    <script src="<?php echo e(asset('assets/plugins/toaster/toastr.min.js')); ?>"></script>

    <script src="<?php echo e(asset('assets/js/mono.js')); ?>"></script>
    <script src="<?php echo e(asset('assets/js/chart.js')); ?>"></script>
    <script src="<?php echo e(asset('assets/js/map.js')); ?>"></script>
    <script src="<?php echo e(asset('assets/js/custom.js')); ?>"></script>
</body>

</html><?php /**PATH C:\wamp64\www\masterpiece\website\masterpiece-dashboard\resources\views/dashboard/layouts/navbar.blade.php ENDPATH**/ ?>