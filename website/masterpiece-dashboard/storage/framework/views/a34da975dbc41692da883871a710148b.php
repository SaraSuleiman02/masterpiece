<?php $__env->startSection('content'); ?>
    <div class="content-wrapper">
        <div class="content">
            <!-- Card Profile -->
            <div class="card card-default card-profile">

                <div class="card-header-bg" style="background-image:url(<?php echo e(asset('assets/img/user/user-bg-01.jpg')); ?>)"></div>

                <div class="card-body card-profile-body">
                    <div class="profile-avata">
                        <img class="rounded-circle" src="<?php echo e(asset('assets/images/user/user-md-01.jpg')); ?>" alt="Avata Image">
                        <a class="h5 d-block mt-3 mb-2" href="#"><?php echo e($userData->name); ?></a>
                        <a class="d-block text-color" href="#"><?php echo e($userData->email); ?></a>
                    </div>
                </div>

                

            </div>

            <!-- Full-width Profile Settings -->
            <div class="card card-default mt-4">
                <div class="card-header">
                    <h2 class="mb-5">Profile Settings</h2>
                </div>

                <div class="card-body">
                    <form>
                        <div class="form-group row mb-6">
                            <label for="coverImage" class="col-sm-4 col-lg-2 col-form-label">
                                Image</label>
                            <div class="col-sm-8 col-lg-10">
                                <div class="custom-file mb-1">
                                    <input type="file" class="custom-file-input" id="coverImage" required>
                                    <label class="custom-file-label" for="coverImage">Choose file...</label>
                                    <div class="invalid-feedback">Example invalid custom
                                        file feedback</div>
                                </div>
                                <span class="d-block">Upload a new cover image, JPG
                                    1200x300</span>
                            </div>
                        </div>

                        <div class="d-flex justify-content-end">
                            <button type="submit" class="btn btn-primary mb-2 btn-pill">Update
                                Image</button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Edit Name & Email -->
            <div class="card card-default mt-4">
                <div class="card-header">
                    <h2 class="mb-5">Edit Name & Email</h2>
                </div>

                <div class="card-body">
                    <form id="updateInfoForm">
                        <div class="form-group row mb-6">
                            <label for="name" class="col-sm-4 col-lg-2 col-form-label">
                                Name</label>
                            <div class="col-sm-8 col-lg-10">
                                <div class="custom-file mb-1">
                                    <input type="name" class="px-2 py-2" id="name"
                                        placeholder="<?php echo e($userData->name); ?>" style="width: 100%; border:1px solid lightgrey;"
                                        required>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row mb-6">
                            <label for="name" class="col-sm-4 col-lg-2 col-form-label">
                                Email</label>
                            <div class="col-sm-8 col-lg-10">
                                <div class="custom-file mb-1">
                                    <input type="email" class="px-2 py-2" id="name"
                                        placeholder="<?php echo e($userData->email); ?>"
                                        style="width: 100%; border:1px solid lightgrey;">
                                </div>
                            </div>
                        </div>

                        <div class="d-flex justify-content-end">
                            <button type="submit" class="btn btn-primary mb-2 btn-pill">Update</button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Edit Password -->
            <div class="card card-default mt-4">
                <div class="card-header">
                    <h2 class="mb-5">Edit Password</h2>
                </div>

                <div class="card-body">
                    <form id="updatePasswordForm">
                        <div class="form-group row mb-6">
                            <label for="current_password" class="col-sm-4 col-lg-2 col-form-label">
                                Current Password</label>
                            <div class="col-sm-8 col-lg-10">
                                <div class="custom-file mb-1">
                                    <input type="password" class="px-2 py-2" id="current_password"
                                        style="width: 100%; border:1px solid lightgrey;" required>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row mb-6">
                            <label for="new_password" class="col-sm-4 col-lg-2 col-form-label">
                                New Password</label>
                            <div class="col-sm-8 col-lg-10">
                                <div class="custom-file mb-1">
                                    <input type="password" class="px-2 py-2" id="new_password"
                                        style="width: 100%; border:1px solid lightgrey;" required>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row mb-6">
                            <label for="confirm_password" class="col-sm-4 col-lg-2 col-form-label">
                                Confirm Password</label>
                            <div class="col-sm-8 col-lg-10">
                                <div class="custom-file mb-1">
                                    <input type="password" class="px-2 py-2" id="confirm_password"
                                        style="width: 100%; border:1px solid lightgrey;" required>
                                </div>
                            </div>
                        </div>

                        <div class="d-flex justify-content-end">
                            <button type="submit" class="btn btn-primary mb-2 btn-pill">Update</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>

    </div>

    <script>
        $(document).ready(function() {
            $('#updateInfoForm').submit(function(e) {
                e.preventDefault();
                let name = $('#name').val();
                let email = $('#email').val();

                $.ajax({
                    url: "<?php echo e(route('profile.updateInfo')); ?>",
                    method: 'POST',
                    data: {
                        _token: '<?php echo e(csrf_token()); ?>',
                        name: name,
                        email: email,
                    },
                    success: function(response) {
                        Swal.fire('Success', response.success, 'success');
                    },
                    error: function(response) {
                        Swal.fire('Error', response.responseJSON.message, 'error');
                    },
                });
            });

            $('#updatePasswordForm').submit(function(e) {
                e.preventDefault();
                let currentPassword = $('#current_password').val();
                let newPassword = $('#new_password').val();
                let confirmPassword = $('#confirm_password').val();

                $.ajax({
                    url: "<?php echo e(route('profile.updatePassword')); ?>",
                    method: 'POST',
                    data: {
                        _token: '<?php echo e(csrf_token()); ?>',
                        current_password: currentPassword,
                        new_password: newPassword,
                        new_password_confirmation: confirmPassword,
                    },
                    success: function(response) {
                        Swal.fire('Success', response.success, 'success');
                    },
                    error: function(response) {
                        Swal.fire('Error', response.responseJSON.error, 'error');
                    },
                });
            });

        });
    </script>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('dashboard.layouts.navbar', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\wamp64\www\masterpiece\website\masterpiece-dashboard\resources\views/dashboard/profile.blade.php ENDPATH**/ ?>