import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { BrowserModule } from '@angular/platform-browser';
import { CartComponent } from './cart/cart.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';



@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatTableModule,
    MatButtonModule,
    MatDividerModule,
    BrowserModule
  ],
  exports: [
    CartComponent
  ]
})
export class ShopModule { }
