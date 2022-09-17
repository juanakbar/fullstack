<?php

namespace App\Http\Resources;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'price' => $this->price,
            'slug' => $this->slug,
            'name' => $this->name,
            'picture' => $this->picture ? Storage::url($this->picture) : null,
            // 'qr_code' => $this->payment_type !== 'bank_transfer' ? $this['payment_info']['qr_code'] : null,
            // 'status' => $this->status !== 0 ?  'Tersedia' : 'Tidak Tersedia',
            'status' => $this->status,
            'category' => [
                'id' => $this->category->id,
                'name' => $this->category->name,
                'slug' => $this->category->slug,
            ],
        ];
    }
}
