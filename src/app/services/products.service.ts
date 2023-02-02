import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnyMxRecord } from 'dns';

//URL to my API on the back-end
// export const productsURL: string = "http://192.168.39.176:8000/products";
export const productsURL: string = "http://10.253.14.47:8000/products";
// export const productsURL:string = "http://localhost:8000/products"


//Definition for the product class used across all modules and components
export class Product {
  id: number = 0;
  details: string = '';
  name: string = '';
  quantity: number = 0
  price: number = 0
  stockMin: string = '';
  stockMax: string = '';
  stockCurrent: string = '';
  createdAt: string = '';
  updatedAt: string = '';
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  //This functions needs to get called by each component that needs access to the data and store it on their own variables

  //Get an array of all the products in database
  getProducts = () => {
    return this.http.get<Product[]>(productsURL);
  }

  //Get an object of all the images sorted by id
  getImages = () => {
    return this.http.get<[]>(productsURL + '/image');
  }

  

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
