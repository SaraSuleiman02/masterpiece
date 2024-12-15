<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'service_id',
        'location',
        'about',
        'price',
    ];

    public function service() {
        return $this->belongsTo(Service::class);
    }

    public function bookings()
    {
        return $this->belongsToMany(Booking::class, 'booking_vendor','vendor_id', 'booking_id');
    }

    public function wishlists()
    {
        return $this->belongsToMany(Wishlist::class, 'wishlist_vendor','vendor_id', 'wish_id');
    }
}