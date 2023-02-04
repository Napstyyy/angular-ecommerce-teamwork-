import { HttpClient } from '@angular/common/http';//para la consulta con el backend
import { Injectable } from '@angular/core';//para indicarle que es un servicio

export const productsURL: string = "https://eshop-ynv8.onrender.com/products";//es la url de consulta en la bse de datos

//Definition for the user interface used across all modules and components
export interface User{//inicio de la interface User
  username: string;//aca se guardara el nombre del usuario que tiene en la base de datos
  password: string;//se guardara la contraseña encriptada del usuario que tiene en la base de datos
  phone: number;//se gurdara el numero del usuario que tiene en la base de datos
  email: string;//se guardara el correo electronico que tendra el usuario en la base de datos
  isAdmin: boolean;//se guarda un booleano el cual dice si es usuario es admin
  address: string;//guarda la direccion de usuario
}//fin de la interface user

@Injectable({//le decimos que es un servicio
  providedIn: 'root'//el lugar donde se va inyextar el codigo
})//fin del Injectable
export class UsersServiceService {//inicio de la clase UsersServiceService, es el primer servicio que se creo el cual se encargara de todo lo relacionado con oos usuarios y el usuario que se logio en la pagina actual 

  constructor(private http: HttpClient) { }//pedimos el el objeto a http
  
  isAdmin:boolean = false;//se guarda el poder del usuario
  auth: boolean = false;//se guarda si el usuario se registro

  /**
   * string, string -> Observable
   * devulve un observable que es la confirmacion si el usuario y la contraseña son de un usuario,
   * si devuelve un objeto es que el usuario es real y su contraseña esta corecta,
   * si devulve un string indica que algo esta mal en la informacion suministrada por el usuario
   */
  getUser = (username:string, password:string) => {//inicio de getUser
    return this.http.post<string | User>(productsURL + '/login', {username:username, password:password})//devulve un observable el cual indica si la informacion suministrada por el usuario es correcta
  }//fin de getUser

  /**
   * User -> Observable
   * esta funcion retorna un retornable el cual indica si se creo el usuruario con los datos de
   * body
   */
  createUser = (body: User) => {//inicio de la funcion createUser
    return this.http.post<string>(productsURL + '/signup', body);//devuelve un observable 
  }//fin de la funcion createUser

  /**
   * User -> Observable
   * Esta funcion devulve un observable el cual notifica si se actualizo la informacion del administrado
   */
  updateAdmin = (body: User) => {//inicio de la funcion updateAdmin
    return this.http.put<string>(productsURL + '/admin', body);//retorna un Observable
  }//fin de la funcion updateAdmin

  /**
   * void -> undefined
   * cambia la autorizacion del usuario para ser lo contrario a lo que es en el momento
   */
  setAuth(){//inicio de setAuth
    this.auth = !this.auth;//setea el valor de auth a lo contrario que es
  }//fin de la funcion setAuth

  /**
   * boolean -> undefined
   * esta funcion setea el usuario dependiendo del booleano que le pases
   */
  setAdmin(admin:boolean){//inicio de la funcion setAdmin
    if(admin){//se pregunta el valor del  boleano
      this.isAdmin = true;//setea isAdmin true;
    }else{//else
      this.isAdmin = false;//setea isAdmin false
    }//fin del if
  }//fin de la funcion setAdmin
}
