import { Component, OnInit } from '@angular/core';//importaciones propias del componente
import { FormBuilder, FormGroup, Validators } from '@angular/forms';//forms que tiene angular
import { Router } from '@angular/router';//El objeto Router para navegar entre las rutas
import { UsersServiceService } from 'src/app/services/users-service.service';//importamos el servicio de usuarios


@Component({//declaramos que es un componente 
  selector: 'app-login-component',//le decimos que etiqueta queremos para el componente
  templateUrl: './login-component.component.html',//le decimos que archivo html es del componente
  styleUrls: ['./login-component.component.css']//le decimos que archivo css es del componente
})//fin del decorador component

export class LoginComponentComponent implements OnInit {//inicio de la clase LoginComponentComponent, que es un componente que se encargara de la entrada al usuario a su cuenta y redirigirlo al registro
  form: FormGroup;//creamos el form

  constructor(private fb:FormBuilder, private userService: UsersServiceService, private router:Router){//importamos todos los servicios que vamos a utilizar
    this.form = this.fb.group({//le decimos a fb que nos reuna los input que tenemos
      username: ['', Validators.required],//le decimos que es necesaria una validacion para este input
      password: ['', Validators.required]//le decimos que es necesaria una validacion para este input
    })//fin de fb.group
  }//fin del constructor
  response:string | object = '';//aca guardaremos todos las repuestas de los observadores que vamos a utilizar

  ngOnInit(): void {
    
  }

  /**
   * void ->void
   * esta funcion obtiene los valores de los input y lo manda al observador y 
   * verifica la respuesta del backend para saber si los datos del usuario
   * son correctos 
   */
  submit():void {//inicio de la funcion sumit
    const username = this.form.value.username;//obtenemos el valor del input del username
    const password = this.form.value.password;//obtenemos el valor del input del password
    this.userService.getUser(username, password).subscribe((data)=> {//nos sucribimos al servicio
      if (typeof data == 'object'){//si la respuesta del backend es un objeto sabemos que el usuario existe
        this.userService.setAuth();//cambia la autentificacion de false a true
        this.userService.setAdmin(data.isAdmin);//se setea true si es admin
        this.router.navigate(['/shop']);//cambia la navegacion a la tienda de productos
      }else{//else
        alert('Usuario no valido');//le dice al usuario que los datos no son correctos
      }//find el if
    })//fin del servece
  }//fin de la funcion sumit

  /**
   * void->void
   * esta cambia la navegacion al registro
   */
  register():void{//inicio de la funcion register
    this.router.navigate(['/register']);//cambia la navegacion al registro
  }//fin de la funcion register
}
