<?php

use Illuminate\Support\Facades\Route;

Route::get('/', fn () => response()->json([
    'name' => 'Medicine Inventory API',
    'status' => 'running',
]));

