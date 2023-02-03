import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// export const productsURL: string = "http://25.17.205.213:8000/products";
//export const productsURL: string = "http://192.168.39.176:8000/products";
export const productsURL: string = "http://10.253.14.47:8000/products";
// export const productsURL:string = "http://localhost:8000/products"


//Definition for the user interface used across all modules and components
export interface User{
  username: string;
  password: string;
  phone: number;
  email: string;
  isAdmin: boolean;
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  constructor(private http: HttpClient) { }
  
  isAdmin:boolean;

  getUser = (username:string, password:string) => {
    return this.http.post<string | User>(productsURL + '/login', {username:username, password:password})
  }

  createUser = (body: User) => {
    return this.http.post<string>(productsURL + '/signup', body)
  }

  updateAdmin = (body: User) => {
    return this.http.put<string>(productsURL + '/admin', body)
  }

  setAdmin(admin:boolean){
    if(admin){
      this.isAdmin = true
    }else{
      this.isAdmin = false
    }
  }
}
