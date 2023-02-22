<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;
    protected $fillable = [
        'image','title'
    ];
    public function getImageAttribute($value = '')
    {
        if (!empty($value)) {
            return asset('/uploads/profile/' . $value);
        }
        return asset('/admin/logo/user_logo.jpg');
    }
}
