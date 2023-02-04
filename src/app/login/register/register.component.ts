import { Component } from '@angular/core';//importaciones propias del componente
import { FormBuilder, FormGroup, Validators } from '@angular/forms';//forms que tiene angular
import { Router } from '@angular/router';//El objeto Router para navegar entre las rutas
import { User, UsersServiceService } from 'src/app/services/users-service.service';//importamos el servicio de usuarios

@Component({//declaramos que es un componente 
  selector: 'app-register',//le decimos que etiqueta queremos para el componente
  templateUrl: './register.component.html',//le decimos que archivo html es del componente
  styleUrls: ['./register.component.css']//le decimos que archivo css es del componente
})//fin del decorador component

export class RegisterComponent {//inicio de la clase RegisterComponent, que es un componente que se encarga del registro de usuarios
  form: FormGroup;//creamos el form

  constructor(private fb:FormBuilder, private userService: UsersServiceService, private router:Router){//importamos todos los servicios que vamos a utilizar
    this.form = this.fb.group({//le decimos a fb que nos reuna los input que tenemos
      username: ['', Validators.required],//le decimos que es necesaria una validacion para este input
      password: ['', Validators.required],//le decimos que es necesaria una validacion para este input
      email: ['', Validators.required],//le decimos que es necesaria una validacion para este input
      address: ['', Validators.required],//le decimos que es necesaria una validacion para este input
      phone: ['', Validators.required]//le decimos que es necesaria una validacion para este input
    })//fin de fb.group
  }//fin del constructor
  response:User;//aca guardaremos todos las repuestas de los observadores que vamos a utilizar

  ngOnInit(): void {
    
  }

  /**
   * void->void
   * esta funcion obtiene los valores de los input y lo manda al observador y 
   * obtiene la repuesta del backend que dice si se registro el usuario
   */
  submit():void {//inicio de la funcion sumit
    const username:string = this.form.value.username;//obtenemos el valor del input del username
    const password:string = this.form.value.password;//obtenemos el valor del input del password
    const email:string = this.form.value.email;//obtenemos el valor del input del email
    const address:string = this.form.value.address;//obtenemos el valor del input del address
    const phone:number = this.form.value.phone;//obtenemos el valor del input del phone
    this.response = {username: username, password: password, email:email, address:address,phone:phone , isAdmin:false}//metemos los datos en un objeto JSON
    this.userService.createUser(this.response).subscribe((data)=> {//nos suscribimos al servicio
      if (typeof data != 'object'){//pregunta si la respuesta del backend es un objecto y si lo es indica que el usuario se registro
        this.userService.setAuth();//cambia el valor de autetificacion de false a verdadero
        this.router.navigate(['/shop']);//cambia la navegacion a la vista de productos
      }else{//else
        alert('Usuario no valido');//le decimos al usuario que no se pudo registrar con su informacion
      }//fin del if
    })//fin del servece
  }//fin de la funcion sumit

  /**
   * void->undefined
   * esta funcion cambia la navegacion al login principal
   */
  login(){//inicio de login
    this.router.navigate(['/login']);//cambia la navegacion
  }//fin de la funcion de login

}
