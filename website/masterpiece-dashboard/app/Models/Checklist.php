<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Checklist extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id',
        'task',
        'completed',
    ];

    /**
     * Relationship: A checklist belongs to one user.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
