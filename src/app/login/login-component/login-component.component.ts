import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent {
  form: FormGroup;

  constructor(private fb:FormBuilder){
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  submit():void {
    const username = this.form.value.username;
    const password = this.form.value.password;
    console.log(username, password);
  }
}
