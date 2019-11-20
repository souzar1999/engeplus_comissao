<?php

use Illuminate\Http\Request;

//Seller
Route::get('sellers', 'SellersController@index');
 
Route::get('sellers/{seller}', 'SellersController@show');
 
Route::post('sellers','SellersController@store');
 
Route::put('sellers/{seller}','SellersController@update');
 
Route::delete('sellers/{seller}', 'SellersController@delete');

Route::get('sellers/commission/{seller}', 'SellersController@getCommission');

//Sell

Route::get('sellers/{seller}/sells', 'SellsController@index');
 
Route::get('sellers/{seller}/sells/{sell}', 'SellsController@show');
 
Route::post('sellers/{seller}/sells','SellsController@store');
 
Route::delete('sellers/{seller}/sells/{sell}', 'SellsController@delete');

//SellItems

Route::get('sellers/{seller}/sells/{sell}/items', 'SellItemsController@index');
 
Route::post('sellers/{seller}/sells/{sell}/items','SellItemsController@store');
 
Route::delete('sellers/{seller}/sells/{sell}/items/{sellitem}', 'SellItemsController@delete');

//User auth
Route::post('login', 'API\UserController@login');

Route::post('register', 'API\UserController@register');

Route::group(['middleware' => 'auth:api'], function(){ 
  Route::post('details', 'API\UserController@details');
});
