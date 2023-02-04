import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripePaymentComponent } from './stripe-payment.component';//se importa el componente del pago 
import { StripePaymentRoutingModule } from './stripe-payment-routing.module';//se importa el modulo del router 
import { ShopModule } from 'src/app/shop/shop.module';//se importa el modulo del shop para poder obtener todos los componentes de la aplicacion



@NgModule({
  declarations: [
    StripePaymentComponent
  ],
  imports: [
    CommonModule,
    StripePaymentRoutingModule,
    ShopModule//se importa el ShopModule para poder obtener el servicio del valor total de la compra
  ]
})
export class PaymentModule { }
