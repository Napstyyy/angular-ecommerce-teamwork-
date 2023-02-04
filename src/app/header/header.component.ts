import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UsersServiceService } from '../services/users-service.service';//se importa para poder usar valores dentro

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']//se vincula a su respectivo css 
})
export class HeaderComponent implements OnInit {
  constructor(public userService:UsersServiceService, private router:Router){//se llama a userService para poder usar los usurios que se logean 

  }

  auth:boolean; //es una variable de tipo boolean que permite saber si hay una persona registrada y poder cambiar el header

  ngOnInit(): void {//permite entregarle a auth un valor inicial que sera de falso
    this.auth = this.userService.auth//al llamar a userService.auth se le asigna el valor false
  }
  logout(){
    this.userService.setAuth()//al tratar de desloguarse se le entrega lo contrario a lo que esta dentro de la variable 
    this.userService.setAdmin(false)//se le quita el valor de admin en caso de que fuera un usuario admin
    this.router.navigate(['/shop'])//al desloguearse redirige a la ruta '/shop' que es la pagina que contiene los productos
  }

}
