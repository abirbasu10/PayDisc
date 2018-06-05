import { Component, OnInit, Input } from '@angular/core';
import { NavbarService } from '../../navbar.service';
import { Router } from '@angular/router';
import { DataExchangeService } from '../../data-exchange.service';
import { ListOfOffersComponent } from '../list-of-offers/list-of-offers.component'
/* import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'; */

declare const $;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //listOfOffers:ListOfOffersComponent;
  defaultCity:string="Kolkata";
  urlSuffix:string="";
  categoryFromDB:any[]=[];
  categories:any[]=[];
  //category:any;
  subcategories:any[]=[];
  /* subcats:any[]=[["subcat 1-1","subcat 1-1","subcat 1-1"],["subcat 2-1","subcat 2-1","subcat 2-1"],["subcat 3-1","subcat 3-1","subcat 3-1"]]
  subcat:any[]=[] */
  suggestionFromDB:any[]=[];
  selectedCity : string;
  @Input() offerList: ListOfOffersComponent;


  financeInstFromDB:any[]=[];
  storesFromDB:any[]=[];
  brandsFromDB:any[]=[];

  constructor(
    private navService: NavbarService, 
    private router: Router,
    private dataEx: DataExchangeService,
  ) 
  { } 

  ngOnInit() {
    //this.selectedCity = this.dataEx.getData()
    
    //this.subcat=this.subcats[0];
    this.getCategory();
    this.getFinancialInst();
    this.getStores();
    this.getBrands();

    //this.setCategories();
  }

  getSearchSuggestions(search)
  { 
    this.suggestionFromDB=[];
    if(search.value.length>2)
    {
      //alert(search.value)
      this.urlSuffix="/suggestionData/"+search.value
      this.navService.getSuggestion(this.urlSuffix,search.value)
      .subscribe(res => {
        this.suggestionFromDB= JSON.parse(res._body);
         console.log(this.suggestionFromDB)
        /*alert(this.categoryFromDB[0].name) */
        //this.setCategories();
        
      }, error => {
        console.error(error);
      });
    }
  }

  getCategory() {
    this.urlSuffix="/categories"
    this.navService.getNavbarDataFromDB(this.urlSuffix)
      .subscribe(res => {
        this.categoryFromDB= JSON.parse(res._body);
        /* console.log(this.categoryFromDB)
        alert(this.categoryFromDB[0].name) */
        this.setCategories();
        
      }, error => {
        console.error(error);
      });
    /* this.getCategoryFromDB()
      .subscribe(res => {
        this.categoryFromDB= JSON.parse(res._body);
        console.log(this.categoryFromDB)
        alert(this.categoryFromDB[0].name)
        this.setCategories();
        
      }, error => {
        console.error(error);
      }); */
  }

  /* getCategoryFromDB(): Observable<any> {
    let options = new RequestOptions({ headers: this.headers }); // Create a request option
    return this.http.get(this.apiUrl+'/categoryData',options)
        .map((response: Response) => {
            return response;
        });
  } */

  setCategories()
  {
    this.categories=this.categoryFromDB.filter(data=>data.parent_id==null)
    /* this.category=this.categories[0];
        console.log(this.category) */
    //console.log("categories",this.categories)
    this.setSubcategories(this.categories[0])
    
  }

  setSubcategories(cat)
  {
    this.subcategories=[];
    //console.log("subcats after empty",this.subcategories)
    this.subcategories=this.categoryFromDB.filter(data=>data.parent_id==cat.id)
    //console.log("refreshed subcat",this.subcategories)
    $(".sub_sub_list_class").removeClass("hidden-xs");
    $(".sub_sub_list_class").removeClass("hidden-sm");
    $(".sub_sub_list_class").addClass("col-sm-6 col-xs-6");
    //$(".sub_sub_list_class").removeClass("hidden-sm")
    $(".sub_list_class").removeClass("col-sm-6");
    $(".sub_list_class").addClass("hidden-xs hidden-sm");
    
  }


  unhideCategories()
  {
    $(".sub_sub_list_class").addClass("hidden-xs");
    $(".sub_sub_list_class").addClass("hidden-sm");
    $(".sub_sub_list_class").removeClass("col-sm-6 col-xs-6");
    //$(".sub_sub_list_class").removeClass("hidden-sm")
    $(".sub_list_class").addClass("col-sm-6");
    $(".sub_list_class").removeClass("hidden-xs hidden-sm");
  }

  getFinancialInst()
  {
    this.urlSuffix="/financialinstitutes"
    this.navService.getNavbarDataFromDB(this.urlSuffix)
      .subscribe(res => {
        this.financeInstFromDB= JSON.parse(res._body);
        /* console.log(this.financeInstFromDB)*/        
      }, error => {
        console.error(error);
      });
  }

  getStores()
  {
    this.urlSuffix="/stores"
    this.navService.getNavbarDataFromDB(this.urlSuffix)
      .subscribe(res => {
        this.storesFromDB= JSON.parse(res._body);
        /* console.log(this.storesFromDB)*/        
      }, error => {
        console.error(error);
      });
  }

  getBrands()
  {
    this.urlSuffix="/brands"
    this.navService.getNavbarDataFromDB(this.urlSuffix)
      .subscribe(res => {
        this.brandsFromDB= JSON.parse(res._body);
        /* console.log(this.brandsFromDB)*/        
      }, error => {
        console.error(error);
      });
  }


  routeFromSuggestion(source,val)
  {
    var table="";
    if(source.toLowerCase()=="searchbox")
      table="offers";
    else if(source.toLowerCase()=="categories")
      table="categories";
    else if(source.toLowerCase()=="stores")
      table="stores"

      this.router.navigate(['user/offers/'+this.defaultCity+'/'+table+"/"+val]);
  }

  routeToCategoryOffer(cat)
  {
    //window.location.reload();
    //this.offerList.getOffers()
    this.dataEx.offerListFunc;
    this.router.navigate(['user/offers/'+this.defaultCity+'/categories/'+cat.name]);
  }

  routeToFinanceInstOffer(fi)
  {
    this.router.navigate(['user/offers/'+this.defaultCity+'/financialInstitutes/'+fi.name]);
  }

  routeToStores(st)
  {
    this.router.navigate(['user/offers/'+this.defaultCity+'/stores/'+st.name]);
  }

  routeToBrands(br)
  {
    this.router.navigate(['user/offers/'+this.defaultCity+'/brands/'+br.name]);
  }
}
