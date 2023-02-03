import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UsersServiceService } from '../services/users-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public userService:UsersServiceService, private router:Router){

  }

  auth:boolean;

  ngOnInit(): void {
    this.auth = this.userService.auth
  }
  logout(){
    this.userService.setAuth()
    this.router.navigate(['/shop'])
  }

}
