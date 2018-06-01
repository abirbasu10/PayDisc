<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

class ImageViewController extends Controller
{
    //
    public function getImage($id)
    {
      try{

            /*$location = DB::select("select photograph from members where id = ?",[$id]);
            //dd($location);
            $imgPath=env("IMAGE_PATH").DIRECTORY_SEPARATOR.$location[0]->photograph;


            if($location[0]->photograph=="" ||$location[0]->photograph==null || !file_exists($imgPath))
            {
                $imgPath="images\default-avatar.jpg";

            }*/
              //return response()->file(env("MEMBER_PROFILE_IMAGE_LOCATION").$location[0]->photograph);
            $imgPath="D:/newsImage/1510293724_0.png";
            return response()->file($imgPath);

        }

       catch(Exception $e)
       {
        	report($e);
       } 
    }
}
