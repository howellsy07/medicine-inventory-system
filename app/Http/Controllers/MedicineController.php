<?php

namespace App\Http\Controllers;

use App\Models\Medicine;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MedicineController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => Medicine::query()->latest()->get(),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $medicine = Medicine::create($request->validate([
            'brand_name' => ['required', 'string', 'max:255'],
            'generic_name' => ['nullable', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:100'],
            'stock' => ['required', 'integer', 'min:0'],
            'quantity' => ['required', 'string', 'max:100'],
            'manufacturer' => ['nullable', 'string', 'max:255'],
            'expiry_date' => ['nullable', 'date'],
            'description' => ['nullable', 'string', 'max:1000'],
        ]));

        return response()->json([
            'message' => 'Medicine added successfully.',
            'data' => $medicine,
        ], 201);
    }

    public function show(Medicine $medicine): JsonResponse
    {
        return response()->json(['data' => $medicine]);
    }
}

