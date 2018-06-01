<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use DB;

use Illuminate\Http\Request;

class OfferListController extends Controller
{
	public function getOfferList($offerStream, $offerDomain )
	{
		try
		{
			$chosenCity="Kolkata";
			$chosenBank="Hdfc";
			$query="select o.id as offerId, o.name as offerName,o.value,o.details , c.name as category, s.name as store,sb.address,sb.location, cty.name as city,fi.name as bank, br.name as brand from store_mappings sm,offers o, store_branches sb, stores s, categories c, offersmapping om, city cty, financialinstitutes fi, brands br where o.city_id=cty.id and cty.name like '".$chosenCity."' and sb.store_id = s.id and sm.store_branch_id = sb.id and om.offer_id=o.id and om.cat_id=c.id and om.financial_institute_id=fi.id and om.brand_id=br.id and o.id=sm.offer_id";

			//dd($offerStream);
			if(strtolower($offerStream)=="offers")
			{
				$query=$query." and o.name like '%".$offerDomain."%' ";
			}
          	else if(strtolower($offerStream)=="categories" || strtolower($offerStream)=="category")
          	{
          		$query=$query." and c.name like '%".$offerDomain."%' ";
          	}
          	else if(strtolower($offerStream)=="stores")
          	{
          		$query=$query." and s.name like '%".$offerDomain."%' ";
          	}
          	else if(strtolower($offerStream)=="financialinstitutes")
          	{
          		$query=$query." and fi.name like '%".$offerDomain."%' ";
          	}
          	else if(strtolower($offerStream)=="brands")
          	{
          		$query=$query." and br.name like '%".$offerDomain."%' ";
          	}


          	$query=$query." group by offerName";
          	$query=$query." order by (bank in('".$chosenBank."')) DESC";

          	//dd($query);

			$finalResult=DB::select($query);
			//dd($finalResult);
			return response($finalResult);
		}
		catch(Exception $e)
		{
			report ($e);
		}
	}

	public function getOfferDetails($offerName)
	{
		try
		{
			/*$query="select o.name as offername, o.id as offerId, o.details as offerDetails, o.valid_from as validFrom, o.exp_date as validTill, o.valid_for as validFor, s.name as store, sb.address as branches, c.name as category from offers o, offersmapping om, stores s, store_mappings sm, store_branches sb, categories c where om.offer_id=o.id and om.cat_id=c.id and  sm.offer_id=o.id and sm.store_id=s.id and sm.store_branch_id=sb.id and o.name like '%".$offerName."%'";*/

			$query="select o.name as offername, o.id as offerId, o.details as offerDetails, o.valid_from as validFrom, o.exp_date as validTill, o.valid_for as validFor, s.name as store, sb.address as branches, c.name as category, fi.name as bank, br.name as brand from offers o, offersmapping om, stores s, store_mappings sm, store_branches sb, categories c, financialinstitutes fi, brands br where om.offer_id=o.id and om.cat_id=c.id and om.financial_institute_id=fi.id and om.brand_id=br.id and sm.offer_id=o.id and sm.store_id=s.id and sm.store_branch_id=sb.id and o.name like '%".$offerName."%'";

			//dd($query);
			$finalResult=DB::select($query);
			//dd($finalResult);
			return response($finalResult);
		}
		catch(Exception $e)
		{
			report ($e);
		}
	}


    public function getOfferList2(Request $request)
    {
    	try
    	{
    		$chosenCity="Kolkata";
    		$selectPart="select o.id as offerId,o.name as offerName,o.value as offerValue, cty.name as cityName ";
    		$fromPart="from offers o, offersmapping om, city cty " ;

			$conditionPart="where om.offer_id=o.id and o.city_id=cty.id and cty.name like '%".$chosenCity."%' and (";
			$groupBy="group by ";

			$initialConditionLength=strlen($conditionPart);
			//$groupBy=" group by (offerId, offerName, offerValue, cityName";
    		/*$fields = ['searchVal'];
			$searchField=$request->only($fields);
			$searchField['searchVal']="foo";*/

			$paramRecvd="Mobile";

			//checking if received parameter is a category
			$category=DB::select("select name from categories where name like '%".$paramRecvd."%'");
			if($category)
			{
				//dd($category);
				$selectPart=$selectPart.", c.name as category, c.id as catId,c.parent_id as catParentId ";
				$fromPart=$fromPart.", categories c ";
				if(strlen($conditionPart)>$initialConditionLength)
				{
					$conditionPart=$conditionPart." or ";
				}
				$conditionPart=$conditionPart." ( om.cat_id=c.id and c.name like '%".$paramRecvd."%' )";
				//$groupBy=$groupBy.", category, catId, catParentId";
			}

			//checking if received parameter is a store
			$stores=DB::select("select name from stores where name like '%".$paramRecvd."%'");
			if($stores)
			{
				//dd($category);
				$selectPart=$selectPart.", s.name as store,sb.address as branch ";
				$fromPart=$fromPart.", stores s, store_branches sb, store_mappings sm ";
				if(strlen($conditionPart)>$initialConditionLength)
				{
					$conditionPart=$conditionPart." or ";
				}
				$conditionPart=$conditionPart." (sm.offer_id=o.id and sm.store_id= s.id and sb.city_id=cty.id and sb.store_id=s.id and s.name like '%".$paramRecvd."%' )";
				//$groupBy=$groupBy.", store, branch";
			}


			$groupBy=$groupBy."(offerId)";
			$query=$selectPart.$fromPart.$conditionPart.")".$groupBy;
			dd($query);

			$finalResult=DB::select($query);
			dd($finalResult);

    	}
    	catch(Exception $e)
    	{
    		report ($e);
    	}
    }
}
