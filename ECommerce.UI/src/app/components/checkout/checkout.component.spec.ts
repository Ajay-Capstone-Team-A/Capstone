import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { defer } from 'rxjs/internal/observable/defer';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let spyService: jasmine.SpyObj<ProductService>;
  let spyRouter: jasmine.SpyObj<Router>;
  let component: CheckoutComponent;
    
  
  beforeEach(async () => {
    component = new CheckoutComponent(spyService,spyRouter);
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('CheckoutComponent methods', () => {
  let spyService: jasmine.SpyObj<ProductService>;
  let spyRouter: jasmine.SpyObj<Router>;
  let component: CheckoutComponent;
    
  
  beforeEach(async () => {
    spyService = jasmine.createSpyObj(["setCart","getCart","purchase"]);
    spyRouter = jasmine.createSpyObj(['navigate']);
    component = new CheckoutComponent(spyService,spyRouter);
  });
  
  it('should call onSubmit, finalProductLengt=1', () => {
    var product = new Product(1,"bob",2,"bob",1,"b");
    let quantity = 1;
    component.cardExpired=false;
    component.badMonthInput=false;
    const c = component.checkoutForm.controls
    for(const cc in c){
      c[cc].clearValidators();
      c[cc].updateValueAndValidity({onlySelf:true});
    }
    component.checkoutForm.updateValueAndValidity();
    spyService.purchase.and.returnValue(defer(()=>Promise.resolve({product,quantity})));
    
    component.products.push({product,quantity});
    
    component.onSubmit();
    expect(component.finalProducts.length ==1);
    
  });

  it('should call onSubmit, finalProductLengt=0', () => {
    
    component.onSubmit();
    expect(component.finalProducts.length ==0);
    
  });

  it('should call onSubmit, finalProductLengt=1, error', () => {
    var product = new Product(1,"bob",2,"bob",1,"b");
    let quantity = 1;
    spyService.purchase.and.returnValue(throwError({status:404}));
    
    component.products.push({product,quantity});
    
    component.onSubmit();
    expect(spyService.setCart.calls.count() ==0);
    
  });

  it('should call ngOnInit',()=>{

    var product = new Product(1,"bob",2,"bob",1,"b");
    let quantity = 1;
    
    let cart={cartCount: 0,
      products: [{product,quantity}],
      totalPrice: 0.00}
    spyService.getCart.and.returnValue(defer(()=>Promise.resolve(cart)));
    component.ngOnInit();
    expect(component.products ==cart.products);
  });
  it('should call CardName',()=>{
    expect(component.cardName).toHaveBeenCalled;
  });
  it('should call CardNumber',()=>{
    expect(component.cardNumber).toHaveBeenCalled;
  });
  it('should call expiry',()=>{
    expect(component.expiry).toHaveBeenCalled;
  });
  it('should call cvv',()=>{
    expect(component.cvv).toHaveBeenCalled;
  });
  it('should call address',()=>{
    expect(component.address).toHaveBeenCalled;
  });
  it('should call state',()=>{
    expect(component.state).toHaveBeenCalled;
  });
  it('should call city',()=>{
    expect(component.city).toHaveBeenCalled;
  });
  it('should call zipCode',()=>{
    expect(component.zipCode).toHaveBeenCalled;
  });
  it('should call validExpiry',()=>{
    component.validateExpiry(true);
    
  });
  it('should call validExpiry, badMonth',()=>{
    component.validateExpiry(-44);
    
  });
  it('should call validExpiry, expired',()=>{
    component.validateExpiry(1);
    
  });
  

});
