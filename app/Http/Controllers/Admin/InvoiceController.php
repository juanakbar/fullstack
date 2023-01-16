<?php

namespace App\Http\Controllers\Admin;

use App\Models\Invoice;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class InvoiceController extends Controller
{
    public function index()
    {
        return inertia('Dashboard/Invoice/Index', [
            'invoice' => Invoice::with('user')->whereNotNull('succeded_at')->latest()->paginate(50)
        ]);
    }
}
