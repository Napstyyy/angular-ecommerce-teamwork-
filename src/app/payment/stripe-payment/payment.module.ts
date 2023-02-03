import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripePaymentComponent } from './stripe-payment.component';
import { StripePaymentRoutingModule } from './stripe-payment-routing.module';



@NgModule({
  declarations: [
    StripePaymentComponent
  ],
  imports: [
    CommonModule,
    StripePaymentRoutingModule
  ]
})
export class PaymentModule { }
