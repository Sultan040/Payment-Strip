import {Component, Inject, Optional, ViewChild} from '@angular/core';
import {Appearance, StripeElementsOptions} from "@stripe/stripe-js";
import {FormBuilder, Validators} from "@angular/forms";
import {PlutoService} from "./pluto.service";
import {StripePaymentElementComponent, StripeService} from "ngx-stripe";
import {DialogComponent} from "./dialog.component";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Payment Stripe';

  // @ts-ignore
  @ViewChild(StripePaymentElementComponent) paymentElement: StripePaymentElementComponent;

  name = 'Ricardo';
  email = 'support@ngx-stripe.dev';
  address = 'Av. Ramon Nieto 313B 2D';
  zipcode = '36205';
  city = 'Vigo';
  amount = 2500;

  checkoutForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    address: ['', [Validators.required]],
    zipcode: ['', [Validators.required]],
    city: ['', [Validators.required]],
    amount: [2500, [Validators.required, Validators.pattern(/\d+/)]],
  });

  appearance: Appearance = {
    theme: 'stripe',
    labels: 'floating',
    variables: {
      colorPrimary: '#673ab7',
    },
  };
  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  paying = false;

  get amounts() {
    // @ts-ignore
    if (
      !this.checkoutForm.get('amount') || !this.checkoutForm.get('amount')?.value
    )
      return 0;
    // @ts-ignore
    const amount = this.checkoutForm.get('amount').value;
    return Number(amount) / 100;
  }

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private stripeService: StripeService,
    private plutoService: PlutoService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    this.plutoService
      .createPaymentIntent({
        amount: this.amount,
        currency: 'usd',
        // customer: '1213545',/
        description: 'Product Name'
      })
      .subscribe((pi) => {
        console.log(pi);
        // @ts-ignore
        this.elementsOptions.clientSecret = pi.client_secret;
      });
  }

  collectPayment() {
    if (this.paying) return;
    // if (this.checkoutForm.invalid) {
    //   return;
    // }

    this.paying = true;
    // @ts-ignore
    this.stripeService
      .confirmPayment({
        elements: this.paymentElement.elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: this.checkoutForm.get('name')?.value,
              email: this.checkoutForm.get('email')?.value,
              address: {
                line1: this.checkoutForm.get('address')?.value,
                postal_code: this.checkoutForm.get('zipcode')?.value,
                city: this.checkoutForm.get('city')?.value,
              },
            },
          },
        },
        redirect: 'if_required',
      })
      .subscribe({
        next: (result) => {
          this.paying = false;
          if (result.error) {
            this.dialog.open(DialogComponent, {
              data: {
                type: 'error',
                message: result.error.message,
              },
            });
          } else { // @ts-ignore
            if (result.paymentIntent.status === 'succeeded') {
                        this.dialog.open(DialogComponent, {
                          data: {
                            type: 'success',
                            message: 'Payment processed successfully',
                          },
                        });
                      }
          }
        },
        error: (err) => {
          this.paying = false;
          this.dialog.open(DialogComponent, {
            data: {
              type: 'error',
              message: err.message || 'Unknown Error',
            },
          });
        },
      });
  }

  clear() {
    this.checkoutForm.patchValue({
      name: '',
      email: '',
      address: '',
      zipcode: '',
      city: '',
    });
  }

}
