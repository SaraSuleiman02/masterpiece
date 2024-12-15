<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;
    
    protected $fillable = ['name', 'description', 'img_path'];

    public function vendors() {
        return $this->hasMany(Vendor::class);
    }
}