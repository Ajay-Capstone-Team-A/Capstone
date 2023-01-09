import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { defer } from 'rxjs/internal/observable/defer';
import { Subscription } from 'rxjs';
import { Review } from 'src/app/models/review';
import { reviewDTO } from 'src/app/models/reviewDTO';

describe('ProductCardComponent', () => {
  let spy: jasmine.SpyObj<ProductService>;
  let component: ProductCardComponent;
  

  beforeEach(async () => {
    component = new ProductCardComponent(spy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('ProductCardComponent methods', () => {
  let spy: jasmine.SpyObj<ProductService>;
  let spySub: jasmine.SpyObj<Subscription>;
  let spyProd: jasmine.SpyObj<Product>;
  let component: ProductCardComponent;
  

  beforeEach(async () => {
    spy = jasmine.createSpyObj(["getCart", "setCart","getReviewAverage","getReviews"]);
    spySub = jasmine.createSpyObj(["unsubscribe"]);
    component = new ProductCardComponent(spy);
  });

  it('should call addToCart, already in cart', () => {
    
    var product = new Product(1,"bob",2,"bob",1,"b");
    var quantity = 1;
    component.products.push({product,quantity})
    spy.setCart.and.callFake;

    component.addToCart(product,1);
    expect(component.products[0].quantity ==2);
  
  });
  it('should call addToCart, not in cart', () => {
    
    var product = new Product(1,"bob",2,"bob",1,"b");
    spy.setCart.and.callFake;

    component.addToCart(product,1);
    expect(component.products[0].quantity ==1);
  
  });
  it('should call addToCart, quantity 0', () => {
    
    var product = new Product(1,"bob",2,"bob",1,"b");
    spy.setCart.and.callFake;

    component.addToCart(product,0);
    expect(component.products[0] ==undefined);
  
  });
  it('should call addToCart, not in cart, quantity error', () => {
    
    var product = new Product(1,"bob",2,"bob",1,"b");
    spy.setCart.and.callFake;

    component.addToCart(product,4);
    expect(component.products[0] ==undefined);
  
  });
  it('should call addToCart, already in cart, quantity error', () => {
    
    var product = new Product(1,"bob",2,"bob",1,"b");
    var quantity = 1;
    component.products.push({product,quantity})
    spy.setCart.and.callFake;

    component.addToCart(product,5);
    expect(component.products[0] ==undefined);
  
  });


  it('should call ngOnDestroy', () => {
    component.subscription = new Subscription();
    spySub.unsubscribe.and.callFake;
    component.ngOnDestroy();
    expect(component.subscription.unsubscribe).toHaveBeenCalled;
  
  });

});


