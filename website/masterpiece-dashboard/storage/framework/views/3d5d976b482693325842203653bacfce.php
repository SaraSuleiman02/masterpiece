<?php $__env->startSection('content'); ?>
    <div class="content" style="background-color: #ffff">
        <div class="row py-5">
            <div class="col-12 d-flex justify-content-between align-items-center">
                <h2>Contact-Us <b>Details</b></h2>
                <button type="button" class="btn btn-primary add-new" data-toggle="modal" data-target="#exampleModalForm">
                    Add New
                </button>
            </div>
        </div>

        <!-- Table for displaying contacts -->
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Message</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php $__empty_1 = true; $__currentLoopData = $contacts; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $contact): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); $__empty_1 = false; ?>
                    <tr data-id="<?php echo e($contact->id); ?>">
                        <td scope="row"><?php echo e($loop->iteration); ?></td>
                        <td><?php echo e($contact->name); ?></td>
                        <td><?php echo e($contact->email); ?></td>
                        <td><?php echo e($contact->message); ?></td>
                        <td style="font-size: 20px;">
                            <a class="edit" title="Edit" data-toggle="tooltip"><span
                                    class="mdi mdi-pencil-box"></span></a>
                            <a class="delete" title="Delete" data-toggle="tooltip"><span class="mdi mdi-delete"></span></a>
                        </td>
                    </tr>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); if ($__empty_1): ?>
                    <tr>
                        <td colspan="7" class="text-center">No users available. Add one above!</td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>

        <!-- Pagination link -->
        

    </div>

    <!-- Add/Edit User Modal -->
    <div class="modal fade" id="exampleModalForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalFormTitle"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalFormTitle">Add New User</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="addUserForm">
                        <?php echo csrf_field(); ?>
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" id="name" name="name"
                                placeholder="Enter name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input type="email" class="form-control" id="email" name="email"
                                placeholder="Enter email" required>
                        </div>
                        <div class="form-group">
                            <label for="message">Message</label>
                            <textarea class="form-control" id="message" name="message" placeholder="Enter message" required></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="saveContactBtn">Save</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        $(document).ready(function() {
            // Initialize DataTable for the table
            $('table').DataTable({
                "searching": true // Enables the search functionality
            });

            $('[data-toggle="tooltip"]').tooltip();

            // Add new user
            $(".add-new").click(function() {
                $(this).attr("disabled", "disabled");
                var row = `
                    <tr>
                        <td>#</td>
                        <td><input type="text" class="form-control" name="name" placeholder="Enter name"></td>
                        <td><input type="email" class="form-control" name="email" placeholder="Enter email"></td>
                        <td><input type="text" class="form-control" name="message" placeholder="Enter message"></td>
                        <td>
                            <a class="add" title="Add" data-toggle="tooltip"><span class="mdi mdi-check-all"></span></a>
                            <a class="cancel" title="Cancel" data-toggle="tooltip"><span class="mdi mdi-close"></span></a>
                        </td>
                    </tr>`;
                $("table tbody").append(row);
                $('[data-toggle="tooltip"]').tooltip(); // Reinitialize tooltips
            });

            // Save new user
            $(document).on("click", ".add", function() {
                var row = $(this).closest("tr");
                var data = {
                    name: row.find("input[name='name']").val(),
                    email: row.find("input[name='email']").val(),
                    message: row.find("input[name='message']").val(),
                    _token: '<?php echo e(csrf_token()); ?>'
                };

                $.post("<?php echo e(route('contacts.store')); ?>", data, function(response) {
                    Swal.fire(
                        "Added!",
                        response.message || "User has been added successfully.",
                        "success"
                    ).then(() => {
                        location.reload(); // Reload the page to update the table
                    });
                }).fail(function(xhr) {
                    let errorMessage = "Error adding user.";
                    if (xhr.responseJSON && xhr.responseJSON.errors) {
                        errorMessage = Object.values(xhr.responseJSON.errors).flat().join("<br>");
                    }
                    Swal.fire("Error!", errorMessage, "error");
                });
            });



            // Cancel adding a new user
            $(document).on("click", ".cancel", function() {
                $(this).closest("tr").remove();
                $(".add-new").removeAttr("disabled");
            });

            // Edit user
            $(document).on("click", ".edit", function() {
                var row = $(this).closest("tr");
                row.find("td:not(:last-child)").each(function(index) {
                    var content = $(this).text();
                    if (index > 0) {
                        $(this).html(`<input type="text" class="form-control" value="${content}">`);
                    }
                });
                row.find(".edit").removeClass("edit").addClass("save").html(
                    '<span class="mdi mdi-check-all"></span>');
            });

            // Save edited user
            $(document).on("click", ".save", function() {
                var row = $(this).closest("tr");
                var contactId = row.data("id");
                var data = {
                    name: row.find("input").eq(0).val(),
                    email: row.find("input").eq(1).val(),
                    message: row.find("input").eq(2).val(),
                    _method: 'PUT',
                    _token: '<?php echo e(csrf_token()); ?>'
                };

                $.ajax({
                    url: "<?php echo e(route('contacts.update', ':id')); ?>".replace(':id', contactId),
                    method: 'PUT',
                    data: data,
                    success: function(response) {
                        Swal.fire(
                            "Updated!",
                            response.message || "User has been updated successfully.",
                            "success"
                        ).then(() => {
                            location.reload(); // Reload the page to update the table
                        });
                    },
                    error: function(xhr) {
                        Swal.fire(
                            "Error!",
                            xhr.responseJSON.message || "Failed to update user.",
                            "error"
                        );
                    }
                });
            });


            // Delete user
            $(document).on("click", ".delete", function() {
                var row = $(this).closest("tr");
                var contactId = row.data("id");

                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        $.ajax({
                            url: "<?php echo e(route('contacts.destroy', ':id')); ?>".replace(':id',
                                contactId),
                            method: 'DELETE',
                            data: {
                                _token: '<?php echo e(csrf_token()); ?>'
                            },
                            success: function(response) {
                                Swal.fire(
                                    "Deleted!",
                                    response.message || "User has been deleted.",
                                    "success"
                                );
                                row.remove(); // Remove the row from the table
                            },
                            error: function(xhr) {
                                Swal.fire(
                                    "Error!",
                                    xhr.responseJSON.message ||
                                    "Failed to delete the user.",
                                    "error"
                                );
                            }
                        });
                    }
                });
            });

        });
    </script>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('dashboard.layouts.navbar', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\wamp64\www\masterpiece\website\masterpiece-dashboard\resources\views/dashboard/contact.blade.php ENDPATH**/ ?>