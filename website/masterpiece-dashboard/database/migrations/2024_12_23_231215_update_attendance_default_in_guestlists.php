<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Use raw SQL to set the default value for the attendance column without changing its type
        DB::statement("ALTER TABLE guestlists MODIFY attendance SET('Attending', 'Pending', 'Cancelled') DEFAULT 'Pending'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Rollback by resetting the default to a value of your choice (e.g., 'Attending')
        DB::statement("ALTER TABLE guestlists MODIFY attendance SET('Attending', 'Pending', 'Cancelled') DEFAULT 'Attending'");
    }
};
