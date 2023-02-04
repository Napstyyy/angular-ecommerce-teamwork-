import { Token } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import {Router} from "@angular/router";
import { ProductsService } from 'src/app/services/products.service';
import { StripeService } from 'src/app/services/stripe.service'; //se importan los servicios de stripe para poder generar los intentos de pago a stripe

@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',//componente para el html del payment
  styleUrls: ['./stripe-payment.component.css']//componente para el css de del payment
})
export class StripePaymentComponent implements AfterViewInit{

  @ViewChild('cardInfo') cardInfo: ElementRef;
  cardError: string; //aqui se almacena el error de la tarjeta en caso de que se encuentre un error con respecto a la tarjeta
  card: any;

  constructor(private ngZone: NgZone,
    private stripService: StripeService,
    private productsService: ProductsService,
    private router:Router,
    ){ }

  ngAfterViewInit() {
    this.card = elements.create('card');//se crea un nuevo elemento card dentro de card
    this.card.mount(this.cardInfo.nativeElement);//se le de la a la card un elemento nativo
    this.card.addEventListener('change', this.onChange.bind(this));//al encontrar un event se llama al onChange para poder verificar que no se encuentre ningun error
  }

  onChange({ error }: {error: any}) { //para cada cambio se revisa si se encuentra un error y se le asigna a la tarjeta y si no, no se le asigna nada
    if (error) {
      this.ngZone.run(() => this.cardError = error.message);//se le entrega a cardError el error generado por la tarjeta
    } else {
      this.ngZone.run(() => this.cardError = '');//en caso de que no haya ningun error no se le asigna nada
    }
  }

  async onClick() {
    //creamos token y error que serviran para recibir el token que es un identificador para cada compra
    const { token, error } = await stripe.createToken(this.card); //se utiliza un metodo de stripe para crear un nuevo Token para cada pago
    if (token) {//se se encuentra el token entonces entra en la condicion
      console.log(this.productsService.totalCost);//mostramos en la consola el total del costo de la compra
      //aqui se llama al servicio entregandole 3 parametro: el costo total de la compra, el id del token de esa compra y un mensaje 
      this.stripService.charge(this.productsService.totalCost,token.id, "compra realizada").subscribe(() => console.log('Succesful payment'));//una vez hecho se muestra por consola el mensaje 'Succesful payment'
      this.productsService.buyProductAux().subscribe((data) => console.log(data));
      this.router.navigate(['/'])
    } else {
      this.ngZone.run(() => this.cardError = error.message);//en caso de que no se de el token se le asigna el mensaje de error a cardError y se muestra el error
    }
  }//fin de la funcion onCLick
}

