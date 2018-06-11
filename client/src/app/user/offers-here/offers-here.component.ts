import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
declare const $; 

@Component({
  selector: 'app-offers-here',
  templateUrl: './offers-here.component.html',
  styleUrls: ['./offers-here.component.css']
})
export class OffersHereComponent implements OnInit {

  
  constructor(private http:Http) { }

  url : string = ""

  title = 'app';
  private headers: Headers;
  people : any

  exactLocation : string;

  private readonly apiUrl = environment.apiUrl;
  



  getLocation() {
    var options = {
      enableHighAccuracy: true,
      timeout:            30000,  // milliseconds (30 seconds)
      maximumAge:         600000 // milliseconds (10 minutes)
    }
    if (navigator.geolocation) {

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
  
  var lat
  var lon

  
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  var latlon = position.coords.latitude + "," + position.coords.longitude;
  console.log("lat lon",latlon);
//https://maps.googleapis.com/maps/api/geocode/json?latlng=22.572646,88.36389500000001&key=AIzaSyCybFWDTuPFDnip2qJWwSUSNHCOTqVrz5Q   
this.url = "https://maps.googleapis.com/maps/api/geocode/json?" ;

this.url= this.url.concat("latlng=" + latlon );

this.url=this.url.concat("&key=AIzaSyCybFWDTuPFDnip2qJWwSUSNHCOTqVrz5Q"); // Google Api Key



if(this.url.indexOf("key"))
{
  alert("ajaxCalled")

  this.getExactLocation()
  .subscribe(res =>
    {
      console.log("Response---->",res)
      let loc = JSON.parse(res._body)
      this.exactLocation = loc;
      console.log("List---->",loc)


    },error=>{
      console.log("Error",error)
    });
}    


}


getExactLocation() : Observable <any> {

  //var url = $("#urlHolder").val()

  console.log("URL is-->>" + this.url);
  if(this.url)
  {
    
    this.headers = new Headers();
    this.headers.append("Content-Type", 'application/json');
    this.headers.append("Access-Control-Allow-Origin", "*");
    this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept"); 
let options = new RequestOptions({ headers: this.headers }); // Create a request option
//console.log("URL IS  boka chele-->",this.url)
  return this.http.get(this.apiUrl+'/getExactLocation?url='+this.url,options)
  .map((response: Response) => {
    //console.log("hii am i in",response);
      return response;
  });
    
  }    
  
}


 



  ngOnInit() {
//    this.callTheApi();
    
  //this.getLocation();    
  }
}

//GET Adress by lat lon --> https://maps.googleapis.com/maps/api/geocode/json?latlng=22.480045699999998,88.34870769999999&key=AIzaSyCybFWDTuPFDnip2qJWwSUSNHCOTqVrz5Q