import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product, ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  form: FormGroup;

  //constructor que obtiene los servicios de FormBuilder, para el manejo de formularios
  //el servicio de productos y e servicio de router
  constructor(private fb:FormBuilder, private productsService: ProductsService, private router:Router, private route:ActivatedRoute){
    //a form se le asignan los diferentes valores que se obtienen en el formulario
    this.form = this.fb.group({
      name: ['', Validators.required],
      details: ['', Validators.required],
      price: ['', Validators.required],
      stockCurrent: ['', Validators.required],
      stockMin: ['', Validators.required],
      stockMax: ['', Validators.required],
    })
  }
  response:Product;

  update():void {
    const name:string = this.form.value.name; //se crea la constante name que guarda el valor del input name
    const details:string = this.form.value.details; //se crea la constante details que guarda el valor del input details
    const price:number = this.form.value.price; //se crea la constante price que guarda el valor del input usuario
    const stockCurrent:number = this.form.value.stockCurrent; //se crea la constante stockCurrent que guarda el valor del input stockCurrent
    const stockMin:number = this.form.value.stockMin; //se crea la constante stockMin que guarda el valor del input stockMin
    const stockMax:number = this.form.value.stockMax; //se crea la constante stockMax que guarda el valor del input stockMax
    this.response = {id:this.route.snapshot.params["id"],name: name, details:details,price: price, stockCurrent: stockCurrent, stockMin:stockMin, stockMax:stockMax}
    //se le asigna al objeto response las propiedades previas
    this.productsService.updateProduct(this.response).subscribe((data)=> { //mediante el observable se hace la peticion de actualizar el producto
      if (typeof data === 'object'){ //revisa el tipo de respuesta que obtiene
        alert('Actualización exitosa'); //avisa a usuario en caso de ser exitosa la actualizacion
        this.router.navigate(['/shop']) //redirecciona la pagina hacia el shop
      }
      //this.userService.setAdmin(data.isAdmin) set the type of users
    })
  }
}
