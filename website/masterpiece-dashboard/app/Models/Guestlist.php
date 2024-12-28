<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guestlist extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'name',
        'phone',
        'attendance',
        'guestGroup_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function guestGroup()
    {
        return $this->belongsTo(Guestgroup::class, 'guestGroup_id');
    }
}