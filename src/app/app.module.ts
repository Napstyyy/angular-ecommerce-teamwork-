import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { ShopModule } from './shop/shop.module';
import { ShopCardsModule } from './shop-cards/shop-cards.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';
import { CardsContainerComponent } from './shop-cards/cards-container/cards-container.component';
import { CartComponent } from './shop/cart/cart.component';
import { HeaderComponent } from './header/header.component';

//Materials
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponentComponent } from './login/login-component/login-component.component';
import { RegisterComponent } from './login/register/register.component';

//Routes
const routes: Routes = [
  {path: 'shop', component: CardsContainerComponent},
  {path: 'cart', component: CartComponent},
  {path: 'login', component: LoginComponentComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', redirectTo: '/shop', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    AppRoutingModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,

    LoginModule,
    ShopModule,
    ShopCardsModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
