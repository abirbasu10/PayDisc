import { Injectable } from '@angular/core';

@Injectable()
export class DataExchangeService {
  private data;
  offerListFunc:Function;

  constructor() { }

  setData(data){
    this.data = data;
  }

  getData(){
    let temp = this.data;
    this.clearData();
    return temp;
  }

  clearData(){
    this.data = undefined;
  }

}
