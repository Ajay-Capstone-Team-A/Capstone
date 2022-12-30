import { DecimalPipe } from '@angular/common';
import { TemplateBindingParseResult } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: {
    product: Product,
    quantity: number
  }[] = [];
  tempProducts: {
    product: Product,
    quantity: number
  }[] = [];
  totalPrice!: number;
  cartProducts: Product[] = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getCart().subscribe(
      (cart) => {
        this.products = cart.products;
        this.products.forEach(
          (element) => this.cartProducts.push(element.product)
        );
        this.totalPrice = cart.totalPrice;
        this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
      }
    );
  }

  emptyCart(): void {
    let cart = {
      cartCount: 0,
      products: [],
      totalPrice: 0.00
    };
    this.productService.setCart(cart);
    this.router.navigate(['/home']);
  }
  removeItem(name:string){
    let j=0;
    
    var locatedId=0;
    for(let i=0; i<this.products.length;i++){
      if(this.products[i].product.productName!=name){

        this.tempProducts[j]=this.products[i];
        j++;
      }
      else{
        locatedId=i;
        this.totalPrice = this.totalPrice-(this.products[locatedId].product.productPrice * this.products[locatedId].quantity);

      }
    }
    this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
    this.products.length--;

    let cart = {
      cartCount: this.products.length,
      products: this.tempProducts,
      totalPrice: this.totalPrice
    };
    this.products = this.tempProducts;
    this.productService.setCart(cart);
  }

  removeItemOne(name:string){
    let j=0;
    
    var locatedId=-1;
    for(let i=0; i<this.products.length;i++){
      if(this.products[i].product.productName!=name){

        this.tempProducts[j]=this.products[i];
        j++;
      }
      else{
        if(this.products[i].quantity==1){
        locatedId=i;
        this.totalPrice = this.totalPrice-(this.products[locatedId].product.productPrice);

        }
        else{
          locatedId=i;
          this.tempProducts[j]=this.products[i];
          this.totalPrice = this.totalPrice-(this.products[locatedId].product.productPrice);

          j++;
        }
      }
    }
    
    this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
    if(this.products[locatedId].quantity ==1){
      this.products.length--;
    }
    else{
      this.tempProducts[locatedId].quantity--;
    }

    let cart = {
      cartCount: this.products.length,
      products: this.tempProducts,
      totalPrice: this.totalPrice
    };
    this.products = this.tempProducts;
    this.productService.setCart(cart);
  }

  AddItemOne(name:string){
    let j=0;
    
    var locatedId=-1;
    for(let i=0; i<this.products.length;i++){
      if(this.products[i].product.productName==name){
        locatedId =i;
      }
    }
    this.totalPrice = this.totalPrice+(this.products[locatedId].product.productPrice);
    this.totalPrice = parseFloat(this.totalPrice.toFixed(2));

    this.products[locatedId].quantity++;

    let cart = {
      cartCount: this.products.length,
      products: this.products,
      totalPrice: this.totalPrice
    };
    this.productService.setCart(cart);
  }
  
}
