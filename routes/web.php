<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware('redirectBasedOnRole')->get('/', function () {
    return Inertia::render('login/page');
})->name('login');

Route::middleware('auth:sanctum', 'role:1')->prefix('admin')->group(function () {
    
    Route::get('dashboard', function () {
        return Inertia::render('admin/dashboard/page');
    });

    Route::prefix('user_management')->group(function () {
        Route::get('/', function () {
        return Inertia::render('admin/user_management/page');
        });

        /* Route::get('/{id}', function ($id) {
            $user = Profiling::find($id);
    
            if (!$user) {
                return redirect()->route('user.index')->withErrors('Product not found');
            }
    
            return Inertia::render('admin/user_management/id/page', [
                'user' => $user
            ]);
        }); */
    });

    
    Route::get('reports', function () {
        return Inertia::render('admin/reports/page');
    });

});

Route::middleware('auth:sanctum', 'role:2')->get('/user/dashboard', function () {
    return Inertia::render('user/dashboard/page');
});


/* Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
}); */

/* Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
}); */

require __DIR__.'/auth.php';
