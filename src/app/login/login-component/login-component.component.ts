import { Component, OnInit } from '@angular/core'; //importacion de component y oninit
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; //importacion de modulos de angular para validar datos en el login
import { Router } from '@angular/router'; //importamos para usar las rutas
import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {
  form: FormGroup; //definimos un nuevo tipo de dato FormGroup

  //funcion que se ejecuta al instanciar un objeto
  constructor(private fb:FormBuilder, private userService: UsersServiceService, private router:Router){ 
    this.form = this.fb.group({ //hacemos las validaciones del formulario
      username: ['', Validators.required], //validaciones para el input de usuario
      password: ['', Validators.required] //validaciones para el input de password
    })
  }
  response:string | object = '' //definimos una valiable de tipo string o objeto

  submit():void { //funcion utilizada para 
    const username = this.form.value.username;
    const password = this.form.value.password;
    this.userService.getUser(username, password).subscribe((data)=> {
      if (typeof data == 'object'){
        this.userService.setAuth()
        this.userService.setAdmin(data.isAdmin)
        this.router.navigate(['/shop']);
      }
    })
  }

  register():void{
    this.router.navigate(['/register'])
  }
}
