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
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ProductsController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\InvoiceController as Resi;

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
        Route::get('/invoices', 'invoice')->name('invoice.index');
        Route::get('/receipt/{invoice:order_id}', 'receipt')->name('invoice.receipt');
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
Route::group(['middleware' => ['auth', 'role:Super Admin']], function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');
    //    Route::resource('user', UserController::class);
    Route::get('users', [UserController::class, 'index'])->name('users.index');
    Route::get('users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('users', [UserController::class, 'store'])->name('users.store');
    Route::get('users/{user}', [UserController::class, 'show'])->name('users.show');
    Route::get('users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::put('users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

    Route::get('products', [ProductsController::class, 'index'])->name('products.index');
    Route::get('products/create', [ProductsController::class, 'create'])->name('products.create');
    Route::post('products', [ProductsController::class, 'store'])->name('products.store');
    Route::get('products/{product:slug}/edit', [ProductsController::class, 'edit'])->name('products.edit');
    Route::put('products/{product:slug}', [ProductsController::class, 'update'])->name('products.update');
    Route::get('products/{product:slug}', [ProductsController::class, 'destroy'])->name('products.destroy');

    // Route::resource('categories', CategoryController::class);
    Route::get('categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::get('categories/create', [CategoryController::class, 'create'])->name('categories.create');
    Route::post('categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::get('categories/{category:slug}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
    Route::put('categories/{category:slug}', [CategoryController::class, 'update'])->name('categories.update');
    Route::get('categories/{category:slug}', [CategoryController::class, 'destroy'])->name('categories.destroy');


    // For Invoice
    Route::get('invoices', [Resi::class, 'index'])->name('invoice.index');
});
require __DIR__ . '/auth.php';
