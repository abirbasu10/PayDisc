import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class NavbarService {

  public token: string;
  private headers: Headers;
  private readonly apiUrl = "http://localhost:8000/navbar";

  constructor(private http: Http) 
  {
    //append headers
    this.headers = new Headers();
    this.headers.append("Content-Type", 'application/json');
    this.headers.append("Access-Control-Allow-Origin", "*");
    this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept, XSRF");
  } 

  getNavbarDataFromDB(urlSuffix): Observable<any> {
    let options = new RequestOptions({ headers: this.headers }); // Create a request option
    return this.http.get(this.apiUrl+urlSuffix,options)
        .map((response: Response) => {
            return response;
        });
  }

  getSuggestion(urlSuffix,searchVal): Observable<any> {
    let request = JSON.stringify({ searchVal: searchVal});
    let options = new RequestOptions({ headers: this.headers }); // Create a request option
    return this.http.get(this.apiUrl+urlSuffix,options)
        .map((response: Response) => {
            return response;
        })
  }

}
