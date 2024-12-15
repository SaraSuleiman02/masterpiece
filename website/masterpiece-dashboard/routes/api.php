<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\APIControllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\ChecklistController;
use App\Http\Controllers\GuestlistController;
use App\Http\Controllers\GuestgroupController;
use App\Http\Controllers\WishlistController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Authenticated routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // User-related routes
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Checklist routes
    Route::get('/checklist/{id}', [ChecklistController::class, 'showChecklist']);
    Route::post('/checklist/add/{id}', [ChecklistController::class, 'addTask']);
    Route::put('/checklist/{userId}/{checklistId}', [ChecklistController::class, 'updateChecklist']);
    Route::delete('/checklist/{checklistId}', [ChecklistController::class, 'deleteChecklist']);

    // GuestList routes
    Route::get('/guestlist/{userId}', [GuestListController::class, 'index']);
    Route::post('/guestlist/add', [GuestlistController::class, 'store']);
    Route::put('/guestlist/{guestlistId}', [GuestlistController::class, 'update']);
    Route::delete('/guestlist/{guestlistId}', [GuestlistController::class, 'destroy']);

    // GuestGroup routes
    Route::post('/guestgroups', [GuestgroupController::class, 'store']);
    Route::get('/guestgroups', [GuestgroupController::class, 'show']);

    // Wishlist routes
    Route::get('/wishlist', [WishlistController::class, 'getWishlist']);
    Route::post('/wishlist/toggle', [WishlistController::class, 'toggleWishlist']);
    Route::get('/wishlist/isInWishlist', [WishlistController::class, 'isInWishlist']);
});

// User Profile routes
Route::get('/profile/{id}', [UserController::class, 'userProfile']);
Route::put('/profile/update/{id}', [UserController::class, 'updateUserProfile']);
Route::put('/profile/updatePass/{id}', [UserController::class, 'updateUserPassword']);

// Service routes
Route::get('/services', [ServiceController::class, 'getServices']);

// Vendor routes
Route::get('/vendor/{id}', [VendorController::class, 'getVendorsByService']);
