<?php $__env->startSection('content'); ?>
    <div class="content" style="background-color: #ffff">
        <div class="row py-5">
            <div class="col-12 d-flex justify-content-between align-items-center">
                <h2>User Wishlist <b>Details</b></h2>
                <button type="button" class="btn btn-primary add-new" data-toggle="modal" data-target="#exampleModalForm">
                    Add New
                </button>
            </div>
        </div>

        <!-- Table for displaying Wishlist -->
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Vendor Name</th>
                </tr>
            </thead>
            <tbody>
                <?php $__empty_1 = true; $__currentLoopData = $wishlists; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $wishlist): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); $__empty_1 = false; ?>
                    <tr data-id="<?php echo e($wishlist->id); ?>">
                        <td><?php echo e($loop->iteration); ?></td>
                        <td><?php echo e($wishlist->user->name ?? 'N/A'); ?></td>
                        <td>
                            <?php $__currentLoopData = $wishlist->vendors; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $vendor): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                <?php echo e($vendor->name); ?>

                                <br>
                            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                        </td>
                    </tr>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); if ($__empty_1): ?>
                    <tr>
                        <td colspan="3" class="text-center">No user wishlist available.</td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>

    <!-- Add/Edit User Details Modal -->
    <div class="modal fade" id="exampleModalForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalFormTitle"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalFormTitle">Add New User Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="detailsForm" enctype="multipart/form-data">
                        <?php echo csrf_field(); ?>
                        <input type="hidden" id="detailId" name="id">
                        <div class="form-group">
                            <label for="user_id">User Name</label>
                            <select class="form-control" id="user_id" name="user_id" required>
                                <option value="">Select User</option>
                                <?php $__currentLoopData = $users; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $user): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                    <option value="<?php echo e($user->id); ?>"><?php echo e($user->name); ?></option>
                                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="vendor_id">Vendor Name</label>
                            <select class="form-control" id="vendor_id" name="vendor_id[]" multiple required>
                                <?php $__currentLoopData = $vendors; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $vendor): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                    <option value="<?php echo e($vendor->id); ?>"><?php echo e($vendor->name); ?> - $<?php echo e($vendor->price); ?>

                                    </option>
                                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="saveDetailsBtn">Save</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        $(document).ready(function() {
            // Initialize DataTable
            const table = $('table').DataTable({
                searching: true
            });

            // Save button handler
            $('#saveDetailsBtn').on('click', function(event) {
                event.preventDefault();

                // Prepare serialized form data, convert vendor_id array into proper format
                const formData = new FormData($('#detailsForm')[0]);

                $.ajax({
                    url: "<?php echo e(route('wishlist.store')); ?>",
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(response) {
                        Swal.fire('Success!', response.message ||
                                'Wishlist updated successfully!', 'success')
                            .then(() => {
                                $('#exampleModalForm').modal('hide'); // Hide the modal
                                location.reload(); // Reload the page to refresh the data
                            });
                    },
                    error: function(xhr) {
                        const errors = xhr.responseJSON?.errors || {};
                        const message = Object.values(errors).flat().join('<br>') ||
                            'Something went wrong.';
                        Swal.fire('Error!', message, 'error');
                    },
                });
            });
        });
    </script>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('dashboard.layouts.navbar', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\wamp64\www\masterpiece\website\masterpiece-dashboard\resources\views/dashboard/wishlist.blade.php ENDPATH**/ ?>