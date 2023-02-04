import { Component, OnInit } from '@angular/core';//importaciones propias del componente
import { User, UsersServiceService } from 'src/app/services/users-service.service';//importamos el servicio de usuarios
import { Router } from '@angular/router';//El objeto Router para navegar entre las rutas
import { FormBuilder, FormGroup, Validators } from '@angular/forms';//forms que tiene angular

@Component({ //declaramos que es un componente 
  selector: 'app-update-admin',//le decimos que etiqueta queremos para el componente
  templateUrl: './update-admin.component.html',//le decimos que archivo html es del componente
  styleUrls: ['./update-admin.component.css']//le decimos que archivo css es del componente
})//fin del decorador component
export class UpdateAdminComponent implements OnInit{//inicio de la clase UpdateAdminComponent, el cual es un componente que se encargara de actualizar la informacion del admin
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
  ngOnInit(): void {
  }
  
  response:User;//aca guardaremos todos las repuestas de los observadores que vamos a utilizar

  /**
   * void->void
   * Esta funcion recoje los valores de todos los input y los envia al Observer y
   * verifica si se actualizo correctamente
   */
  update():void {//inicio funcion update
    const username:string = this.form.value.username;//obtenemos el valor del input del username
    const password:string = this.form.value.password;//obtenemos el valor del input del password
    const email:string = this.form.value.email;//obtenemos el valor del input del email
    const address:string = this.form.value.address;//obtenemos el valor del input del address
    const phone:number = this.form.value.phone;//obtenemos el valor del input del phone
    this.response = {username: username, password: password, email:email, address:address,phone:phone , isAdmin:true}//metemos los datos en un objeto JSON
    this.userService.updateAdmin(this.response).subscribe((data)=> {//nos suscribimos al servicio
      if (typeof data !== 'object'){//pregunta si la respuesta del backend es un objecto y si lo es indica que el usuario se registro
        alert('Actualización grasosa');//le decimos al administrador que la actualizacion fue correcta
        this.router.navigate(['/shop']);//navegamos a la tienda principal
      }//fin del if
    })//fin del servece
  }//fin de la funcion update

}//fin del componente
