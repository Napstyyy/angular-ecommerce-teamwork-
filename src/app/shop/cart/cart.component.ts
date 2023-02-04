import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { Product, ProductsService } from 'src/app/services/products.service';

//Atributos para la clase del carro
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

//Los componentes del carro que se inicializaran de primero una vez se renderiza
export class CartComponent implements OnInit {

  constructor(private productsService: ProductsService, private router: Router) {} //este constructor permite usar el 

  //muestra las imagenes en el carro y la info de cada producto
  ngOnInit(): void {
    this.productsService.getImages().subscribe((data) => this.images = data);
    this.productsService.getProducts().subscribe((data) => this.updateCart(data));
  }
  
  //Actualiza el carro segun los productos comprados utilizando la peticion del servidor
  updateCart(data: Product[]) {
    this.products = data //Asignar una variable a la respuesta del servidor
    const newData:ProductBought[] = [];
    Object.keys(this.productsService.boughtObj).forEach(id => { //por cada producto comprado obtener los datos necesarios y guardarlos en un objeto
      newData.push({ //agregar el objeto anteriormente descrito a un arreglo para mostrarlo en la tabla de materials
        id: Number(id),
        image: "",
        name: this.products[Number(id)-1].name,
        quantity: this.productsService.boughtObj[Number(id)],
        price: this.products[Number(id)-1].price
      })
    })
    this.dataSource = newData; //Definir la entrada de datos de la tabla materials
  }

  products: Product[] = [];//definir arreglo que se rellenara
  images: [] = [];//definir arreglo que se rellenara

  displayedColumns: string[] = ['image', 'name', 'quantity', 'price', 'actions'];// Columna que aparecen en el carrito
  dataSource: ProductBought[] = [];

//Anade items y los reserva por medio de la peticion al servidor de bookitem
  addItem(index: number): void {
    this.productsService.bookItem(index, 'book').subscribe((message) => {
      message === 'Stockout' ? alert('Item out of stock') : void(0);
      if (message === 'Booked'){
        this.productsService.addItem(index);
        this.updateCart(this.products);
      }
    });
  }

  //borra y deja de reservar productos los cuales rebaja la cantidad con el boton del menos
  deleteItem(index: number): void {    
    this.productsService.bookItem(index, 'unbook').subscribe((message) => {
      if (message !== 'Unbooked') return;
      this.productsService.deleteItem(index);
      this.updateCart(this.products);
    })
  }

  //Se obtiene el total de la compra segun la cantidad comprada y el precio del producto
  getTotalCost(): number {
    let cost = 0;
    this.dataSource.forEach(product => cost += product.quantity * product.price)
    return cost;
  }

  //Se obtiene el precio del texto segun la funcion que entrega el total de la compra
  getPriceText(): string{
    return this.productsService.priceText(this.getTotalCost());
  }

  //Calcula el valor total de la compra y se lo entrega al portal de pago de componentes, ademas MUESTRA los el total de la compra
  showProducts() {
    this.productsService.totalCost = this.getTotalCost();
    console.log(this.productsService.totalCost);
    this.router.navigate(['/payment']);
  }

  //Obtiene la imagen de un producto dado un id
  getImage(id:number):string{
    return this.images[id][0];
  }

}
