import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product, ProductsService } from 'src/app/services/products.service';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent { //El componente del interior de la carta

  constructor(private productsService:ProductsService, public dialog:MatDialog){}//Se construyen el tipo para los atributos del interior de la carta, Productservice como las peticiones que se haran y el dialog como la "mini pestana que se abre a la hora de dar click en un producto"
  
  @Input() product:Product;//Se hereda el producto dado del padre al hijo
  @Input() images:string[];//Se heredan las imagenes de forma de string

  getPriceText = () => this.productsService.priceText(this.product.price);//Se recibe el precio por medio de la peticion

  //se abre el dialog del producto usando el componente del dialogo
  openDialog = () => {
    this.dialog.open(ProductDialogComponent, {
      data: {id:this.product.id, name: this.product.name, details: this.product.details, price: this.getPriceText(), images: this.images},//simplemente se le anade al dialog los componentes de cada producto
      //Darle estilos genericos sin necesidad de css
      width: '60%',
      height: '40%',
      minWidth: '200px'
    });

  }
}
