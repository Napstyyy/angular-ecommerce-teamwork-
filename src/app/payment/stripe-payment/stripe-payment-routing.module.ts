import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // Importando libreria de rutas para generar la ruta del cart
import { StripePaymentComponent } from './stripe-payment.component';// Importando el CartComponent para que aparezca en la ruta "cart"

// Se define el objeto routes de tipo Routes para ser usado en el modulo de rutas
const routes: Routes = [
  {
    path:"payment", component:StripePaymentComponent
  }
]
// Cuerpo del modulo rutas
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StripePaymentRoutingModule { } // Se exporta la ruta del carrito