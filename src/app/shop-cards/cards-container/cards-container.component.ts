import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from 'src/app/services/products.service';
import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.css']
})
export class CardsContainerComponent implements OnInit{

  constructor(private productsService:ProductsService, private userService: UsersServiceService){}
  
  recharge(){

  }
  ngOnInit(){
    this.productsService.getProducts().subscribe((data) => this.products = data);
    this.productsService.getImages().subscribe((data) => this.images = data);
    console.log(this.userService.auth);
    console.log(this.userService.isAdmin);
  }

  actionAdmin: string;
  
  products:Product[] = []
  images:[] = []

}
