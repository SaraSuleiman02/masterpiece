<?php $__env->startSection('content'); ?>
    <div class="content" style="background-color: #ffff">
        <div class="row py-5">
            <div class="col-12 d-flex justify-content-between align-items-center">
                <h2>Vendor <b>Details</b></h2>
                <button type="button" class="btn btn-primary add-new" data-toggle="modal" data-target="#exampleModalForm">
                    Add New
                </button>
            </div>
        </div>

        <!-- Table for displaying vendors -->
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Vendor Name</th>
                    <th scope="col">Service Name</th>
                    <th scope="col">Location</th>
                    <th scope="col">About</th>
                    <th scope="col">Price</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php $__empty_1 = true; $__currentLoopData = $vendors; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $vendor): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); $__empty_1 = false; ?>
                    <tr data-id="<?php echo e($vendor->id); ?>">
                        <td scope="row"><?php echo e($loop->iteration); ?></td>
                        <td><?php echo e($vendor->name); ?></td>
                        <td><?php echo e($vendor->service->name); ?></td>
                        <td><?php echo e($vendor->location); ?></td>
                        <td><?php echo e($vendor->about); ?></td>
                        <td><?php echo e($vendor->price); ?> JOD</td>
                        <td style="font-size: 20px;">
                            <a class="edit" title="Edit" data-toggle="tooltip"><span
                                    class="mdi mdi-pencil-box"></span></a>
                            <a class="delete" title="Delete" data-toggle="tooltip"><span class="mdi mdi-delete"></span></a>
                        </td>
                    </tr>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); if ($__empty_1): ?>
                    <tr>
                        <td colspan="7" class="text-center">No vendors available. Add one above!</td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>

    <!-- Add/Edit User Modal -->
    <div class="modal fade" id="exampleModalForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalFormTitle"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalFormTitle">Add New Vendor</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="addVendorForm">
                        <?php echo csrf_field(); ?>
                        <div class="form-group">
                            <label for="name">Vendor Name</label>
                            <input type="text" class="form-control" id="name" name="name"
                                placeholder="Enter name" required>
                        </div>
                        <div class="form-group">
                            <label for="service_id">Service Name</label>
                            <select class="form-control" id="service_id" name="service_id" required>
                                <option value="">Select Service</option>
                                <?php $__currentLoopData = $services; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $service): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                    <option value="<?php echo e($service->id); ?>"><?php echo e($service->name); ?></option>
                                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="location">Location</label>
                            <input type="text" class="form-control" id="location" name="location"
                                placeholder="Enter the location">
                        </div>
                        <div class="form-group">
                            <label for="about">About</label>
                            <textarea class="form-control" id="about" name="about" placeholder="Enter info about the vendor" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="price">Price</label>
                            <input type="number" class="form-control" id="price" name="price"
                                placeholder="Enter the price">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="saveUserBtn">Save</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        $(document).ready(function() {
            // Pass services data to JavaScript
            const services = <?php echo json_encode($services, 15, 512) ?>;

            // Initialize DataTable for the table
            $('table').DataTable({
                "searching": true
            });

            // Add New Vendor via Modal
            $('#saveUserBtn').off().on('click', function(event) {
                event.preventDefault();
                const formData = $('#addVendorForm').serialize();

                $.ajax({
                    url: "<?php echo e(route('vendors.store')); ?>",
                    type: 'POST',
                    data: formData,
                    success: function(response) {
                        Swal.fire('Success!', response.message || 'User added successfully!',
                                'success')
                            .then(() => {
                                $('#exampleModalForm').modal('hide');
                                location.reload(); // Reload to display the new user
                            });
                    },
                    error: function(xhr) {
                        let errors = xhr.responseJSON?.errors || {};
                        let errorMessages = Object.values(errors).flat().join('<br>');
                        Swal.fire('Error!', errorMessages || 'Failed to add user.', 'error');
                    },
                });
            });

            // Edit vendor
            $(document).on("click", ".edit", function() {
                var row = $(this).closest("tr");
                var vendorId = row.data("id");

                row.find("td").each(function(index) {
                    var content = $(this).text().trim();

                    // Update specific fields
                    if (index === 2) {
                        // Replace service name with dropdown
                        let serviceSelect = '<select class="form-control">';
                        services.forEach(service => {
                            serviceSelect += `<option value="${service.id}" ${
                    content === service.name ? "selected" : ""
                }>${service.name}</option>`;
                        });
                        serviceSelect += "</select>";
                        $(this).html(serviceSelect);
                    } else if (index == 5) {
                        $(this).html(
                            `<input type="number" class="form-control" value="${content}">`);

                    } else if (index > 0 && index < 6) {
                        // For other editable fields, replace content with an input
                        $(this).html(`<input type="text" class="form-control" value="${content}">`);
                    }
                });

                // Change edit button to save button
                row.find(".edit").removeClass("edit").addClass("save").html(
                    '<span class="mdi mdi-check-all"></span>');
            });


            // Save edited vendor
            $(document).on("click", ".save", function() {
                var row = $(this).closest("tr");
                var vendorId = row.data("id");

                var data = {
                    name: row.find("input").eq(0).val(),
                    service_id: row.find("select").val(), // Fetch selected service ID
                    location: row.find("input").eq(1).val(),
                    about: row.find("input").eq(2).val(),
                    price: row.find("input").eq(3).val(), 
                    _method: 'PUT',
                    _token: '<?php echo e(csrf_token()); ?>'
                };

                $.ajax({
                    url: "<?php echo e(route('vendors.update', ':id')); ?>".replace(':id', vendorId),
                    method: 'PUT',
                    data: data,
                    success: function(response) {
                        Swal.fire(
                            "Updated!",
                            response.message || "Vendor has been updated successfully.",
                            "success"
                        ).then(() => {
                            location.reload();
                        });
                    },
                    error: function(xhr) {
                        Swal.fire(
                            "Error!",
                            xhr.responseJSON.message || "Failed to update vendor.",
                            "error"
                        );
                    }
                });
            });

            // Delete User
            $(document).on('click', '.delete', function() {
                const row = $(this).closest('tr');
                const vendorId = row.data('id');

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
                            url: "<?php echo e(route('vendors.destroy', ':id')); ?>".replace(':id',
                                vendorId),
                            type: 'DELETE',
                            data: {
                                _token: '<?php echo e(csrf_token()); ?>',
                            },
                            success: function(response) {
                                Swal.fire('Deleted!', response.message ||
                                    'Vendor deleted successfully!', 'success');
                                row.remove(); // Remove the row
                            },
                            error: function(xhr) {
                                Swal.fire('Error!', xhr.responseJSON.message ||
                                    'Failed to delete vendor.', 'error');
                            },
                        });
                    }
                });
            });
        });
    </script>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('dashboard.layouts.navbar', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\wamp64\www\masterpiece\website\masterpiece-dashboard\resources\views/dashboard/vendor.blade.php ENDPATH**/ ?>