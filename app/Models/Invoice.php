<?php

namespace App\Models;

use App\Enums\InvoiceStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Invoice extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $casts = [
        'succeeded_at' => 'datetime',
        'payment_info' => 'array',
        'cart_ids' => 'array',
        'status' => InvoiceStatus::class,
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
