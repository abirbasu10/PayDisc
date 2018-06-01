import { Component, OnInit } from '@angular/core';

declare const $;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

   x = document.getElementById("demo");

  url : string = ""


  getLocation() {
    if (navigator.geolocation) {
      
        navigator.geolocation.getCurrentPosition(this.showPosition);
    } else { 
        this.x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

showPosition(position) {
  console.log("ddddw",this)
  //x.innerHTML = "Latitude: " + position.coords.latitude + 
  
  //"<br>Longitude: " + position.coords.longitude;

  var lat
  var lon
/* Display in A map */  
console.log(this)
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
console.log(this)

var url

url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" ;

url= url.concat("location=" + latlon );

url=url.concat("&radius=500");

url=url.concat("&types=" + "clothing_store");

url=url.concat("&sensor=true");

url=url.concat("&key=AIzaSyCybFWDTuPFDnip2qJWwSUSNHCOTqVrz5Q"); // Google Api Key

document.getElementById("urlHolder").innerHTML = "<a href = '"+ url +"' target='_blank'> Link </a>";

$('#parseBtn').empty().append('<button (click)="parseJSON()">Find Offers</button>');

//this.createURL(latlon);

}

createURL(latlon){

  /*Google map Api to get places by latitude and longitude*/

      this.url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" ;

    this.url= this.url.concat("location=" + latlon );

    this.url=this.url.concat("&radius=500");

    this.url=this.url.concat("&types=" + "clothing_store");

    this.url=this.url.concat("&sensor=true");

    this.url=this.url.concat("&key=AIzaSyCybFWDTuPFDnip2qJWwSUSNHCOTqVrz5Q"); // Google Api Key

    document.getElementById("urlHolder").innerHTML = "<a href = '"+ this.url +"' target='_blank'> Link </a>";

    $('#parseBtn').empty().append('<button (click)="parseJSON()">Find Offers</button>');

  /*Google map API end */ 

  }

  parseJSON(){

    console.log("URL is-->>" + this.url);
    $.ajax({
    type : "GET",
    url : "/parseJson",
    data : {"url":this.url},
    success : function(msg) {
      
      if(msg.placename.length >= 1 )
      {
        //alert("Matched !! --> " + msg.placename);
        $("#message").empty().append("<h4> Places matched are : <label style='background-color:green;color:white;padding:5px;'>"+msg.placename+"</label>");
        
      }
      else
      {
        alert("Nothing Found !! --> "); 
      }
      
      
    },
    error : function(xhr){
      
      alert("Error");
    }
    
  });

}

  ngOnInit() {

  this.getLocation();    
  }

}
