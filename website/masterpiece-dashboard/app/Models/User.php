<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',        
        'dob',          
        'partner_name', 
        'event_date',   
        'event_type',   
        'city',
        'budget',       
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'dob' => 'date',           
        'event_date' => 'date',
        'budget' => 'float',
    ];

    public function userDetail()
    {
        return $this->hasOne(UserDetail::class, 'user_id');
    }

    public function bookings() {
        return $this->hasMany(Booking::class, 'user_id');
    }

    public function wishlists() {
        return $this->hasMany(Wishlist::class, 'user_id');
    }

    public function checklists()
    {
        return $this->hasMany(Checklist::class, 'user_id');
    }

    public function guestlists()
    {
        return $this->hasMany(Guestlist::class, 'user_id');
    }
}