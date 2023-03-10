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
import { UpdateAdminComponent } from './login/update-admin/update-admin.component';
import { UpdateProductComponent } from './login/update-product/update-product.component';
import { PaymentModule } from './payment/stripe-payment/payment.module';

//Routes
const routes: Routes = [
  {path: 'shop', component: CardsContainerComponent},
  {path: 'cart', component: CartComponent},
  {path: 'login', component: LoginComponentComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'updateAdmin', component:UpdateAdminComponent},
  {path: 'updateProduct/:id', component:UpdateProductComponent},
  {path: '', redirectTo: '/shop', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  // Importaciones de absolutamente todos los modulos del aplicativo
  imports: [
    BrowserModule,//Modulo del browser standarizado por angular
    RouterModule.forRoot(routes),//El modulo de las rutas
    HttpClientModule,
    AppRoutingModule,

    MatToolbarModule,
    MatIconModule,
    MatButtonModule,

    LoginModule,//El modulo del login con sus respectivos componentes
    ShopModule,//El modulo del shop con sus respectivos componentes
    ShopCardsModule,//El modulo de las cartas de la tienda con sus respectivos componentes
    BrowserAnimationsModule,
    PaymentModule//El modulo del portal de pagos con sus respectivos componentes

  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {} //Exportando el modulo de toda la app hacia el index.html que se vera reflejado como label app-root
