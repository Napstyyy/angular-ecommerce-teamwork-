import { Token } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, ViewChild, NgZone } from '@angular/core';
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
    private stripService: StripeService
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
      this.stripService.charge(10001,token.id, "macarena grasuda").subscribe(() => console.log('pago exitoso'));
    } else {
      this.ngZone.run(() => this.cardError = error.message);
    }
  }
}

