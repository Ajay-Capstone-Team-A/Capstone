import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { defer } from 'rxjs/internal/observable/defer';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let spy: jasmine.SpyObj<HttpClient>;
  let component: ProductService;
    
  
  beforeEach(async () => {
    component = new ProductService(spy);
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


describe('ProductService methods', () => {
  let spy: jasmine.SpyObj<HttpClient>;
  let component: ProductService;
    
  
  beforeEach(async () => {
    spy = jasmine.createSpyObj(["get","patch"]);
    component = new ProductService(spy);
  });
  
  it('should getCart', () => {
    component.getCart();
    expect(component.getCart).toHaveBeenCalled;
  });

  it('should setCart', () => {
    let cart={
      cartCount: 0,
    products: [],
    totalPrice: 0.00
    }
    component.setCart(cart);
    expect(component.setCart).toHaveBeenCalled;
  });

  it('should getProducts', () => {
    spy.get.and.returnValue(defer(()=>Promise.resolve("name")));

    component.getProducts();
    expect(spy.get.calls.count()).toBe(1);
  });

  it('should getSingleProduct', () => {
    spy.get.and.returnValue(defer(()=>Promise.resolve("name")));

    component.getSingleProduct(0);
    expect(spy.get.calls.count()).toBe(1);  });

  it('should purchase', () => {
    spy.patch.and.returnValue(defer(()=>Promise.resolve("name")));

    let id=0;
    let quantity=1;
    component.purchase([{id,quantity}]);
    expect(spy.patch.calls.count()).toBe(1);  
  });
});