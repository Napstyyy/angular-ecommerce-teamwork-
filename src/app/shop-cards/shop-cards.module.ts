import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { ProductCardComponent } from './product-card/product-card.component';
import { CardsContainerComponent } from './cards-container/cards-container.component';

@NgModule({
  declarations: [
    ProductCardComponent,
    CardsContainerComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    ProductCardComponent,
    CardsContainerComponent
  ]
})
export class ShopCardsModule { }
