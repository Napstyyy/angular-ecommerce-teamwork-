import { HttpClient } from '@angular/common/http';//para la consulta con el backend
import { Injectable } from '@angular/core';//para indicarle que es un servicio

export const productsURL: string = "https://eshop-ynv8.onrender.com/products";//es la url de consulta en la bse de datos


@Injectable({//le decimos que es un servicio
  providedIn: 'root'//el lugar donde se va inyextar el codigo
})//fin del Injectable
export class StripeService {//inicio de la clase stripe, este es un servicio que controlara todo lo relacionado con la pasarela de pago con stripe

  constructor(private http: HttpClient ) { }//pedimos el el objeto a http

  /**
   * number, any, string -> Observable
   * esta funcion devuelve un observable el cual te dara una notificacion del estado de pago
   */
  charge(cantidad:number,tokenId:any, description:string){//inicio de la funcion charge
    return this.http.post(productsURL + '/pay', {//se hace la peticion al backend para registrar el pago en stripe
      id: tokenId,//se manda el token de la compra
      amount: cantidad,//se regista la cantidad a pagar
      description: description//se manda una pequeña descripcion de la compra
    })//fin de la peticion
  }//fin de la funcion change

}//fin del servicio StripeService
