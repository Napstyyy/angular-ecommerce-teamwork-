import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Materials
import { MatCardModule } from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';


//Components
import { ProductCardComponent } from './product-card/product-card.component';
import { CardsContainerComponent } from './cards-container/cards-container.component';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';


@NgModule({
  declarations: [
    ProductCardComponent,
    CardsContainerComponent,
    ProductDialogComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatExpansionModule,
    MatGridListModule
  ],
  exports: [
    ProductCardComponent,
    CardsContainerComponent
  ]
})
export class ShopCardsModule { }
