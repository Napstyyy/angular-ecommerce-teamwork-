import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from 'src/app/services/products.service';

export interface ProductBought {
  image: string;
  name: string;
  quantity: number;
  price: number;
}

const TEST_PRODUCTS: ProductBought[] = [
  { image: "Prueba1", name: 'Producto1', quantity: 20, price: 80 },
  { image: "Prueba2", name: 'Producto2', quantity: 30, price: 80 },
  { image: "Prueba3", name: 'Producto3', quantity: 40, price: 80 },
  { image: "Prueba4", name: 'Producto4', quantity: 50, price: 80 },
  { image: "Prueba5", name: 'Producto5', quantity: 60, price: 80 },
  { image: "Prueba6", name: 'Producto6', quantity: 60, price: 80 }
]

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  constructor(private productsService:ProductsService){}

  ngOnInit(): void {
    this.productsService.getProducts()
    .subscribe((data) => this.products = data);
  }

  products: Product = [];

  displayedColumns: string[] = ['image', 'name', 'quantity', 'price', 'actions'];
  dataSource = TEST_PRODUCTS;

  book(index: number): void {
    this.dataSource[index].quantity++;
  }

  unbook(index: number): void {
    this.dataSource[index].quantity--;
    this.dataSource
  }

  getTotalCost():number {
    let cost = 0;
    this.dataSource.forEach(product => cost+=product.quantity*product.price)
    return cost;
  }

  checkout(): void {

  }

  showProducts(){
    console.log(this.products)
  }
}
