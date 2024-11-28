<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::all();
        return response()->json([
            'response' => $user
        ], 200); 
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validateData = $request->validate([
            'name' => 'required|string|max:225',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'role_id' => 'required',
        ]);

        // Hash the password before saving the user
        $validateData['password'] = Hash::make($request->password);

        // Create the user with the validated data
        $user = User::create($validateData);

        // Return a response with a success message
        return response()->json(['message' => 'Account created successfully', 'user' => $user], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user =  User::where('id', $id)->first();
        return response()->json([
            'response' => $user
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Validate the incoming data
        $validateData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $id, // Unique except for the current user
            'password' => 'nullable|min:8', // Password is optional
            'role_id' => 'sometimes|required|integer',
        ]);

        // Find the user by ID
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Update the user's data
        if (isset($validateData['password'])) {
            $validateData['password'] = bcrypt($validateData['password']); // Hash the password
        }

        $user->update($validateData);

        return response()->json([
            'message' => 'User updated successfully',
            'response' => $user
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully'], 200);
    }
}
