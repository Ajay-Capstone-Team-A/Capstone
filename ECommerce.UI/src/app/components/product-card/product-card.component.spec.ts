import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { defer } from 'rxjs/internal/observable/defer';
import { Subscription } from 'rxjs';

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
  let spySub: jasmine.SpyObj<Subscription>
  let component: ProductCardComponent;
  

  beforeEach(async () => {
    spy = jasmine.createSpyObj(["getCart", "setCart"]);
    spySub = jasmine.createSpyObj(["unsubscribe"]);
    component = new ProductCardComponent(spy);
  });

  it('should call ngOnInit', () => {
    var product = new Product(1,"bob",2,"bob",1,"b");
    let quantity = 1;
    
    let cart={cartCount: 0,
      products: [{product,quantity}],
      totalPrice: 0.00}
    spy.getCart.and.returnValue(defer(()=>Promise.resolve(cart)));
    component.ngOnInit();
    expect(component.products ==cart.products);
  });

  it('should call addToCart, already in cart', () => {
    
    var product = new Product(1,"bob",2,"bob",1,"b");
    var quantity = 1;
    component.products.push({product,quantity})
    spy.setCart.and.callFake;

    component.addToCart(product);
    expect(component.products[0].quantity ==2);
  
  });
  it('should call addToCart, not in cart', () => {
    
    var product = new Product(1,"bob",2,"bob",1,"b");
    spy.setCart.and.callFake;

    component.addToCart(product);
    expect(component.products[0].quantity ==1);
  
  });

  it('should call ngOnDestroy', () => {
    component.subscription = new Subscription();
    spySub.unsubscribe.and.callFake;
    component.ngOnDestroy();
    expect(component.subscription.unsubscribe).toHaveBeenCalled;
  
  });

});


