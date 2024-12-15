<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_details', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->string('partner_name');
            $table->set('event_type', ['pre-wedding', 'wedding', 'honeymoon']);
            $table->decimal('budget',10,2)->default(0.00);
            $table->enum('city', [
                'Amman', 'Zarqa', 'Irbid', 'Aqaba', 'Mafraq', 'Jerash', 
                'Madaba', 'Ajloun', 'Salt', 'Karak', 'Tafilah', 'Ma’an'
            ])->default('Amman');
            $table->tinyInteger('is_deleted')->default('0');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_details');
    }
};