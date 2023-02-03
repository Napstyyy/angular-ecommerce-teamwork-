import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripePaymentComponent } from './stripe-payment.component';
import { StripePaymentRoutingModule } from './stripe-payment-routing.module';
import { ShopModule } from 'src/app/shop/shop.module';



@NgModule({
  declarations: [
    StripePaymentComponent
  ],
  imports: [
    CommonModule,
    StripePaymentRoutingModule,
    ShopModule
  ]
})
export class PaymentModule { }
