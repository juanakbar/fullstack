<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Http\Resources\ProductResource;
use App\Models\Invoice;

class IndexController extends Controller
{
    public function __invoke(Request $request)
    {

        $products = Product::query()
            ->with('category')
            ->when($request->category, fn ($q, $v) => $q->whereBelongsTo(Category::where('slug', $v)->first()))
            ->select('id', 'price', 'slug', 'name', 'picture', 'category_id')
            ->where('status', 1)
            ->paginate(8)
            ->withQueryString();
        Cache::forget('carts_global_count');
        return inertia('Index', [
            'products' => ProductResource::collection($products),
        ]);
    }
}
