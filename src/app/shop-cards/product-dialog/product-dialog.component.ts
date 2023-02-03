import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products.service';
import {Router} from "@angular/router";
import { UsersServiceService } from 'src/app/services/users-service.service';

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
export class ProductDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private productsService:ProductsService,
    private router: Router,
    public userService: UsersServiceService
  ) {}

  ngOnInit(): void {
    if(this.userService.isAdmin){
      this.actionAdmin = 'Edit'
    }else{
      this.actionAdmin = 'Buy'
    }
  }

  selectedImage:number = 0;

  actionAdmin:string;
  


  selectImage(index:number):void {
    this.selectedImage = index;
  }

  buy():void{
    if(this.userService.isAdmin){
      this.dialogRef.close();
      this.router.navigate([`/updateProduct/${this.data.id}`]);
      return void(0)
    }

    if(this.userService.auth){
      this.productsService.addItem(this.data.id)
      this.router.navigate(['/cart']);
      this.dialogRef.close();
      return void(0)
    }
    this.router.navigate(['/login']);
    this.dialogRef.close();
    return void(0)
  }

  onNoClick():void {
    this.dialogRef.close();
  }
}
