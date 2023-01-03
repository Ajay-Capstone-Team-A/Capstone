import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { defer } from 'rxjs/internal/observable/defer';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { CurrentuserService } from 'src/app/services/currentuser.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let spyRouter: jasmine.SpyObj<Router>;
  let spyAuth: jasmine.SpyObj<AuthService>;
  let spyUser :jasmine.SpyObj<CurrentuserService>
  let component: LoginComponent;
    
  
  beforeEach(async () => {
    component = new LoginComponent(spyAuth,spyRouter,spyUser);
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('LoginComponent methods', () => {
  let spyRouter: jasmine.SpyObj<Router>;
  let spyAuth: jasmine.SpyObj<AuthService>;
  let spyUser: jasmine.SpyObj<CurrentuserService>
  let component: LoginComponent;
    
  
  beforeEach(async () => {
    spyAuth = jasmine.createSpyObj(["login"]);
    spyRouter = jasmine.createSpyObj(["navigate"]);
    spyUser = jasmine.createSpyObj(["setUser"]);
    component = new LoginComponent(spyAuth,spyRouter,spyUser);
  });
  
  it('should call onSubmit', () => {
    var product = new Product(1,"bob",2,"bob",1,"b");
    let quantity = 1;
    spyAuth.login.and.returnValue(defer(()=>Promise.resolve({product,quantity})));
    component.onSubmit();
    expect(spyAuth.loggedIn==true);
  });

  it('should call onSubmit, error', () => {
    var product = new Product(1,"bob",2,"bob",1,"b");
    let quantity = 1;
    spyAuth.login.and.returnValue(throwError({status:404}));
    component.onSubmit();
    expect(spyAuth.loggedIn==false);
  });
  

  it('should call register', () => {
    spyRouter.navigate.and.returnValue(Promise.resolve(true));
    component.register();
    expect(spyRouter.navigate.calls.count()).toBe(1);
  });

  it('should call ngOnInit',()=>{
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled;
  });
});
