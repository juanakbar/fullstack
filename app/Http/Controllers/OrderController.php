<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\UserOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ReceiptResource;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(UserOrder $order, Request $request)

    {
        $order = UserOrder::where('user_id', Auth::user()->id)
            ->get()
            ->groupBy(['order_id']);
        $orderedBy = UserOrder::whereBelongsTo($request->user())->orderBy('proses', 'asc')->limit(1)->paginate(10);
        // dd($order, $orderedBy);/
        return inertia('Orders/Order', [
            'order' => $order,
            'orderedBy' => $orderedBy->load('invoice', 'cart')
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $orderedBy = UserOrder::whereBelongsTo($request->user())
            ->with('invoice', 'cart')
            ->where('order_id', $id)
            ->get();
        // return ReceiptResource::collection($orderedBy->load('invoice', 'cart'));
        return inertia('Orders/Show', [
            'orderedBy' =>  ReceiptResource::collection($orderedBy)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
