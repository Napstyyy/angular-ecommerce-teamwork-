import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from 'src/app/services/products.service';
import { UsersServiceService } from 'src/app/services/users-service.service';

//Receta de cocina generada por el angular por defecto
@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.css']
})

//Caracteristicas de un componente, en este caso el componente de las cartas
export class CardsContainerComponent implements OnInit{

  constructor(private productsService:ProductsService){}//se construyen los atributos que seran usados dentro del componente como los atributos de este mismo
  //Cada vez que se inicia el componente DE PRIMERO se renderiza lo siguiente...
  ngOnInit(){
    this.productsService.getProducts().subscribe((data) => this.products = data);//Se obtiene todos los productos, con la peticion de servicio creada en el componente de servicios por medio de un observer que de forma reactiva manda respuesta de la "promesa" sin estar en constante consulta internamente
    this.productsService.getImages().subscribe((data) => this.images = data);;//Se obtiene todas los productos, con la peticion de servicio creada en el componente de servicios por medio de un observer que de forma reactiva manda respuesta de la "promesa" sin estar en constante consulta internamente
  }
  
  products:Product[] = [] //arreglo en el que se guardaran todos los productos obtenidos
  images:[] = [] //arreglo de imagenes que guardara todaas las imagenes obtenidas

}
