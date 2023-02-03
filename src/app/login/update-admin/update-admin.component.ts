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

  constructor(private fb:FormBuilder, private userService: UsersServiceService, private router:Router){
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
  
  response:User;

  update():void {
    const username:string = this.form.value.username;
    const password:string = this.form.value.password;
    const email:string = this.form.value.email;
    const address:string = this.form.value.address;
    const phone:number = this.form.value.phone;
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
