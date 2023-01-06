import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { defer } from 'rxjs/internal/observable/defer';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

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
    spyAuth = jasmine.createSpyObj(["register","checkEmail"]);
    spyRouter = jasmine.createSpyObj(["navigate"]);
    spyOn(window.console, "log");
    component = new RegisterComponent(spyAuth,spyRouter);
  });
  
  it('should call onSubmit', () => {
    var user = new User(1,"b","b","b","b");
    let quantity = 1;
    spyAuth.checkEmail.and.returnValue(defer(()=>Promise.resolve(true)));
    spyAuth.register.and.returnValue(defer(()=>Promise.resolve({user,quantity})));
    spyRouter.navigate.and.callFake;
    component.onSubmit();
    expect(window.console.log).toHaveBeenCalled;
  });

  it('should call onSubmit, error', () => {
    var product = new Product(1,"bob",2,"bob",1,"b");
    let quantity = 1;
    spyAuth.checkEmail.and.returnValue(defer(()=>Promise.resolve(true)));
   
    spyAuth.register.and.returnValue(throwError({status:404}));
    spyRouter.navigate.and.callFake;
    component.onSubmit();
    expect(window.console.log).toHaveBeenCalled;
  });

  it('should call ngOnInit',()=>{
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled;

  });
});