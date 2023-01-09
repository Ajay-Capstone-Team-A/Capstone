import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { defer } from 'rxjs/internal/observable/defer';
import { User } from '../models/user';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let spy: jasmine.SpyObj<HttpClient>;
  let component: AuthService;
    
  
  beforeEach(async () => {
    component = new AuthService(spy);
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('AuthService metods', () => {
  let spy: jasmine.SpyObj<HttpClient>;
  let component: AuthService;
    
  
  beforeEach(async () => {
    spy = jasmine.createSpyObj(["post","get","patch"]);
    component = new AuthService(spy);
  });
  
  it('should call login', () => {
    
    spy.post.and.returnValue(defer(()=>Promise.resolve("name")));

    component.login("email","password");
    expect(spy.post.calls.count()).toBe(1);
  });

  it('should call logout', () => {
    
    spy.post.and.returnValue(defer(()=>Promise.resolve("name")));

    component.logout();
    expect(spy.post.calls.count()).toBe(1);
  });

  it('should call register', () => {
    
    spy.post.and.returnValue(defer(()=>Promise.resolve("name")));

    component.register("","","","");
    expect(spy.post.calls.count()).toBe(1);
  });

  it('should call getUser', () => {
    
    spy.get.and.returnValue(defer(()=>Promise.resolve("name")));

    component.getUser(0);
    expect(spy.get.calls.count()).toBe(1);
  });
  it('should call patchUser',()=>{
      spy.patch.and.returnValue(defer(()=>Promise.resolve("name")));
      let user = new User(1,'','','','');
      component.patchUser(user);
      expect(spy.patch.calls.count()).toBe(1);

  });
  it('shoulc call checkEmail',()=>{
    spy.get.and.returnValue(defer(()=>Promise.resolve("name")))
    component.checkEmail("name");
    expect(spy.get.calls.count()).toBe(1);

  });

});