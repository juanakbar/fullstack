<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\User;
use App\Models\Invoice;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Resources\InvoiceResource;
use App\Models\Order;

class TestController extends Controller
{
    public function index(Request $request)
    {
        $order = Order::whereBelongsTo($request->user())->get()->load('cart');
        dd($order, $order->cart);
        return inertia('Test/Index', [
            'order' => $order
        ]);
    }
}
