import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  badExpiryDate = false;

  products: {
    product: Product,
    quantity: number
  }[] = [];
  totalPrice!: number;
  cartProducts: Product[] = [];
  finalProducts: {id: number, quantity: number}[] = []; 

  checkoutForm = new UntypedFormGroup({
    cardName: new UntypedFormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    cardNumber: new UntypedFormControl('', [Validators.required, Validators.pattern("^[0-9]{16}$")]),
    expiry: new UntypedFormControl('', [Validators.required, Validators.pattern("^[0-9]{4}$")]),
    cvv: new UntypedFormControl('', [Validators.required,Validators.pattern("^[0-9]{3}$")]),
    address: new UntypedFormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]),
    city: new UntypedFormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    state: new UntypedFormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    zipCode: new UntypedFormControl('', [Validators.required, Validators.pattern("^[0-9]{5}$")]),
  });

  constructor(private productService: ProductService,private router: Router) { }

  ngOnInit(): void {
      this.productService.getCart().subscribe(
        (cart) => {
          this.products = cart.products;
          this.products.forEach(
            (element) => this.cartProducts.push(element.product)
          );
          this.totalPrice = cart.totalPrice;
        }
      );
    }


  onSubmit(): void {
    this.validateExpiry(this.checkoutForm.get('expiry')?.value)
    if (!this.checkoutForm.invalid && this.badExpiryDate == false) {
      this.products.forEach(
        (element) => {
          const id = element.product.productId;
          const quantity = element.quantity
          this.finalProducts.push({ id, quantity })
        }
      );

      if (this.finalProducts.length > 0) {
        this.productService.purchase(this.finalProducts).subscribe(
          (resp) => console.log(resp),
          (err) => console.log(err),
          () => {
            let cart = {
              cartCount: 0,
              products: [],
              totalPrice: 0.00
            };
            this.productService.setCart(cart);
            this.router.navigate(['/home']);
          }
        );

      } else {
        this.router.navigate(['/home']);
      }
    } else {
      console.log("checkout form is invalid");
    }
 
  }



  get cardName() {
    return this.checkoutForm.get('cardName');
  }

  get cardNumber() {
    return this.checkoutForm.get('cardNumber');
  }

  get expiry() {
    return this.checkoutForm.get('expiry');
  }

  get cvv() {
    return this.checkoutForm.get('cvv');
  }

  get address() {
    return this.checkoutForm.get('address');
  }

  get state() {
    return this.checkoutForm.get('state');
  }

  get city() {
    return this.checkoutForm.get('city');
  }

  get zipCode() {
    return this.checkoutForm.get('zipCode');
  }

  validateExpiry(input: any) {
    if (input) {
      let month = Number(String(input).slice(0, 2));
      let year = Number(String(input).slice(-2));
      console.log("year is" + year);
      console.log("month is " + month);
      const expiry = new Date(2000 + year, month-1);
      const current = new Date();
      console.log("expiry time " + expiry.getTime());
      console.log("expiry date " + expiry);
      console.log("current time " + current.getTime());
      console.log("current date " + current);
      if (expiry.getTime() < current.getTime())
        this.badExpiryDate = true;
      else this.badExpiryDate = false;
      console.log("flag is "+this.badExpiryDate);
    }
  }
}
