import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnyMxRecord } from 'dns';
import { Observable } from 'rxjs';

//URL to my API on the back-end


// export const productsURL: string = "http://25.17.205.213:8000/products";
//export const productsURL: string = "http://192.168.39.176:8000/products";
export const productsURL: string = "http://192.168.1.14:8000/products";
// export const productsURL:string = "http://localhost:8000/products"


//Definition for the product interface used across all modules and components
export interface Product {
  id: number;
  name: string;
  details: string;
  price: number;
  stockMin: number;
  stockMax: number;
  stockCurrent: number;
}


//Interface used for the cart object, meant to store as attributes the keys of the bought items and as values their respective quantities
export interface boughtObj{
  [key: number] : number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  //Store the total cost for the payment module
  totalCost = 0;

  setTotalCost(value:number){
    this.totalCost = value;
  }

  //Object that stores the id and quantity of items bought by the user, addItem and deleteItem are the methods to update this object
  boughtObj:boughtObj = {};

  addItem = (id:number) => {
    this.boughtObj.hasOwnProperty(id) ? this.boughtObj[id]++ : this.boughtObj[id] = 1;
  } 
  
  deleteItem = (id:number) => {
    this.boughtObj[id]--;
    this.boughtObj[id] == 0 ? delete this.boughtObj[id] : void(0);
  } 

  //Book items in server array
  bookItem = (id:number, action:string) => {
    return this.http.get<string>(productsURL + `/book/${id}?f=${action}`);
  }

  //This functions needs to get called by each component that needs access to the data and store it on their own variables
  //Get an array of all the products in database
  getProducts = () => {
    return this.http.get<Product[]>(productsURL);
  }

  //Get an object of all the images sorted by id
  getImages = () => {
    return this.http.get<[]>(productsURL + '/image');
  }

  updateProduct = (body:Product) =>{
    return this.http.put<string>(productsURL + `/${body.id}`, body)
  }
  //Format a text to display prices: E.g: $123.000.000
  priceText = (price: number) => {
    let priceString:string = String(price);
    let string: string = '$';
    for (let i = 0; i < priceString.length; i++) {
      string += priceString[i];
      if ((priceString.length - i - 1) % 3 === 0 && i !== priceString.length - 1) {
        string += '.';
      }
    }
    return string;
  }

}
