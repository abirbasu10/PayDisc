import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OffersService } from '../../offers.service';
import { PaginationService } from '../../pagination.service';
import { DataExchangeService } from '../../data-exchange.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-list-of-offers',
  templateUrl: './list-of-offers.component.html',
  styleUrls: ['./list-of-offers.component.css']
})
export class ListOfOffersComponent implements OnInit, OnDestroy {

  urlSuffix:string="";
  offerlist:any[]=[]
  offerStore:any[]=[]//fields are storeName and offerName i.e [{storeName:"",offerName:"", category:"",bank:"",expiry:""}]
  offerStream:string="";
  offerDomain:string="";

  // pager object
  pager: any = {};
 
  // paged items
  pagedItems: any[];

  navigationSubscription;
  
  constructor(
      private route: ActivatedRoute,
      private offerService: OffersService,
      private pageService: PaginationService,
      private dataEx: DataExchangeService,
      private router: Router,
      /* this.dataEx.offerListFunc = this.getOffers; */
    ) { 
      //alert("offer list constructor")
      this.navigationSubscription = this.router.events.subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.getOffers();
        }
      });
      //this.dataEx.offerListFunc = this.getOffers();
    }

  ngOnInit() {
    
    /* alert("offerStream: "+this.offerStream);
    alert("offerDomain: "+this.offerDomain); */

    /* this.offerlist=[
      {
        offerId:2,offerName:"10% off on Redmi Mobile",offerValue:"10% Off",details:"Flat off on Redmi",
        cityName:"Kolkata",category:"Mobile",catId:2,catParentId:1,store:"The Mobile Store", branch:"60 Park Street"
      },
      {
        offerId:2,offerName:"10% off on Redmi Mobile",offerValue:"10% Off",details:"Flat off on Redmi",
        cityName:"Kolkata",category:"Mobile",catId:2,catParentId:1,store:"The Mobile Store", branch:"60B Wood Street"
      },
      {
        offerId:2,offerName:"15% off on Redmi Note 5",offerValue:"15% Off",details:"Flat off on Redmi",
        cityName:"Kolkata",category:"Mobile",catId:2,catParentId:1,store:"The Mobile Store", branch:"60B Wood Street"
      },
      {
        offerId:4,offerName:"10% off on iPhone X",offerValue:"10% Off",details:"Flat off on iPhone",
        cityName:"Kolkata",category:"Mobile",catId:2,catParentId:1,store:"Apple Store", branch:"Mani Square Mall"
      },
      {
        offerId:4,offerName:"10% off on iPhone X",offerValue:"10% Cash Back",details:"Flat off on iPhone",
        cityName:"Kolkata",category:"Mobile",catId:2,catParentId:1,store:"Apple Store", branch:"South City Mall"
      },
      {
        offerId:4,offerName:"10% off on MacBook Air",offerValue:"10% Off",details:"Flat off on MacBook",
        cityName:"Kolkata",category:"Mobile",catId:2,catParentId:1,store:"Apple Store", branch:"Mani Square Mall"
      },
      {
        offerId:4,offerName:"10% off on MacBook Air",offerValue:"10% Cash Back",details:"Flat off on MacBook",
        cityName:"Kolkata",category:"Mobile",catId:2,catParentId:1,store:"Apple Store", branch:"South City Mall"
      },

      //dummy..dont care values
      {
        offerId:2,offerName:"10% off on Redmi Mobile",offerValue:"10% Off",details:"Flat off on Redmi",
        cityName:"Kolkata",category:"Mobile",catId:2,catParentId:1,store:"The Mobiless Store", branch:"60 Park Street"
      },
      {
        offerId:4,offerName:"10% Cashback on iPhone X",offerValue:"10% Off",details:"Flat off on iPhone",
        cityName:"Kolkata",category:"Mobile",catId:2,catParentId:1,store:"Apples Store", branch:"Mani Square Mall"
      },
      {
        offerId:4,offerName:"10% Cashback on iPhone X",offerValue:"10% Cash Back",details:"Flat off on iPhone",
        cityName:"Kolkata",category:"Mobile",catId:2,catParentId:1,store:"Applesss Store", branch:"South City Mall"
      },
      {
        offerId:4,offerName:"10% Cashback on iPhone X",offerValue:"10% Cash Back",details:"Flat off on iPhone",
        cityName:"Kolkata",category:"xyz",catId:2,catParentId:1,store:"Applesssssss Store", branch:"South City Mall"
      },
      
    ];
    this.consolidateOffers();
    this.setPage(1) */
    this.getOffers();

    

    //console.log(this.offerStore)
     
  }

  ngOnDestroy(){
    if (this.navigationSubscription) {  
      this.navigationSubscription.unsubscribe();
   }
  }

  getOffers()
  {
    this.offerStream = this.route.snapshot.paramMap.get('offerStream');
    this.offerDomain = this.route.snapshot.paramMap.get('offerDomain');
    /* this.offerStream=offerStrm;
    this.offerDomain=offerDmn; */
    //alert("from getOffers")
    this.urlSuffix="offerListData/"+this.offerStream+"/"+this.offerDomain
    this.offerService.getOfferListFromDB(this.urlSuffix)
      .subscribe(res => {
        this.offerlist= JSON.parse(res._body);
        console.log(this.offerlist)
        //this.consolidateOffers();
        this.setPage(1)
      }, error => {
        console.error(error);
      });
  }

  consolidateOffers()
  {
    //consolidate offers based on offer name

    /* offerStore holds only those offers with unique name i.e two offers with same name is considered
    as one offer */

    this.offerStore=[];
    for(let offers of this.offerlist)
    {
      var store=this.offerStore.find(st=>st.storeName==offers.store && st.offerName==offers.offerName);
      
      if(store==undefined || store==null)
      {
        //if(offers.category==this.offerDomain)
        //{
          this.offerStore.push({offerId:offers.offerId,storeName:offers.store,
            offerName:offers.offerName,category:offers.category});
        //}
      }
      /* if(store!=undefined || store!=null)
      {
        store.offerCount=store.offerCount+1;
      }
      else
      {
        this.offerStore.push({storeName:offers.store,offerCount:1});
      } */
    }
  }

  goToOfferDetails(offerName)
  {
    /* Send data to another component--offer-details component--using DataExchangeService service */
    this.dataEx.setData(this.offerlist);
    this.router.navigate(["user/offerDetails/"+offerName]);
  }

  setPage(page: number) 
  {

    //perform pagination on consolidated offers

    //set number of items to be shown on one page
    var pageSize=4;

    // get pager object from service
    this.pager = this.pageService.getPager(this.offerlist.length, page, pageSize);
    console.log("pager: ",this.pager)

    // get current page of items
    this.pagedItems = this.offerlist.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log("paged items: ",this.pagedItems)
  }

}
