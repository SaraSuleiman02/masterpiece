<?php $__env->startSection('content'); ?>
    <div class="content" style="background-color: #ffff">
        <div class="row py-5">
            <div class="col-12 d-flex justify-content-between align-items-center">
                <h2>Booking <b>Details</b></h2>
                <button type="button" class="btn btn-primary add-new" data-toggle="modal" data-target="#exampleModalForm">
                    Add New
                </button>
            </div>
        </div>

        <!-- Table for displaying bookings -->
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Vendor Name</th>
                    <th scope="col">Event Date</th>
                    <th scope="col">Price</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php $__empty_1 = true; $__currentLoopData = $bookings; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $booking): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); $__empty_1 = false; ?>
                    <tr data-id="<?php echo e($booking->id); ?>">
                        <td><?php echo e($loop->iteration); ?></td>
                        <td><?php echo e($booking->user->name ?? 'N/A'); ?></td>
                        <td>
                            <?php $__currentLoopData = $booking->vendors; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $vendor): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                <?php echo e($vendor->name); ?>

                                <br>
                            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                        </td>
                        <td><?php echo e($booking->event_date); ?></td>
                        <td>
                            <?php $__currentLoopData = $booking->vendors; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $vendor): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                <?php echo e($vendor->price); ?> JD
                                <br>
                            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                        </td>
                        <td>
                            <?php if($booking->status === 'pending'): ?>
                                <button type="button" class="btn btn-pill btn-primary btn-sm">Pending</button>
                            <?php elseif($booking->status === 'confirmed'): ?>
                                <button type="button" class="mb-1 btn btn-pill btn-success btn-sm">Confirmed</button>
                            <?php elseif($booking->status === 'cancelled'): ?>
                                <button type="button" class="mb-1 btn btn-pill btn-secondary btn-sm">Cancelled</button>
                            <?php endif; ?>
                        </td>
                        <td style="font-size: 20px;">
                            <a class="edit" title="Edit" data-toggle="tooltip"><span
                                    class="mdi mdi-pencil-box"></span></a>
                            <a class="delete" title="Delete" data-toggle="tooltip"><span class="mdi mdi-delete"></span></a>
                        </td>
                    </tr>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); if ($__empty_1): ?>
                    <tr>
                        <td colspan="7" class="text-center">No bookings available. Add one above!</td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>

    <!-- Add/Edit Booking Modal -->
    <div class="modal fade" id="exampleModalForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalFormTitle"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalFormTitle">Add New Booking</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="addBookingForm">
                        <?php echo csrf_field(); ?>
                        <input type="hidden" id="booking_id" name="booking_id">
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
                        <div class="form-group">
                            <label for="event_date">Event Date</label>
                            <input type="date" class="form-control" id="event_date" name="event_date" required>
                        </div>
                        <div class="form-group">
                            <label for="status">Status</label>
                            <select class="form-control" id="status" name="status" required>
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="saveBookingBtn">Save</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        $(document).ready(function() {
            // Initialize DataTable for the table
            $('table').DataTable({
                "searching": true
            });

            // Open Modal for Edit
            $(document).on('click', '.edit', function() {
                const row = $(this).closest('tr');
                const bookingId = row.data('id');

                $.ajax({
                    url: "<?php echo e(route('bookings.edit', ':id')); ?>".replace(':id', bookingId),
                    type: 'GET',
                    success: function(response) {
                        const booking = response.booking;

                        // Pre-fill the modal form with booking details
                        $('#exampleModalFormTitle').text('Edit Booking');
                        $('#booking_id').val(booking.id);
                        $('#user_id').val(booking.user_id);
                        $('#event_date').val(booking.event_date);
                        $('#vendor_id').val(booking.vendors.map(v => v.id));

                        // Show the modal
                        $('#exampleModalForm').modal('show');
                    },
                    error: function(xhr) {
                        Swal.fire('Error!', 'Failed to load booking details.', 'error');
                    }
                });
            });

            // Add or Edit Booking via Modal
            $('#saveBookingBtn').off().on('click', function(event) {
                event.preventDefault();
                const formData = $('#addBookingForm').serialize();

                const bookingId = $('#booking_id').val();
                const url = bookingId ? "<?php echo e(route('bookings.update', ':id')); ?>".replace(':id', bookingId) :
                    "<?php echo e(route('bookings.store')); ?>";
                const method = bookingId ? 'PUT' : 'POST';

                $.ajax({
                    url: url,
                    type: method,
                    data: formData,
                    success: function(response) {
                        Swal.fire('Success!', response.message || 'Booking saved successfully!',
                                'success')
                            .then(() => {
                                $('#exampleModalForm').modal('hide');
                                location.reload(); // Reload to display the updated booking
                            });
                    },
                    error: function(xhr) {
                        let errors = xhr.responseJSON?.errors || {};
                        let errorMessages = Object.values(errors).flat().join('<br>');
                        Swal.fire('Error!', errorMessages || 'Failed to save booking.',
                        'error');
                    },
                });
            });

            // Delete Booking
            $(document).on('click', '.delete', function() {
                const row = $(this).closest('tr');
                const bookingId = row.data('id');

                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!',
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            url: "<?php echo e(route('bookings.destroy', ':id')); ?>".replace(':id',
                                bookingId),
                            type: 'DELETE',
                            data: {
                                _token: '<?php echo e(csrf_token()); ?>',
                            },
                            success: function(response) {
                                Swal.fire('Deleted!', response.message ||
                                    'Booking deleted successfully!', 'success');
                                row.remove(); // Remove the row
                            },
                            error: function(xhr) {
                                Swal.fire('Error!', 'Failed to delete booking.',
                                    'error');
                            }
                        });
                    }
                });
            });
        });
    </script>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('dashboard.layouts.navbar', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\Users\user\Desktop\masterpiece-dashboard\resources\views/dashboard/booking.blade.php ENDPATH**/ ?>