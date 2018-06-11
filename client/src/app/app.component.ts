import { Component,OnInit } from '@angular/core';
 import { Http, Headers, Response, RequestOptions } from '@angular/http';
 import { Observable } from 'rxjs';
 import 'rxjs/add/operator/map';
import { environment } from '../../src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  private headers: Headers;
  people : any
  private readonly apiUrl = environment.apiUrl;

  constructor(private http:Http){

  }

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
	    }, error => {
	      console.error(error);
	    });
  }

  ngOnInit() {
//    this.callTheApi();
  }
}
