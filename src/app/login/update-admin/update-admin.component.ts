import { Component, OnInit } from '@angular/core';
import { User, UsersServiceService } from 'src/app/services/users-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit{
  form: FormGroup;

  //constructor que obtiene los servicios de FormBuilder, para el manejo de formularios
  //el servicio de usuarios y e servicio de router
  constructor(private fb:FormBuilder, private userService: UsersServiceService, private router:Router){ 
    //a form se le asignan los diferentes valores que se obtienen en el formulario
    this.form = this.fb.group({
      username: ['', Validators.required], 
      password: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required]
    })
  }
  ngOnInit(): void {
  }
  
  response:User; //objeto que va a ser enviado con todos los datos del administrador

  update():void {
    const username:string = this.form.value.username; //se crea la constante username que guarda el valor del input usuario
    const password:string = this.form.value.password; //se crea la constante password que guarda el valor del input password
    const email:string = this.form.value.email; //se crea la constante email que guarda el valor del input email
    const address:string = this.form.value.address; //se crea la constante address que guarda el valor del input address
    const phone:number = this.form.value.phone; //se crea la constante phone que guarda el valor del input phone
    this.response = {username: username, password: password, email:email, address:address,phone:phone , isAdmin:true}
    this.userService.updateAdmin(this.response).subscribe((data)=> {
      if (typeof data !== 'object'){
        alert('Actualización grasosa');
        this.router.navigate(['/shop'])
      }
      //this.userService.setAdmin(data.isAdmin) set the type of users
    })
  }

}
