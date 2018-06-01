<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class SearchSuggestionController extends Controller
{
    //
    public function searchSuggest( $searchVal)
    {
    	try
    	{
    		//dd($searchVal);
    		/*$fields = ['searchVal'];
			$searchField=$request->only($fields);
			$searchField['searchVal']="foo";*/
			//dd($searchField);
			//$categories=DB::select("select * from categories where name like '%foo%'");
			
			//$categories=DB::select("select name from categories where name like '%".$searchField['searchVal']."%'");
			$categories=DB::select("select name from categories where name like '%".$searchVal."%'");
			//$categories = DB::table('categories')->where('name', '%'.$searchField['searchVal'].'%')->get();

			//dd($categories);

			//$stores=DB::select("select name from stores where name like '%".$searchField['searchVal']."%'");
			$stores=DB::select("select name from stores where name like '%".$searchVal."%'");
			//dd($stores);
			$response=array();
			$response[]=[['source'=>'Categories','value'=>$categories],['source'=>'Stores','value'=>$stores]];
			//dd($response);
			//array_push($response,[['source':'categories']])
			//$response=[{'categories':$category}];
			return response($response);
    	}
    	catch(Exception $e)
    	{
    		report($e);
    	}
    	
    }
}
