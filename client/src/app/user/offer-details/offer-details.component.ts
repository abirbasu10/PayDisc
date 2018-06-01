import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OffersService } from '../../offers.service';
import { DataExchangeService } from '../../data-exchange.service';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {
  
  urlSuffix:string="";
  allLoaded:boolean=false;
  
  offerlist:any[]=[];
  offerName:string="";
  reqdOffers:any[]=[];
  reqdOffer:any;

  constructor(
    private route: ActivatedRoute,
    private dataEx: DataExchangeService,
    private offerService: OffersService,
  ) { }

  ngOnInit() {
    this.offerName = this.route.snapshot.paramMap.get('offerName');
    /* Get data sent by another component--list-of-offers component-- using DataExchangeService service */
    /* this.offerlist = this.dataEx.getData();
    if(this.offerlist)
    {
      console.log("data recvd from service", this.offerlist)
    } */
    /* else
    {
      this.offerlist=[
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
          cityName:"Kolkata",category:"Mobile",catId:2,catParentId:1,store:"Applesssssss Store", branch:"South City Mall"
        },
        
      ];
      console.log("normal data", this.offerlist)
    } */
    
    this.getOfferDetails();
    
  }

  getOfferDetails()
  {
    this.urlSuffix="offerDetails/"+this.offerName;
    this.offerService.getOfferListFromDB(this.urlSuffix)
      .subscribe(res => {
        this.offerlist= JSON.parse(res._body);
        console.log(this.offerlist)
        this.getOneOfferInstance()
      }, error => {
        console.error(error);
      });
  }

  getOneOfferInstance()
  {
    //this.reqdOffers=this.offerlist.filter(off=>off.offerName==this.offerName);
    this.reqdOffer=this.offerlist[0];
    this.allLoaded=true;
  }
}
