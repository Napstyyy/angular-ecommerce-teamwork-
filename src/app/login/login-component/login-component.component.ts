import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  form: FormGroup;

  constructor(private fb:FormBuilder, private userService: UsersServiceService, private router:Router){
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  response:string | object = ''

  ngOnInit(): void {
    
  }

  submit():void {
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
