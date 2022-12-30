import { ComponentFixture, TestBed } from '@angular/core/testing';
import { defer } from 'rxjs/internal/observable/defer';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

import { DisplayProductsComponent } from './display-products.component';

describe('DisplayProductsComponent', () => {
    let spy: jasmine.SpyObj<ProductService>;
    let component: DisplayProductsComponent;
    
  
    beforeEach(async () => {
      component = new DisplayProductsComponent(spy);
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('DisplayProductsComponent methods', () => {
    let spy: jasmine.SpyObj<ProductService>;
    let component: DisplayProductsComponent;
    
  
    beforeEach(async () => {
      spy = jasmine.createSpyObj(["getProducts"]);
      component = new DisplayProductsComponent(spy);
    });
  
    it('should call ngOnInit', () => {
      let allProducts: Product[] = [];
      let p = new Product(1,"bob",1,"bob",1,"b");
      allProducts.push(p);
      spy.getProducts.and.returnValue(defer(()=>Promise.resolve(allProducts)));
      component.ngOnInit();
      expect(component.allProducts = allProducts);
    });
  });
