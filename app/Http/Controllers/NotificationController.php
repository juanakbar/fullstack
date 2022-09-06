<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Invoice;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class NotificationController extends Controller
{
    public function hit(Request $request)
    {
        $invoice = Invoice::where('order_id', $request->order_id)->first();
        // SHA512(order_id+status_code+gross_amount+ServerKey)
        $signature_key = hash('sha512', $invoice->order_id . $request->status_code . $invoice->gross_amount . '.00' . config('services.midtrans.server_key'));
        if ($request->signature_key == $signature_key) {
            if ($request->transaction_status == 'settlement') {
                $invoice->update([
                    'status' => $request->transaction_status,
                    'succeded_at' => $request->settlement_time,
                ]);

                $cartQuery = Cart::query()->whereIn('id', $invoice->cart_ids);

                $cartQuery->update([
                    'paid_at' => $request->settlement_time,
                ]);

                $product_ids = $cartQuery->pluck('product_id');
                $user = User::find($invoice->user_id);
                $user->products()->attach(
                    $product_ids,
                    [
                        'name' => $invoice->name,
                        'table' => $invoice->table,
                        'order_id' => $invoice->order_id,
                    ]
                );
                Cache::flush();
            }
        }
    }
}
