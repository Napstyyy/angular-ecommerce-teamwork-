import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ShopModule } from './shop/shop.module';
import { ShopCardsModule } from './shop-cards/shop-cards.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ShopModule,
    ShopCardsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
