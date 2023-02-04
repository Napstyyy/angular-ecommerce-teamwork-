import { HttpClient } from '@angular/common/http';//para la consulta con el backend
import { Injectable } from '@angular/core';//para indicarle que es un servicio

//URL to my API on the back-end
export const productsURL: string = "https://eshop-ynv8.onrender.com/products";//es la url de consulta en la bse de datos

//Definition for the product interface used across all modules and components
export interface Product {//Inicia la interface Product
  id: number;//guardara el identificador unico de cada producto en la base de datos
  name: string;//se guardara el nombre que se tiene en la base de datos
  details: string;//se guardaran la descripcion de los productos, esta estara reflejada en la base de datos
  price: number;//se guardara el precio que tiene el producto en la base de datos
  stockMin: number;//se guardara el stock minimo el cual si se supera se mandara un correo al administrador avisandole la falta de este producto
  stockMax: number;//se guardara el stock maximo que se puede almacenar en la base de datos
  stockCurrent: number;//se guardara la cantidad actual de stock
}//termina la interface Product


//Interface used for the cart object, meant to store as attributes the keys of the bought items and as values their respective quantities
export interface boughtObj{//inicia la interface boughtObj
  [key: number] : number;//cada key de la propiedad indica el id de in producto, su valor indica la cantidad en el carro del usuario
}//termina la interface de boughthObj

@Injectable({//le decimos que es un servicio
  providedIn: 'root'//el lugar donde se va inyextar el codigo
})//fin del Injectable

//inicio de la clase ProductsService, este sera un servicio
// que controlara lo relacionado a los productos y el carrito del usuario
export class ProductsService {
  constructor(private http: HttpClient) { }//pedimos el el objeto a http

  totalCost = 0;//Store the total cost for the payment module

  /**
   * number -> undefined
   * esta funcion da un valor a tatalCost, esta funcion se utiliza para realizar la compra y setear el total del nuevo carrito del usuario en cero
   */
  setTotalCost(value:number){//inicio funcion setTotalCost
    this.totalCost = value;//setea totalCost a lo que se dicte en value
  }//fin funcion setTotalCost
  
  boughtObj:boughtObj = {};//Object that stores the id and quantity of items bought by the user, addItem and deleteItem are the methods to update this object

  /**
   * number -> undefined
   * esta funcion agrega un producto al carrito y si en caso de estar ya en el carrito, se le añadira uno a la cantidad interna del carrito
   */
  addItem = (id:number) => {//inicia la funcion addItem
    this.boughtObj.hasOwnProperty(id) ? this.boughtObj[id]++ : this.boughtObj[id] = 1;//se pregunta si existe la propiedad representada en id, si esta existe se le suma uno a la cantidad en el carrito, sino, se crea la propiedad y se seta su valor en uno
  }//fin Funcion addItem
  
  /**
   * number -> undefined
   * esta funcion disminuye el valor de la propiedad del objeto que represente el id en uno, si la cantidad es cero, simplemente se eliminara del objeto
   */
  deleteItem = (id:number) => {//inicio de deleteItem
    this.boughtObj[id]--;//disminuye la cantidad en el carrito
    this.boughtObj[id] == 0 ? delete this.boughtObj[id] : void(0);//si el valor de la llave alcanza cero, se eliminara la propiedad
  }//fin de deleteItem

  /**
   * id, action -> Observable
   * devulve un observable el cual te dira si se pudo hacer la accion que le pediste hacer,
   * si le pasa a action "book", reservara el producto con el id correspondiente, 
   * si este le pasas "unbook", liberara la reserva anteriormente hecha
   */
  bookItem = (id:number, action:string) => {//inicio de bookItem
    return this.http.get<string>(productsURL + `/book/${id}?f=${action}`);//devulve un observable es cual al suscribirse te devolvera una confirmacion de si se pudo reservar el producto en el backend o si se pudo libarar esa reverva
  }//fin de bookItem

  /**
   * id, action -> Observable
   * devuleve un observable el cual confirma que los datos pasados por medio del body fueron actualizados en base de datos
   * 
   */
  buyProductAux = () => {
    return this.http.post<string>(productsURL + '/buyAux', this.boughtObj)
  }

  /**
   * void -> Observable
   * esta funcion devuelve un observable el cual, si la coneccion se efectua,
   *  te dara los 10 productos de la base de datos
   */
  getProducts = () => {//inicio de la funcion getProducts
    return this.http.get<Product[]>(productsURL);//retorna un Observable el cual te dara los productos de la abse de datos
  }//fin de la funcion getProducts

  /**
   * void -> Observable
   * Esta funcion devolvera un Observable que te dara todas las imagenes que hay en la tabla de imagenes
   */
  getImages = () => {//inicio funcion getImagenes
    return this.http.get<[]>(productsURL + '/image');//retorna un Observable el cual te dara todas las imagenes de la base de datos
  }//fin de la funcion getImagenes

  /**
   * Product -> Observable
   * esta funcio devuelve un observable el cual actualizara el que le mandes en el body,
   * el observable solo te dara una notificaion si se pudo hacer el cambio
   */
  updateProduct = (body:Product) =>{//inicio funcion updateProduct
    return this.http.put<string>(productsURL + `/${body.id}`, body)//devolvera un observador el cual te dara una notificacion si se cambio el producto
  }//fin funcion updateProduct
  
  //Format a text to display prices: E.g: $123.000.000
  /**
   * number -> string
   * convierte un numero a un string el cual tendra un formato contable el cual tendra un punto
   * cada 3 posiciones y se le agrega el caracter $ al inicio de cada string.
   */
  priceText = (price: number) => {//inicio de la funcion priceText
    let priceString:string = String(price);//convierte price en un string
    let string: string = '$';//se crea string el cual contendra todo el numero convertido con el formato contable, inicia con $
    for (let i = 0; i < priceString.length; i++) {//recorremos todos los caracteres de priceString
      string += priceString[i];//añadimos el caracter en la posicion i de priceString
      if ((priceString.length - i - 1) % 3 === 0 && i !== priceString.length - 1) {//se pregunta si el el largo de la cadena menos la posicion en donde se esta ejecutando el for es multiplo de 3 y si este no es el ultimo caracter de la cadena
        string += '.';//se le agrega el punto que cepara cada tres cifras
      }//fin del if
    }//fin del for
    return string;//retorna la string con el formato
  }//fin de la funcion priceText

}//fin del servicio
