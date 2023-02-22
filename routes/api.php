<?php

use App\Http\Controllers\ImageController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/register', [UserController::class,'create'])->name('user.create');
Route::post('/login', [UserController::class,'login'])->name('user.login');

Route::group(['middleware' => ['auth:api']], function () {

    Route::post('/image', [ImageController::class,'store'])->name('image.store');
    Route::get('/image', [ImageController::class,'index'])->name('image.index');
    Route::delete('/image/{id}', [ImageController::class,'delete']);

});

