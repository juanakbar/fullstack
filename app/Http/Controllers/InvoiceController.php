<?php

namespace App\Http\Controllers;

use App\Http\Resources\InvoiceResource;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function store(Request $request)
    {
        // return $request->all();
        // return $request->table;
        $name = $request->collect('carts')->pluck('product');
        // dd($name->name);
        $total = (int) $request->total;
        $item_details = $request->collect('carts')->pluck('total');
        $cart_ids = $request->collect('carts')->pluck('id');
        $name = $request->name;
        $table = $request->table;
        $order_id = 'order-' . rand(1, 999999999) . rand(1, 999999999) . $request->user()->id;
        $invoiceExists = Invoice::where('order_id', $order_id)->firstOr(fn () => false);
        if ($invoiceExists) {
            return to_route('invoice.show', $invoiceExists);
        } else {
            $invoice =
                Auth::user()->invoices()->updateOrCreate(
                    compact('order_id'),
                    [
                        'name' => $request->name,
                        'order_id' => $order_id,
                        'gross_amount' => $total,
                        'cart_ids' => $cart_ids,
                        'payment_type' => $request->payment_type,
                        'table' => $request->table
                    ]
                );
            $data = [
                'payment_type' => $request->payment_type,
                'transaction_details' => [
                    'gross_amount' => $total,
                    'order_id' => $order_id,
                ],
                'customer_details' => [
                    'email' => $request->user()->email,
                    'first_name' => $request->user()->name,
                ],
                // 'item_details' =>  $test = $request->collect('carts')->map(fn ($item) => [
                //     'id' => $item['id'],
                //     'price' => (int) (round($item['quantity'] * $item['price'], 0) * (11 / 100) + $item['quantity'] * $item['price']),
                //     'quantity' => $item['quantity'],
                //     'name' => $item['product']['name'],
                // ]),
                // dd($test, $request->total),
            ];
            if ($request->payment_type == 'bank_transfer') {
                $data = [...$data, 'bank_transfer' => [
                    'bank' => $request->bank
                ]];
            };
            $response = Http::withBasicAuth(config('services.midtrans.server_key') . ':', '')
                ->post('https://api.sandbox.midtrans.com/v2/charge', $data);
            $pembayaran = $response->json();
            $invoice->update([
                'payment_info' => [
                    'qr_code' => $request->payment_type == 'gopay' ? $pembayaran['actions'][0]['url'] : null,
                    'bank' => $request->payment_type !== 'gopay' ? [
                        'name' => $pembayaran['va_numbers'][0]['bank'],
                        'va_number' => $pembayaran['va_numbers'][0]['va_number'],
                    ] : null,
                ]
            ]);
            $response->json();
            return to_route('invoice.show', $invoice);
        }
    }


    public function show(Invoice $invoice)
    {
        return inertia('Invoices/Show', [
            'invoice' => new InvoiceResource($invoice)
        ]);
    }

    public function order(Invoice $invoice)
    {
    }


    public function invoice()
    {
        $invoice = Invoice::where('user_id', Auth::user()->id)
            ->get();
        return inertia('Invoices/Table', [
            'invoice' => $invoice
        ]);
    }

    public function receipt(Invoice $invoice)
    {
        // dd($invoice);
        return inertia('Invoices/Index', [
            'invoice' => $invoice
        ]);
    }
}
