<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medicine extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand_name',
        'generic_name',
        'category',
        'stock',
        'quantity',
        'manufacturer',
        'expiry_date',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'stock' => 'integer',
            'expiry_date' => 'date:Y-m-d',
        ];
    }
}

