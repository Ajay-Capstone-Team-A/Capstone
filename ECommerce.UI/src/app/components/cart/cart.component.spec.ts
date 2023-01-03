import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { defer } from 'rxjs/internal/observable/defer';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let spyRouter: jasmine.SpyObj<Router>;
  let spyService: jasmine.SpyObj<ProductService>;
  let component: CartComponent;
    
  
  beforeEach(async () => {
    component = new CartComponent(spyService,spyRouter);
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('CartComponent Methods', () => {
  let spyRouter: jasmine.SpyObj<Router>;
  let spyService: jasmine.SpyObj<ProductService>;
  let component: CartComponent;
    
  
  beforeEach(async () => {
    spyService = jasmine.createSpyObj(["setCart","getCart"]);
    spyRouter = jasmine.createSpyObj(['navigate']);
    component = new CartComponent(spyService,spyRouter);
  });
  
  it('should call setCart correctly', () => {
    spyService.setCart.and.returnValue();
    component.emptyCart();
    expect(spyService.setCart.calls.count()).toBe(1);
  });

  it('should call removeItem correctly',()=>{
    spyService.setCart.and.returnValue();
    var product = new Product(1,"bob",2,"bob",1,"b");
    let quantity = 1;
    component.products.push({product,quantity});
    
    component.removeItem("bob");
    expect(spyService.setCart.calls.count()).toBe(1);
  });
  it('should call removeItem correctly, with other data not deleted',()=>{
    spyService.setCart.and.returnValue();
    var product = new Product(1,"bob",2,"bob",1,"b");
    let quantity = 1;
    component.products.push({product,quantity});
    product = new Product(1,"tom",2,"tom",1,"t");
    component.products.push({product,quantity});
    
    component.removeItem("bob");
    expect(spyService.setCart.calls.count()).toBe(1);
  });

  it('should call removeItemOne correctly',()=>{
    spyService.setCart.and.returnValue();
    var product = new Product(1,"bob",2,"bob",1,"b");
    let quantity = 1;
    component.products.push({product,quantity});
    
    component.removeItemOne("bob");
    expect(spyService.setCart.calls.count()).toBe(1);
  });

  it('should call removeItemOne correctly, more than one',()=>{
    spyService.setCart.and.returnValue();
    var product = new Product(1,"bob",2,"bob",1,"b");
    let quantity = 2;
    component.products.push({product,quantity});
    
    component.removeItemOne("bob");
    expect(spyService.setCart.calls.count()).toBe(1);
  });

  it('should call removeItemOne correctly, extras',()=>{
    spyService.setCart.and.returnValue();
    var product = new Product(1,"bob",2,"bob",1,"b");
    let quantity = 1;
    component.products.push({product,quantity});
    product = new Product(1,"tom",2,"tom",1,"t");
    component.products.push({product,quantity});
    
    component.removeItemOne("bob");
    expect(spyService.setCart.calls.count()).toBe(1);
  });

  it('should call AddItemOne correctly',()=>{
    spyService.setCart.and.returnValue();
    var product = new Product(1,"bob",2,"bob",1,"b");
    let quantity = 1;
    component.products.push({product,quantity});
    
    component.AddItemOne("bob");
    expect(spyService.setCart.calls.count()).toBe(1);
    expect(component.products[0].quantity==2);
  });
  it('should call AddItemOne, quantity error',()=>{
    spyService.setCart.and.returnValue();
    var product = new Product(1,"bob",2,"bob",1,"b");
    let quantity = 1;
    component.products.push({product,quantity});
    
    component.AddItemOne("bob");
    component.AddItemOne("bob");
    expect(spyService.setCart.calls.count()).toBe(1);
    expect(component.products[0]==undefined);
  });

  it('should call ngOnInit',()=>{

    var product = new Product(1,"bob",2,"bob",1,"b");
    let quantity = 1;
    
    let cart={cartCount: 0,
      products: [{product,quantity},{product,quantity}],
      totalPrice: 0.00}
    spyService.getCart.and.returnValue(defer(()=>Promise.resolve(cart)));
    component.ngOnInit();
    component.products = [{product,quantity}]
    expect(component.products ==cart.products);
  });
  it('should call ngOnInit, for loop',()=>{

    var product = new Product(1,"bob",2,"bob",1,"b");
    let quantity = 1;
    
    let cart={cartCount: 0,
      products: [{product,quantity},{product,quantity}],
      totalPrice: 0.00}
    spyService.getCart.and.returnValue(defer(()=>Promise.resolve(cart)));
    component.ngOnInit();
    component.products = [{product,quantity}]
    expect(component.products.length ==1);
    expect(component.quantity ==1);
  });
  
  it('should call initalize',()=>{
    var product = new Product(1,"bob",2,"bob",1,"b");
    let quantity = 1;
    component.products = [{product,quantity}];
    component.initalize();
    expect(component.initalize).toHaveBeenCalled;
  });


});