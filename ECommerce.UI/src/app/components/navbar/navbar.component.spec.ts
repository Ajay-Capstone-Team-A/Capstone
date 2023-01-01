import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { defer } from 'rxjs/internal/observable/defer';
import { Subscription } from 'rxjs/internal/Subscription';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { CartComponent } from '../cart/cart.component';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let spyService: jasmine.SpyObj<ProductService>;
  let spyRouter: jasmine.SpyObj<Router>;
  let spyAuth: jasmine.SpyObj<AuthService>;
  let component: NavbarComponent;
    
  
  beforeEach(async () => {
    component = new NavbarComponent(spyAuth,spyRouter,spyService);
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('NavbarComponent methods', () => {
  let spyService: jasmine.SpyObj<ProductService>;
  let spyRouter: jasmine.SpyObj<Router>;
  let spyAuth: jasmine.SpyObj<AuthService>;
  let spySub: jasmine.SpyObj<Subscription>;
  let component: NavbarComponent;
    
  
  beforeEach(async () => {
    spyService = jasmine.createSpyObj(["getCart"]);
    spyRouter = jasmine.createSpyObj(["navigate"]);
    spyAuth = jasmine.createSpyObj(["logout"]);
    spySub = jasmine.createSpyObj(["unsubscribe"]);
    component = new NavbarComponent(spyAuth,spyRouter,spyService);
  });
  
  it('should logout', () => {
    component.logout();
    spyAuth.logout.and.callFake;
    spyRouter.navigate.and.callFake;
    expect(spyRouter.navigate.calls.count()).toBe(1);
    expect(spyAuth.logout.calls.count()).toBe(1);
    
  });
  it('should call ngOnInit', () => {
    var product = new Product(1,"bob",2,"bob",1,"b");
    let quantity = 1;
    
    let cart={cartCount: 0,
      products: [{product,quantity}],
      totalPrice: 0.00}
    spyService.getCart.and.returnValue(defer(()=>Promise.resolve(cart)));
    component.ngOnInit();
    expect(component.cartCount ==1);
    
  });
  it('should call ngOnDestroy', () => {
    component.subscription = new Subscription();
    spySub.unsubscribe.and.callFake;
    component.ngOnDestroy();
    expect(component.subscription.unsubscribe).toHaveBeenCalled;
  });

  it('should call getProfile',()=>{
    component.getProfile();
    expect(component.getProfile).toHaveBeenCalled;
  });
});
