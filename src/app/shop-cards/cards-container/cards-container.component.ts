import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.css']
})
export class CardsContainerComponent implements OnInit{

  constructor(private productsService:ProductsService){}

  
  ngOnInit(){
    this.productsService.getProducts()
    .subscribe((data) => this.products = data);
  }
  
  products:Product[] = []

}
