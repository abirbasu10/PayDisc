import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import {FormControl} from '@angular/forms';
import { environment } from '../../../environments/environment';
declare const $; 

@Component({
  selector: 'app-near-by-offers',
  templateUrl: './near-by-offers.component.html',
  styleUrls: ['./near-by-offers.component.css']
})



export class NearByOffersComponent implements OnInit {

  constructor(private http:Http) { }

  listOfAllLatLon : any [] = []
  categories : any [] = []
  showCategories : boolean = false
  url : string = ""

  selectedCategory : any 
  cityCtrl: FormControl;
  exactCity : string;

  cities : any[] ;

  

  getLocation() {
    var options = {
      enableHighAccuracy: true,
      timeout:            30000,  // milliseconds (30 seconds)
      maximumAge:         600000 // milliseconds (10 minutes)
    }
    if (navigator.geolocation) {
        this.showCategories = true
        navigator.geolocation.getCurrentPosition(this.showPosition.bind(this),this.handleError,options);
    } else { 
          alert("Browser dont support");
    }
}

 handleError(error)
{
	switch (error.code)
	{
		case error.PERMISSION_DENIED:
			// User denied access to location. Perhaps redirect to alternate content?
			alert('Permission was denied');
			break;
		case error.POSITION_UNAVAILABLE:
			alert('Position is currently unavailable.');
			break;
		case error.PERMISSION_DENIED_TIMEOUT:
			alert('User took to long to grant/deny permission.');
			break;
		case error.UNKNOWN_ERROR:
			alert('An unknown error occurred.')
			break;
	}
}
showPosition(position) {
  
  //x.innerHTML = "Latitude: " + position.coords.latitude + 
  
  //"<br>Longitude: " + position.coords.longitude;

  var lat
  var lon
/* Display in A map */	
  
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  var latlon = position.coords.latitude + "," + position.coords.longitude;
  console.log("lat lon",latlon);
   
   /* 
  -------- MAP POINTER -------------
   var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
    +latlon+"&zoom=14&size=400x300&key=AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU";
     document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
  ----------------END-----------------
     */

/* Map Code END */			

if(latlon)
{
  this.getExactCity(latlon)
  .subscribe(res =>
    {
      console.log("Response---->",res)
      let city = JSON.parse(res._body)
      this.exactCity = city[0];
      this.onCityChange(this.exactCity.id);
      console.log("City---->",city[0])


    },error=>{
      console.log("Error",error)
    });
}


//var url

this.url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" ;

this.url= this.url.concat("location=" + latlon );

this.url=this.url.concat("&radius=500");

this.url=this.url.concat("&types=" + "stores");

this.url=this.url.concat("&sensor=true");

this.url=this.url.concat("&key=AIzaSyCybFWDTuPFDnip2qJWwSUSNHCOTqVrz5Q"); // Google Api Key

$("#urlHolder").val(this.url);

if(this.url.indexOf("key"))
{
  alert("ajaxCalled")
 /*    $.ajax({
    crossDomain: true,            
    contentType: "application/json; charset=utf-8",
    type : "GET",
    url : "http://localhost:8000/parseJson",
    data : {"url":url},
    success : function(msg) {
      
      //console.log(msg.latlon);
      this.listOfAllLatLon = msg.latlon;
      this.url="spandan";
      console.log("message",msg.latlon)
      console.log("latlon",this.listOfAllLatLon)
      
    },
    error : function(xhr){
      
      alert("Error");
    }
    
  }); */
  this.parseJSON()
  .subscribe(res =>
    {
      console.log("Response---->",res)
      let list = JSON.parse(res._body)
      this.listOfAllLatLon = list;
      console.log("List---->",list)
      console.log("Hii",this.listOfAllLatLon)

    },error=>{
      console.log("Error",error)
    });
}    


//document.getElementById("urlHolder").innerHTML = "<a href = '"+ url +"' target='_blank'> Link </a>";

//$('#parseBtn').empty().append('<button (click)="parseJSON()">Find Offers</button>');



//this.createURL(latlon);

}

getCities() : Observable <any> {
  this.headers = new Headers();
  this.headers.append("Content-Type", 'application/json');
  this.headers.append("Access-Control-Allow-Origin", "*");
  this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept"); 
let options = new RequestOptions({ headers: this.headers }); // Create a request option
//console.log("URL IS  boka chele-->",this.url)
return this.http.get(this.apiUrl+'/getCities',options)
.map((response: Response) => {
  //console.log("hii am i in",response);
    return response;
});

}

getAllCity(){
  this.getCities()
  .subscribe(res =>
    {
      console.log("Response---->",res)
      let city_list = JSON.parse(res._body)
      
      console.log("City List---->",city_list[0])
      this.cities = city_list[0]
      

    },error=>{
      console.log("Error",error)
    });
}

getExactCity(latlon) : Observable <any> {
  this.headers = new Headers();
  this.headers.append("Content-Type", 'application/json');
  this.headers.append("Access-Control-Allow-Origin", "*");
  this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept"); 
let options = new RequestOptions({ headers: this.headers }); // Create a request option
//console.log("URL IS  boka chele-->",this.url)
return this.http.get(this.apiUrl+'/getCity?latlon='+latlon,options)
.map((response: Response) => {
  //console.log("hii am i in",response);
    return response;
});

}


   parseJSON() : Observable <any> {

    //var url = $("#urlHolder").val()

    console.log("URL is-->>" + this.url);
    if(this.url)
    {
      // alert("ajaxCalled")
      //   $.ajax({
      //   type : "GET",
      //   url : "http://localhost:8000/parseJson",
      //   data : {"url":url},
      //   success : function(msg) {
          
      //     alert("success");
          
      //     this.listOfAllLatLon = msg.latlon;
      //     console.log("List",this.listOfAllLatLon)
      //   },
      //   error : function(xhr){
          
      //     alert("Error");
      //   }
        
      // });
      this.headers = new Headers();
      this.headers.append("Content-Type", 'application/json');
      this.headers.append("Access-Control-Allow-Origin", "*");
      this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept"); 
  let options = new RequestOptions({ headers: this.headers }); // Create a request option
  console.log("URL IS  boka chele-->",this.url)
    return this.http.get(this.apiUrl+'/parseJson?url='+this.url,options)
    .map((response: Response) => {
      $("#loadGif").addClass("hidden");
      //alert("Success");
        return response;
    });
      
    }    
    
} 

title = 'app';
private headers: Headers;
people : any
private readonly apiUrl = environment.apiUrl;

offers : any[] = []

callApi(): Observable<any>{
       //append headers
    // this.headers = new Headers({'Access-Control-Allow-Headers': 'x-xsrf-token','Content-Type': 'application/json'});
       //this.headers = new Headers({'Access-Control-Allow-Headers: Content-Type, x-xsrf-token'})
       //this.headers = new Headers({ 'Authorization': 'x-xsrf-token', 'Content-Type': 'application/json' });
      // this.headers.append("Access-Control-Allow-Origin", "*");
      this.headers = new Headers();
      this.headers.append("Content-Type", 'application/json');
      this.headers.append("Access-Control-Allow-Origin", "*");
      this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept"); 
  let options = new RequestOptions({ headers: this.headers }); // Create a request option
   return this.http.get(this.apiUrl+'/apicall',options)
      .map((response: Response) => {
        //console.log("hii am i in",response);
          return response;
      });

      // this.people = fetch(this.apiUrl+"apicall").then(res=> res.json())
      // console.log(this.people);
}

callTheApi(){
  this.callApi()	    
  .subscribe(res => {
      let data = JSON.parse(res._body);
      console.log(data)
      this.categories = data;
      this.selectedCategory = this.categories[0]

    }, error => {
      console.error(error);
    });
}

onCatChange(catId){
 alert(catId);
  console.log("category",this.listOfAllLatLon)
  this.parseCatChange(catId);
}

getOffers(catId) : Observable <any>{
  return this.http.get(this.apiUrl+'/getOffer?catId='+catId)
      .map((response: Response) => {
       // console.log("hii am i in",response);
          return response;
      });

}

parseCatChange(catId){
  this.getOffers(catId)
  .subscribe(res => {
      let data = JSON.parse(res._body);
      console.log("parse change",this.listOfAllLatLon[0])

      console.log("hellooo",data.length)

      /* for(let i=0;i<this.listOfAllLatLon[0].length;++i)
      {
        console.log("length",this.listOfAllLatLon.length)
        //\ var x=this.listOfAllLatLon[i].find(lt=>lt.lat==
        for(let j=0;j<data.length;++j)
        {
          alert(data.length)
          console.log("outside if", data);
          if(data[j].latlon == this.listOfAllLatLon[i].lat+","+this.listOfAllLatLon[i].lng)
          {
            console.log("inside if", data);
          this.offers = data;
          }
        } 

      }
 */

      for(let list of this.listOfAllLatLon[0]){
        console.log("list",list)
          for(let ordinate of data){
            console.log("ordina",ordinate.latlon)
            if(ordinate.latlon==(list.lat+","+list.lng).toString()){
              console.log("inside if", ordinate);
              this.offers.push(ordinate);
            }
          }
      }


      
    }, error => {
      console.error(error);
    });

}

onCityChange(cityId){
  alert(cityId)
  if(cityId)
  $("#locationModal").modal("hide");

}

  ngOnInit() {
    //$("#locationModal").modal("show");
    $('#locationModal').modal({backdrop: 'static', keyboard: false});
    this.getAllCity();
    this.callTheApi();
    
  //this.getLocation();    
  }

}
