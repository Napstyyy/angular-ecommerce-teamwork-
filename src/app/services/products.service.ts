import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//URL to my API on the back-end
export const productsURL = 'http://localhost:8000/products';

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

  //This function needs to get called by each component that needs access to the data and store it on their own variables
  getProducts = () => {
    return this.http.get<Product[]>(productsURL);
  }
}
