<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\APIControllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\ChecklistController;

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
    Route::get('/checklist/{id}', [ChecklistController::class,'showChecklist']);
    Route::post('/checklist/add/{id}', [ChecklistController::class, 'addTask']);
    Route::put('/checklist/{userId}/{checklistId}', [ChecklistController::class, 'updateChecklist']);
    Route::delete('/checklist/{checklistId}', [ChecklistController::class, 'deleteChecklist']);
    
    // GuestList routes
    

    // Wishlist routes
    // Route::post('/wishlist/toggle', [BoardController::class, 'toggleWishlist']);
    // Route::get('/wishlist', [BoardController::class, 'getWishlist']);
    // Route::get('/wishlist/isInWishlist', [BoardController::class, 'isInWishlist']);
    
    // // History routes
    // Route::post('/board/addToHistory', [BoardController::class, 'addToHistory']);
});

// User Profile routes
Route::get('/profile/{id}', [UserController::class, 'userProfile']);
Route::put('/profile/update/{id}', [UserController::class, 'updateUserProfile']);
Route::put('/profile/updatePass/{id}', [UserController::class, 'updateUserPassword']);

// Service routes
Route::get('/services', [ServiceController::class, 'getServices']);

// Vendor routes
Route::get('/vendor/{id}', [VendorController::class, 'getVendorsByService']);

