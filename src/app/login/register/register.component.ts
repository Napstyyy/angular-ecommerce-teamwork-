import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/services/products.service';
import { User, UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;

  constructor(private fb:FormBuilder, private userService: UsersServiceService, private router:Router){
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required]
    })
  }
  response:User;

  ngOnInit(): void {
    
  }

  submit():void {
    const username:string = this.form.value.username;
    const password:string = this.form.value.password;
    const email:string = this.form.value.email;
    const address:string = this.form.value.address;
    const phone:number = this.form.value.phone;
    this.response = {username: username, password: password, email:email, address:address,phone:phone , isAdmin:false}
    this.userService.createUser(this.response).subscribe((data)=> {
      console.log(data)
      if (typeof data != 'object'){
        this.userService.setAuth();
        this.router.navigate(['/shop']);
      }else{
        alert('Usuario no valido')
      }
      //this.userService.setAdmin(data.isAdmin) set the type of users
    })
  }
  login(){
    this.router.navigate(['/login'])
  }

}
