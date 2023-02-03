import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnyMxRecord } from 'dns';
import { Observable } from 'rxjs';

//URL to my API on the back-end
export const productsURL: string = "http://192.168.39.176:8000/products";
// export const productsURL: string = "http://10.253.14.47:8000/products";
// export const productsURL:string = "http://localhost:8000/products"


//Definition for the product interface used across all modules and components
export interface Product {
  id: number;
  details: string;
  name: string;
  quantity: number;
  price: number;
  stockMin: string;
  stockMax: string;
  stockCurrent: string;
  createdAt: string;
  updatedAt: string;
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

  //Object that stores the id and quantity of items bought by the user, addItem and deleteItem are the methods to update this object
  boughtObj:boughtObj = {};

  addItem = (id:number) => {
    if (this.boughtObj.hasOwnProperty(id)) this.boughtObj[id]++;
    else this.boughtObj[id] = 1;
    console.log(this.boughtObj);
  } 
  
  deleteItem = (id:number) => {
    this.boughtObj[id]--;
    console.log(this.boughtObj);
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
