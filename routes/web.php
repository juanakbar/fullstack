<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\IndexController;

Route::get('/', IndexController::class)->name('index');
Route::get('/menu', [MenuController::class, 'index'])->name('menu.index');
Route::get('/menu/{product:slug}', [MenuController::class, 'show'])->name('menu.show');


Route::middleware('auth')->group(function () {
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::delete('/cart/delete/{cart:id}', [CartController::class, 'destroy'])->name('cart.destroy');
    Route::post('/cart/{product:slug}', [CartController::class, 'store'])->name('cart.store');
});


require __DIR__ . '/auth.php';
