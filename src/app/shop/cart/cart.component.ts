import { Component, OnInit } from '@angular/core';
import { boughtObj, Product, ProductsService } from 'src/app/services/products.service';

export interface ProductBought {
  id:number;
  image: string;
  name: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getImages().subscribe((data) => this.images = data);
    this.productsService.getProducts()
      .subscribe((data) => this.updateCart(data));
  }
  
  updateCart(data: Product[]) {
    this.products = data
    const newData:ProductBought[] = [];
    Object.keys(this.productsService.boughtObj).forEach(id => {
      newData.push({
        id: Number(id),
        image: "",
        name: this.products[Number(id)-1].name,
        quantity: this.productsService.boughtObj[Number(id)],
        price: this.products[Number(id)-1].price
      })
    })
    this.dataSource = newData;
  }

  products: Product[] = [];
  images: [] = [];

  displayedColumns: string[] = ['image', 'name', 'quantity', 'price', 'actions'];
  dataSource: ProductBought[] = [];


  book(index: number): void {
    this.productsService.addItem(index);
    this.updateCart(this.products);
  }
  
  unbook(index: number): void {    
    this.productsService.deleteItem(index);
    this.updateCart(this.products);
  }

  getTotalCost(): number {
    let cost = 0;
    this.dataSource.forEach(product => cost += product.quantity * product.price)
    return cost;
  }

  showProducts() {
    console.log(this.dataSource);
  }

  getImage(id:number):string{
    return this.images[id][0];
  }

}
