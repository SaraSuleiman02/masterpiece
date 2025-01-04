@extends('dashboard.layouts.navbar')

@section('content')
<div class="content" style="background-color: #ffff">
    <div class="row py-5">
        <div class="col-12 d-flex justify-content-between align-items-center">
            <h2>Appointments <b>Details</b></h2>
            <button type="button" class="btn btn-primary add-new" data-toggle="modal" data-target="#exampleModalForm">
                Add New
            </button>
        </div>
    </div>

    <!-- Table for displaying Appointments -->
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">User Name</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($appointments as $appointment)
            <tr data-id="{{ $appointment->id }}">
                <td>{{ $loop->iteration }}</td>
                <td>{{ $appointment->user->name ?? 'N/A' }}</td>
                <td>{{ $appointment->date }}</td>
                <td>{{ $appointment->time }}</td>
            </tr>
            @empty
            <tr>
                <td colspan="3" class="text-center">No user appointments available.</td>
            </tr>
            @endforelse
        </tbody>
    </table>
</div>

<!-- Add/Edit User Details Modal -->
<div class="modal fade" id="exampleModalForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalFormTitle"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalFormTitle">Add New Appointment</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="detailsForm" enctype="multipart/form-data">
                    @csrf
                    <input type="hidden" id="detailId" name="id">
                    <div class="form-group">
                        <label for="user_id">User Name</label>
                        <select class="form-control" id="user_id" name="user_id" required>
                            <option value="">Select User</option>
                            @foreach ($users as $user)
                            <option value="{{ $user->id }}">{{ $user->name }}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="date">Date</label>
                        <input type="date" class="form-control" id="date" name="date" required>
                    </div>
                    <div class="form-group">
                        <label for="time">Time</label>
                        <input type="time" class="form-control" id="time" name="time" required>
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
                url: "{{ route('appointments.store') }}",
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                    Swal.fire('Success!', response.message ||
                            'Appointment added successfully!', 'success')
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
@endsection