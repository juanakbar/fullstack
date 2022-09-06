<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\User;
use App\Models\Invoice;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Resources\InvoiceResource;

class TestController extends Controller
{
    public function index(Request $request)
    {
        // $user = User::find(auth()->user());
        $invoices = Invoice::where('order_id', $request->order_id)->get();
        $cartQuery = Cart::query()->whereIn('id', $invoices->cart_ids);
        $product_ids = $cartQuery->pluck('product_id');
        // $product_ids = $cartQuery->pluck('product_id');
        dd($invoices, $product_ids);
    }
}
