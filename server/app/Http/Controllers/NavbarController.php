<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class NavbarController extends Controller
{
    public function navTabData($navTab)
    {
    	try{
    		$result = DB::table($navTab)->get();

        	//dd($result);

        	return response($result);
    	}
    	catch(Exception $e)
    	{
    		report ($e);
    	}
    	
    }
}
