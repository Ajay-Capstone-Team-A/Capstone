import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { defer } from 'rxjs/internal/observable/defer';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let spyRouter: jasmine.SpyObj<Router>;
  let spyAuth: jasmine.SpyObj<AuthService>;
  let component: RegisterComponent;
    
  
  beforeEach(async () => {
    component = new RegisterComponent(spyAuth,spyRouter);
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('RegisterComponent methods', () => {
  let spyRouter: jasmine.SpyObj<Router>;
  let spyAuth: jasmine.SpyObj<AuthService>;
  let component: RegisterComponent;
    
  
  beforeEach(async () => {
    spyAuth = jasmine.createSpyObj(["register"]);
    spyRouter = jasmine.createSpyObj(["navigate"]);
    spyOn(window.console, "log");
    component = new RegisterComponent(spyAuth,spyRouter);
  });
  
  it('should call onSubmit', () => {
    var product = new Product(1,"bob",2,"bob",1,"b");
    let quantity = 1;
    spyAuth.register.and.returnValue(defer(()=>Promise.resolve({product,quantity})));
    spyRouter.navigate.and.callFake;
    component.onSubmit();
    expect(window.console.log).toHaveBeenCalled;
  });
});