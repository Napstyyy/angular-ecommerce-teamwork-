import { Component, Input } from '@angular/core';
import { Product } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input() index:number;
  @Input() product:Product;
}
