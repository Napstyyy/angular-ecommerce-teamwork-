import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products.service';
import {Router} from "@angular/router";

interface DialogData {
  id: number;
  name: string;
  details: string;
  price: string;
  images: [];
}

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private productsService:ProductsService,
    private router: Router
  ) {}

  selectedImage:number = 0;

  selectImage(index:number):void {
    this.selectedImage = index;
  }

  addItem(): void {
    this.productsService.bookItem(this.data.id, 'book').subscribe((message) => {
      message === 'Stockout' ? alert('Item out of stock') : void(0);
      if (message === 'Booked'){
        this.productsService.addItem(this.data.id);
        this.router.navigate(['/cart']);
        this.dialogRef.close();
      }
    });
  }

  buy():void{
    this.productsService.addItem(this.data.id)
  }

  onNoClick():void {
    this.dialogRef.close();
  }
}
