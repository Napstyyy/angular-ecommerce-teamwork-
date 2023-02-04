import { Token } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import {Router} from "@angular/router";
import { ProductsService } from 'src/app/services/products.service';
import { StripeService } from 'src/app/services/stripe.service';

@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.component.html',
  styleUrls: ['./stripe-payment.component.css']
})
export class StripePaymentComponent implements AfterViewInit{

  @ViewChild('cardInfo') cardInfo: ElementRef;
  cardError: string;
  card: any;

  constructor(private ngZone: NgZone,
    private stripService: StripeService,
    private productsService: ProductsService,
    private router:Router,
    ){ }

  ngAfterViewInit() {
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.onChange.bind(this));
  }

  onChange({ error }: {error: any}) {
    if (error) {
      this.ngZone.run(() => this.cardError = error.message);
    } else {
      this.ngZone.run(() => this.cardError = '');
    }
  }

  async onClick() {
    const { token, error } = await stripe.createToken(this.card);
    if (token) {
      console.log(this.productsService.totalCost);
      this.stripService.charge(this.productsService.totalCost,token.id, "macarena grasuda").subscribe(() => {
        console.log('Succesful payment')
        this.productsService.buyProductAux().subscribe(data => console.log(data));
        this.router.navigate(['/'])
      });
    } else {
      this.ngZone.run(() => this.cardError = error.message);
    }
  }
}

