import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product, ProductsService } from 'src/app/services/products.service';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  constructor(private productsService:ProductsService, public dialog:MatDialog){}
  
  @Input() product:Product;
  @Input() images:string[];

  getPriceText = () => this.productsService.priceText(this.product.price);

  openDialog = () => {
    this.dialog.open(ProductDialogComponent, {
      data: {name: this.product.name, details: this.product.details, price: this.getPriceText(), images: this.images},
      width: '80%',
      height: '50%',
      minWidth: '200px'
    });

  }
}
