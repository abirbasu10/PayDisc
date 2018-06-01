<?php

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

Route::get('/', function () {
    return view('welcome');
});

//Route::middleware('CORS')->post('initialData' , 'NavbarInitialController@index');
/*Route::resource('/categoryData', 'NavbarCategoryController', ['only' => [
    'index', 'store', 'update', 'destroy'
]]);

Route::resource('/financialInstData', 'NavbarFinancialInstController', ['only' => [
    'index', 'store', 'update', 'destroy'
]]);*/

Route::get('/navbar/{navTab}', 'NavbarController@navTabData');

Route::get('/navbar/suggestionData/{searchVal}', 'SearchSuggestionController@searchSuggest');

Route::get('/offerListData/{offerStream}/{offerDomain}', 'OfferListController@getOfferList');

Route::get('/offerDetails/{offerName}', 'OfferListController@getOfferDetails');

Route::get('/viewImage/{offerId}', 'ImageViewController@getImage');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
