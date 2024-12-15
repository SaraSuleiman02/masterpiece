

<?php $__env->startSection('content'); ?>
    <div class="content" style="background-color: #ffff">
        <div class="row py-5">
            <div class="col-12 d-flex justify-content-between align-items-center">
                <h2>User Detail <b>Details</b></h2>
                <button type="button" class="btn btn-primary add-new" data-toggle="modal" data-target="#exampleModalForm">
                    Add New
                </button>
            </div>
        </div>

        <!-- Table for displaying user details -->
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Partner Name</th>
                    <th scope="col">Event Type</th>
                    <th scope="col">Budget</th>
                    <th scope="col">City</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php $__empty_1 = true; $__currentLoopData = $userDetails; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $userDetail): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); $__empty_1 = false; ?>
                    <tr data-id="<?php echo e($userDetail->id); ?>">
                        <td><?php echo e($loop->iteration); ?></td>
                        <td data-user-id="<?php echo e($userDetail->user->id ?? ''); ?>"><?php echo e($userDetail->user->name ?? 'N/A'); ?></td>
                        <td><?php echo e($userDetail->partner_name); ?></td>
                        <td><?php echo e($userDetail->event_type); ?></td>
                        <td><?php echo e($userDetail->budget); ?></td>
                        <td><?php echo e($userDetail->city); ?></td>
                        <td style="font-size: 20px;">
                            <a class="edit" title="Edit" data-toggle="tooltip">
                                <span class="mdi mdi-pencil-box"></span>
                            </a>
                            <a class="delete" title="Delete" data-toggle="tooltip">
                                <span class="mdi mdi-delete"></span>
                            </a>
                        </td>
                    </tr>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); if ($__empty_1): ?>
                    <tr>
                        <td colspan="7" class="text-center">No user details available. Add one above!</td>
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
                            <label for="partner-name">Partner Name</label>
                            <input type="text" class="form-control" id="partner-name" name="partner_name"
                                placeholder="Enter partner name" required>
                        </div>
                        <div class="form-group">
                            <label>Event Type</label>
                            <div>
                                <label>
                                    <input type="checkbox" name="event_type[]" value="pre-wedding"> Pre-Wedding
                                </label>
                                <label>
                                    <input type="checkbox" name="event_type[]" value="wedding"> Wedding
                                </label>
                                <label>
                                    <input type="checkbox" name="event_type[]" value="honeymoon"> Honeymoon
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="budget">Budget</label>
                            <input type="number" class="form-control" id="budget" name="budget" step="0.01"
                                placeholder="Enter budget" required>
                        </div>
                        <div class="form-group">
                            <label for="city">City</label>
                            <select class="form-control" id="city" name="city" required>
                                <option value="">Select City</option>
                                <option value="Amman">Amman</option>
                                <option value="Zarqa">Zarqa</option>
                                <option value="Irbid">Irbid</option>
                                <option value="Aqaba">Aqaba</option>
                                <option value="Mafraq">Mafraq</option>
                                <option value="Jerash">Jerash</option>
                                <option value="Madaba">Madaba</option>
                                <option value="Ajloun">Ajloun</option>
                                <option value="Salt">Salt</option>
                                <option value="Karak">Karak</option>
                                <option value="Tafilah">Tafilah</option>
                                <option value="Ma’an">Ma’an</option>
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
            // Initialize DataTable only once
            const table = $('table').DataTable({
                searching: true
            });

            // Handle Edit button click
            $(document).on('click', '.edit', function() {
                const row = $(this).closest('tr');
                const id = row.data('id'); // Get the detail ID
                const userId = row.find('td:nth-child(2)').data('user-id'); // Get the associated user ID
                const partnerName = row.find('td:nth-child(3)').text(); // Partner name
                const eventType = row.find('td:nth-child(4)').text(); // Event type
                const budget = row.find('td:nth-child(5)').text(); // Budget
                const city = row.find('td:nth-child(6)').text(); // City

                // Populate the modal fields
                $('#detailId').val(id); // Set detail ID
                $('#user_id').val(userId); // Set user ID to the selected value

                $('#partner-name').val(partnerName); // Set partner name

                // Handling Event Type (for checkboxes)
                const selectedEvents = eventType.split(',').map(event => event.trim()); // Split the event type string into an array
                $('input[name="event_type[]"]').each(function() {
                    $(this).prop('checked', selectedEvents.includes($(this).val())); // Check the corresponding checkboxes
                });

                $('#budget').val(budget); // Set the budget
                $('#city').val(city); // Set the city

                // Change modal title and button label for editing
                $('#exampleModalFormTitle').text('Edit User Details');
                $('#saveDetailsBtn').text('Update');

                // Show the modal
                $('#exampleModalForm').modal('show');
            });

            // Save button handler
            $('#saveDetailsBtn').on('click', function(event) {
                event.preventDefault();

                // Prepare data
                const formData = new FormData($('#detailsForm')[0]);
                const id = $('#detailId').val(); // Check if we are updating or creating

                // Add _method for PUT if updating
                if (id) {
                    formData.append('_method', 'PUT');
                }

                // Ensure CSRF token is included
                formData.append('_token', '<?php echo e(csrf_token()); ?>');

                const url = id ? 
                    "<?php echo e(route('userDetails.update', ':id')); ?>".replace(':id', id) : 
                    "<?php echo e(route('userDetails.store')); ?>";

                $.ajax({
                    url: url,
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function(response) {
                        Swal.fire('Success!', response.message || 'User added successfully!', 'success')
                            .then(() => {
                                $('#exampleModalForm').modal('hide');
                                location.reload();
                            });
                    },
                    error: function(xhr) {
                        const errors = xhr.responseJSON?.errors || {};
                        const message = Object.values(errors).join('<br>') || xhr.responseJSON?.message;
                        Swal.fire('Error!', message, 'error');
                    }
                });
            });

            // Delete handler
            $(document).on('click', '.delete', function() {
                const row = $(this).closest('tr');
                const id = row.data('id');

                Swal.fire({
                    title: 'Are you sure?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'Cancel'
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            url: "<?php echo e(route('userDetails.destroy', ':id')); ?>".replace(':id', id),
                            type: 'DELETE',
                            data: {
                                _token: '<?php echo e(csrf_token()); ?>',
                            },
                            success: function(response) {
                                Swal.fire('Deleted!', response.message || 'User deleted successfully!', 'success')
                                    .then(() => {
                                        table.row(row).remove().draw();
                                    });
                            },
                            error: function(xhr) {
                                Swal.fire('Error!', 'Something went wrong. Please try again.', 'error');
                            }
                        });
                    }
                });
            });
        });
    </script>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('dashboard.layouts.navbar', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\wamp64\www\laravel\laravel_tasks\masterpiece-dashboard\resources\views/dashboard/user-detail.blade.php ENDPATH**/ ?>