<?php

namespace app\Http\Controllers\APIControllers;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Response;



class RocketController extends Controller
{
  
//protected $listOfNearByStores = array();
//private $xyz;
  
    function __construct()
    {
        //$this->glob =& $GLOBALS
        //$this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
		$result = DB::select ("select id,name from categories");
		 	
        //dd($result); 
         return response($result);
        
    }
    
    public function getOfferLocation(Request $request)
    {
      //dd($this->xyz)
      //$totalList = sizeof($this->listOfNearByStores);

      $latlon = "22.479576,88.347344";
      $offers = array();
      $catId =  $request->catId;
      //for($i=0; $i<$totalList; ++$i)
      //{
        //$latlon = $this->listOfNearByStores[0]->lat .",". $this->listOfNearByStores[0]->lng;
      $offers = DB::select("select  s.name as name,sb.address,sb.location,o.name as offrName,o.value,o.details,sb.geo_location as latlon 
          from  
          store_mappings sm,offers o, store_branches sb, stores s
          where s.category_id =".$catId."
          and sb.store_id = s.id 
          and sm.store_branch_id = sb.id 
          and o.id=sm.offer_id
          group by s.id");
      
     // }
        // $locations = DB::table('categories')->get();

        // return $locations;

        return $offers;

    }

    public function getExactLocation(Request $request)
    {
      //header("Access-Control-Allow-Origin", "http://localhost:4200");

        //$defaultSearchPlace = "Pantaloons";

        $latlon = array();
        //dd($request->url);

            $url = $request->url . "&key=AIzaSyCybFWDTuPFDnip2qJWwSUSNHCOTqVrz5Q";
                 /*
            Creates a Guzzle Client to make the Google Maps request.
          */
          $client = new \GuzzleHttp\Client();

          /*
            Send a GET request to the Google Maps API and get the body of the
            response.
          */
          $geocodeResponse = $client->get( $url )->getBody();

          /*
            JSON decodes the response
          */
          $geocodeData = json_decode( $geocodeResponse ); // total json data

          //dd($geocodeData->results[0]->address_components[0]->long_name); // total results of the API

          return Response::json([$geocodeData->results[0]->formatted_address]);
    }

    public function getCities(){

      $cities = DB::select("Select id,name from city");
      return Response::json([$cities]);
    }

    public function getCityByLatLon(Request $request)
    {
      $latlon = $request->latlon;
      $url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=".$latlon."&key=AIzaSyCybFWDTuPFDnip2qJWwSUSNHCOTqVrz5Q";

      $cities = DB::select("Select id,name from city");

      $exactCity="";
      $client = new \GuzzleHttp\Client();


      /*
        Send a GET request to the Google Maps API and get the body of the
        response.
      */
      $geocodeResponse = $client->get( $url )->getBody();

      /*
        JSON decodes the response
      */
      $geocodeData = json_decode( $geocodeResponse ); // total json data

      //dd($geocodeData->results[0]->address_components);

      for ($i = 0; $i< sizeof($geocodeData->results[0]->address_components); $i++) 
      {
        $component = $geocodeData->results[0]->address_components[$i];
        
        for ($j = 0; $j < sizeof($cities); ++$j )
        {
          
          if($cities[$j]->name == $component->long_name)
          {
            
              $exactCity = $cities[$j];
              break;
          }
        }

    };

    return Response::json([$exactCity]);
    }

    public function parseJson(Request $request)
    {
      //header("Access-Control-Allow-Origin", "http://localhost:4200");

        //$defaultSearchPlace = "Pantaloons";

        $latlon = array();
        //dd($request->url);

            $url = $request->url . "&radius=500&types=stores&sensor=true&key=AIzaSyCybFWDTuPFDnip2qJWwSUSNHCOTqVrz5Q";
                 /*
            Creates a Guzzle Client to make the Google Maps request.
          */
          $client = new \GuzzleHttp\Client();

          /*
            Send a GET request to the Google Maps API and get the body of the
            response.
          */
          $geocodeResponse = $client->get( $url )->getBody();

          /*
            JSON decodes the response
          */
          $geocodeData = json_decode( $geocodeResponse ); // total json data

         // dd(sizeof($geocodeData->results)); // total results of the API
        //dd($this->getOfferLocation());
        //dd($geocodeData->results[0]->geometry->location);
        //dd($geocodeData);
          for($i=0; $i<sizeof($geocodeData->results);$i++)
          {
           // dd($this->listOfNearByStores);
            //dd($geocodeData->results[$i]->geometry->location);
            array_push($latlon,$geocodeData->results[$i]->geometry->location);

          }
       

         return Response::json([$latlon]);

    }
    
}
