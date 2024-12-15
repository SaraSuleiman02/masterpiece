@extends('dashboard.layouts.navbar')

@section('content')
    <div class="content" style="background-color: #ffff">
        <div class="row py-5">
            <div class="col-12 d-flex justify-content-between align-items-center">
                <h2>User <b>Details</b></h2>
                <button type="button" class="btn btn-primary add-new" data-toggle="modal" data-target="#exampleModalForm">
                    Add New
                </button>
            </div>
        </div>

        <!-- Table for displaying users -->
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">DOB</th>
                    <th scope="col">Role</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($users as $user)
                    <tr data-id="{{ $user->id }}">
                        <td scope="row">{{ $users->firstItem() + $loop->index }}</td>
                        <td>{{ $user->name }}</td>
                        <td>{{ $user->email }}</td>
                        <td>{{ $user->phone }}</td>
                        <td>{{ $user->dob }}</td>
                        <td>{{ $user->role }}</td>
                        <td style="font-size: 20px;">
                            <a class="edit" title="Edit" data-toggle="tooltip"><span
                                    class="mdi mdi-pencil-box"></span></a>
                            <a class="delete" title="Delete" data-toggle="tooltip"><span class="mdi mdi-delete"></span></a>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="7" class="text-center">No users available. Add one above!</td>
                    </tr>
                @endforelse
            </tbody>
        </table>

        <!-- Pagination link -->
        {{-- <div class="py-4 d-flex justify-content-center">
            {{ $users->render('pagination::bootstrap-4') }}
        </div> --}}

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
                        @csrf
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
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" name="password"
                                placeholder="Enter password" required>
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone</label>
                            <input type="text" class="form-control" id="phone" name="phone"
                                placeholder="Enter phone number">
                        </div>
                        <div class="form-group">
                            <label for="dob">Date of Birth</label>
                            <input type="date" class="form-control" id="dob" name="dob">
                        </div>
                        <div class="form-group">
                            <label for="role">Role</label>
                            <input type="text" class="form-control" id="role" name="role"
                                placeholder="Enter role">
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
            // Initialize DataTable for the table
            $('table').DataTable({
                "searching": true // Enables the search functionality
            });

            // Add New User via Modal
            $('#saveUserBtn').off().on('click', function(event) {
                event.preventDefault();
                const formData = $('#addUserForm').serialize();

                $.ajax({
                    url: "{{ route('users.store') }}",
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
                var userId = row.data("id");
                var data = {
                    name: row.find("input").eq(0).val(),
                    email: row.find("input").eq(1).val(),
                    phone: row.find("input").eq(2).val(),
                    dob: row.find("input").eq(3).val(),
                    role: row.find("input").eq(4).val(),
                    _method: 'PUT',
                    _token: '{{ csrf_token() }}'
                };

                $.ajax({
                    url: "{{ route('users.update', ':id') }}".replace(':id', userId),
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


            // Delete User
            $(document).on('click', '.delete', function() {
                const row = $(this).closest('tr');
                const userId = row.data('id');

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
                            url: "{{ route('users.destroy', ':id') }}".replace(':id',
                                userId),
                            type: 'DELETE',
                            data: {
                                _token: '{{ csrf_token() }}',
                            },
                            success: function(response) {
                                Swal.fire('Deleted!', response.message ||
                                    'User deleted successfully!', 'success');
                                row.remove(); // Remove the row
                            },
                            error: function(xhr) {
                                Swal.fire('Error!', xhr.responseJSON.message ||
                                    'Failed to delete user.', 'error');
                            },
                        });
                    }
                });
            });
        });
    </script>
@endsection
