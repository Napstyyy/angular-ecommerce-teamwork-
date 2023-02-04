import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products.service';
import {Router} from "@angular/router";
import { UsersServiceService } from 'src/app/services/users-service.service';

//Se crea una interfaz del dialogo que genera los atributos para el Dato dentro del mismo dialog
interface DialogData {
  id: number;
  name: string;
  details: string;
  price: string;
  images: [];
}

//Autogeneracion del angular cunado se crea el modelo
@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})


//la clase del dialogo que aparece al dar click a un producto
export class ProductDialogComponent implements OnInit { 
  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private productsService:ProductsService,
    private router: Router,
    public userService: UsersServiceService
  ) {}
  //segun si es admin da la opcion de editar o comprar
  ngOnInit(): void {
    if(this.userService.isAdmin){
      this.actionAdmin = 'Edit'
    }else{
      this.actionAdmin = 'Buy'
    }
  }

  //imagen seleccionada
  selectedImage:number = 0;

  //el string correspondiendte al admin
  actionAdmin:string;
  

  //Imagen seleccionada dado un index
  selectImage(index:number):void {
    this.selectedImage = index;
  }

  //anadir el item y por medio de un servicio y reservarlo
  addItem(): void {
    
  }

  //Lo que hace es revisar que el admin no pueda comprar en el dialog, lo cierra y lo manda a la ruta que permite editar el producto
  buy():void{
    if(this.userService.isAdmin){
      this.dialogRef.close();
      this.router.navigate([`/updateProduct/${this.data.id}`]);
      return void(0)
    }
    //Asegurarse si esta o no loggeado con la intencion de impedir compras si no se esta logeado
    if(this.userService.auth){
      this.productsService.bookItem(this.data.id, 'book').subscribe((message) => {
        message === 'Stockout' ? alert('Item out of stock') : void(0);
        if (message === 'Booked'){
          this.productsService.addItem(this.data.id);
          this.router.navigate(['/cart']);
          this.dialogRef.close();
        }
      });
      return void(0);
    }
    //si no se cumplen las condiciones anteriores lo dirige al login para iniciar sesion
    this.router.navigate(['/login']);
    this.dialogRef.close();
    return void(0)
  }

  //Cuando se le da click afuera del dialog se cierra
  onNoClick():void {
    this.dialogRef.close();
  }
}
