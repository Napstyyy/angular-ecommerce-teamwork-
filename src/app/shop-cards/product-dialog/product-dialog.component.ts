import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
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
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  selectedImage:number = 0;

  selectImage(index:number):void {
    this.selectedImage = index;
  }

  onNoClick():void {
    this.dialogRef.close();
  }
}
