import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError, retry } from 'rxjs';

export class Product{
  constructor(
    id: number,
    details: string,
    name: string,
    quantity: number,
    price: number,
    stockMin:string,
    stockMax:string,
    stockCurrent:string,
    createdAt:string,
    updatedAt:string
  ){}
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productsURL = 'http://localhost:8000/products';

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get<Product>(this.productsURL);
  }
}
