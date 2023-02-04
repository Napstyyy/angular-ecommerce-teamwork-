import { Component, OnInit } from '@angular/core';//Definiciones del componente
import { Router } from '@angular/router';//Modulo de router para redireccionar
import { UsersServiceService } from '../services/users-service.service';//Importacion del servicio de usuarios

//Componente de header, este está presente constantemente, por lo que solo se renderiza una vez
//No depende de las rutas del modulo principal
//Permite la navegación entre modulos y se encarga de gestionar el flujo de la aplicación segun el tipo de usuario
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']//se vincula a su respectivo css 
})

export class HeaderComponent implements OnInit {
  //Importar en la clase el modulo de rutas y el servicio de usuarios
  constructor(public userService:UsersServiceService, private router:Router){}

  //Variable para validar si ya se inició sesión
  auth:boolean;

  //Al iniciar el componente, asignar la variable auth a el valor que se encuentre en el servicio
  ngOnInit(): void {
    this.auth = this.userService.auth;
  }

  //Cerrar sesion
  logout(){
    this.userService.setAuth()//al tratar de desloguarse se le entrega lo contrario a lo que esta dentro de la variable 
    this.userService.setAdmin(false)//se le quita el valor de admin en caso de que fuera un usuario admin
    this.router.navigate(['/shop'])//al desloguearse redirige a la ruta '/shop' que es la pagina que contiene los productos
  }

}
