<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReceiptResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'cart_id' => $this->cart_id,
            'invoice_id' => $this->invoice_id,
            'order_id' => $this->order_id,
            'cart' => [
                'id' => $this->cart->id,
                'price' => $this->cart->price,
                'quantity' => $this->cart->quantity,
                'total' => $this->cart->total,
            ],
            'product' => [
                'price' => $this->cart->product->price,
                'name' => $this->cart->product->name,
            ],
            'invoice' => [
                'id' => $this->invoice->id,
                'name' => $this->invoice->name,
                'table' => $this->invoice->table,
                'cart_ids' => $this->invoice->cart_ids,
                'order_id' => $this->invoice->order_id,
                'gross_amount' => $this->invoice->gross_amount,
                'qr_code' => $this->invoice->payment_type !== 'bank_transfer' ? $this['payment_info']['qr_code'] : null,
                'bank' => $this->invoice->payment_type == 'bank_transfer' ? [
                    'name' => $this->invoice->payment_info['bank']['name'],
                    'va_number' => $this->invoice->payment_info['bank']['va_number'],
                ] : null,
            ],
        ];
    }
}
