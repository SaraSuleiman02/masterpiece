    @extends('dashboard.layouts.navbar')

    @section('content')
        <div class="content" style="background-color: #ffff">
            <div class="row py-5">
                <div class="col-12 d-flex justify-content-between align-items-center">
                    <h2>Service <b>Details</b></h2>
                    <button type="button" class="btn btn-primary add-new" data-toggle="modal" data-target="#exampleModalForm">
                        Add New
                    </button>
                </div>
            </div>

            <!-- Table for displaying services -->
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($services as $service)
                        <tr data-id="{{ $service->id }}">
                            <td>{{ $loop->iteration }}</td>
                            <td><img src="{{ asset($service->img_path) }}" alt="Service Image" width="100"></td>
                            <td>{{ $service->name }}</td>
                            <td>{{ $service->description }}</td>
                            <td style="font-size: 20px;">
                                <a class="edit" title="Edit" data-toggle="tooltip">
                                    <span class="mdi mdi-pencil-box"></span>
                                </a>
                                <a class="delete" title="Delete" data-toggle="tooltip">
                                    <span class="mdi mdi-delete"></span>
                                </a>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5" class="text-center">No services available. Add one above!</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>

        </div>

        <!-- Add Service Modal -->
        <div class="modal fade" id="exampleModalForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalFormTitle"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalFormTitle">Add New Service</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="serviceForm" enctype="multipart/form-data">
                            @csrf
                            <!-- Hidden input for service ID -->
                            <input type="hidden" id="serviceId" name="service_id">
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input type="text" class="form-control" id="name" name="name"
                                    placeholder="Enter name" required>
                            </div>
                            <div class="form-group">
                                <label for="description">Description</label>
                                <textarea class="form-control" id="description" name="description" placeholder="Enter description" required></textarea>
                            </div>
                            <div class="form-group">
                                <label for="image">Image</label>
                                <input type="file" class="form-control" id="image" name="image"
                                    accept="image/jpeg, image/png, image/webp">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" id="saveServiceBtn">Save</button>
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

                // Handle Edit button click
                $(document).on('click', '.edit', function() {
                    const row = $(this).closest('tr');
                    const id = row.data('id');
                    const name = row.find('td:nth-child(3)').text();
                    const description = row.find('td:nth-child(4)').text();
                    const imageSrc = row.find('td:nth-child(2) img').attr('src');

                    // Populate the modal fields
                    $('#serviceId').val(id);
                    $('#name').val(name);
                    $('#description').val(description);

                    // Change modal title and button label for editing
                    $('#exampleModalFormTitle').text('Edit Service');
                    $('#saveServiceBtn').text('Update');

                    $('#exampleModalForm').modal('show');
                });

                // Handle Save/Update button click
                $('#saveServiceBtn').off().on('click', function(event) {
                    event.preventDefault();
                    const formData = new FormData($('#serviceForm')[0]);
                    const serviceId = $('#serviceId').val();
                    const url = serviceId ? `/services/${serviceId}` :
                    "{{ route('services.store') }}"; // Use correct route
                    const method = serviceId ? 'POST' : 'POST';

                    if (serviceId) {
                        formData.append('_method', 'PUT'); // Laravel requires this for PUT requests
                    }

                    $.ajax({
                        url: url,
                        type: method,
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function(response) {
                            Swal.fire('Success!', response.message || 'Service saved successfully!',
                                    'success')
                                .then(() => {
                                    if (serviceId) {
                                        const row = $(`tr[data-id="${serviceId}"]`);
                                        row.find('td:nth-child(3)').text(response.service
                                        .name); 
                                        row.find('td:nth-child(4)').text(response.service
                                            .description); 
                                        row.find('td:nth-child(2) img').attr('src', response
                                            .service.img_path);
                                    }

                                    // Reset and hide the modal
                                    $('#exampleModalForm').modal('hide');
                                    $('#serviceForm')[0].reset();
                                    $('#serviceId').val('');
                                });
                        },
                        error: function(xhr) {
                            let errorMessage = xhr.responseJSON?.error || 'Failed to save service.';
                            Swal.fire('Error!', errorMessage, 'error');
                        },
                    });
                });

                // Delete Service
            $(document).on('click', '.delete', function() {
                const row = $(this).closest('tr');
                const serviceId = row.data('id');

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
                            url: "{{ route('services.destroy', ':id') }}".replace(':id',
                                serviceId),
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
