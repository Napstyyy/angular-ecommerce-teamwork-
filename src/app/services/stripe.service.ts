import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//export const productsURL: string = "http://25.17.205.213:8000/products";
//export const productsURL: string = "http://192.168.39.176:8000/products";
export const productsURL: string = "http://192.168.1.14:8000/products";
// export const productsURL:string = "http://localhost:8000/products"

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor(private http: HttpClient ) { }

  charge(cantidad:number,tokenId:any, description:string){
    return this.http.post(productsURL + '/pay', {
      id: tokenId,
      amount: cantidad,
      description: description
    })
  }

}
