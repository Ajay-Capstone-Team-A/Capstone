import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{

  cartCount!: number;
  quantity: number = 1;
  rating!: number;
  products: {
    product: Product,
    quantity: number
  }[] = [];
  subscription!: Subscription;
  totalPrice: number = 0;

  @Input() productInfo!: Product;

  constructor(private productService: ProductService) { }
  
  ngOnInit(): void {
    this.subscription = this.productService.getCart().subscribe(
      (cart) => {
        this.cartCount = cart.cartCount;
        this.products = cart.products;
        this.totalPrice = cart.totalPrice;
      }
    );
    this.productService.getReviewAverage(this.productInfo.productId).subscribe(
      (data) => {
        this.rating = data;
      }
    )
  }

  getAvg() {
    this.productService.getReviewAverage(this.productInfo.productId).subscribe(
      (data) => {
        this.rating = data;
      }
    )
  }

  addToCart(product: Product, quantity:number): void {

    if(quantity<=0){
      alert("Error, must be greater than 0");
    }
    else{
    console.log(this.productInfo);
    let inCart = false;

    this.products.forEach(
      (element) => {
        if(element.product.productId == product.productId){
          if(product.productQuantity < element.quantity+quantity){
            alert("Error, Not enough in stock to meet request");
            inCart=true;
            return
          }
          else{
          element.quantity =element.quantity+quantity;
          let cart = {
            cartCount: this.cartCount + quantity,
            products: this.products,
            totalPrice: this.totalPrice + product.productPrice*quantity
          };
          this.productService.setCart(cart);
          inCart=true;
          return;
        };
      }
    }
    );

    if(inCart == false){
      if(product.productQuantity <quantity){
        alert("Error, Not enough in stock to meet request");
      }
      else{
      let newProduct = {
        product: product,
        quantity: quantity
      };
      this.products.push(newProduct);
      let cart = {
        cartCount: this.cartCount + quantity,
        products: this.products,
        totalPrice: this.totalPrice + product.productPrice*quantity
      }
      this.productService.setCart(cart);
    }
  }
  }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
