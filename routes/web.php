<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\Admin\ProductsController;
use App\Http\Controllers\Admin\DashboardController;

Route::get('/', IndexController::class)->name('index');


// Route For Menu Controller
Route::controller(MenuController::class)->group(function () {
    Route::get('/menu', 'index')->name('menu.index');
    Route::get('/menu/{product:slug}', 'show')->name('menu.show');
});

Route::middleware('auth')->group(function () {
    // Route For Cart Controller
    Route::controller(CartController::class)->group(function () {
        Route::get('/cart', 'index')->name('cart.index');
        Route::delete('/cart/delete/{cart:id}', 'destroy')->name('cart.destroy');
        Route::post('/cart/{product:slug}', 'store')->name('cart.store');
    });
    // Route For Invoice Controller
    Route::controller(InvoiceController::class)->group(function () {
        Route::post('/invoice', 'store')->name('invoice.store');
        Route::get('/invoice/{invoice:order_id}', 'show')->name('invoice.show');
    });

    Route::controller(OrderController::class)->group(function () {
        Route::get('/order/history', 'index')->name('order.index');
        Route::get('/order/{order:order_id}', 'show')->name('order.show');
    });
});

Route::post('api/notification/handling', [NotificationController::class, 'hit']);

Route::get('thanks', function () {
    return 'thanks';
})->name('thanks');


// Admin Dashboard
Route::group(['middleware' => ['role:Super Admin']], function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');
    Route::resource('user', UserController::class);
    Route::resource('products', ProductsController::class);
});
require __DIR__ . '/auth.php';
