import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentuserService } from 'src/app/services/currentuser.service';
import { defer } from 'rxjs/internal/observable/defer';
import { throwError } from 'rxjs';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';


import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let spyCurrentUser: jasmine.SpyObj<CurrentuserService>;
  let spyAuth: jasmine.SpyObj<AuthService>;
  let component: ProfileComponent;

  beforeEach(async () => {
    component = new ProfileComponent(spyCurrentUser, spyAuth)});

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});


describe('ProfileComponent methods', () => {
  let spyCurrentUser: jasmine.SpyObj<CurrentuserService>;
  let spyAuth: jasmine.SpyObj<AuthService>;
  let component: ProfileComponent;

  beforeEach(async () => {
    spyAuth = jasmine.createSpyObj(["patchUser"]);
    spyCurrentUser = jasmine.createSpyObj(["setUser"], ["getUser"]);
    component = new ProfileComponent(spyCurrentUser, spyAuth);
  });

  it('should call updateEmail', () => {
    var currentuser = new User(1, "First", "Last", "email@no.com", "password");
    var newemail = "newemail@no.com";
    component.currentuser = currentuser;
    spyAuth.patchUser.and.returnValue(defer(()=>Promise.resolve({currentuser})));
    component.updateEmail(component.currentuser.userEmail, newemail);
    expect(component.currentuser.userEmail==newemail);
  });

  it('should call updateEmail, error email already exist', () => {
    var currentuser = new User(1, "First", "Last", "email@no.com", "password");
    var newemail = "admin";
    component.currentuser = currentuser;
    spyAuth.patchUser.and.returnValue(throwError({status:500}));
    component.updateEmail(component.currentuser.userEmail, newemail);
    expect(component.currentuser.userEmail!=newemail);
  })

  it('should call updatePassword', () => {
    var currentuser = new User(1, "First", "Last", "email@no.com", "password");
    var currpw = "password";
    var newpw = "testing";
    var newpwconf = "testing";
    component.currentuser = currentuser;
    spyAuth.patchUser.and.returnValue(defer(()=>Promise.resolve({currentuser})));
    component.updatePassword(currpw, newpw, newpwconf);
    expect(component.currentuser.userPassword==newpwconf);
  });

  it('should call updatePassword, error incorrect pw', () => {
    var currentuser = new User(1, "First", "Last", "email@no.com", "password");
    var currpw = "incorrect";
    var newpw = "testing";
    var newpwconf = "testing";
    component.currentuser = currentuser;
    spyAuth.patchUser.and.returnValue(defer(()=>Promise.resolve({currentuser})));
    expect(component.updatePassword(currpw, newpw, newpwconf)).toBeUndefined();
    
  });

  it('should call updatePassword, error new password do not match', () => {
    var currentuser = new User(1, "First", "Last", "email@no.com", "password");
    var currpw = "password";
    var newpw = "testing";
    var newpwconf = "tesing";
    component.currentuser = currentuser;
    spyAuth.patchUser.and.returnValue(defer(()=>Promise.resolve({currentuser})));
    expect(component.updatePassword(currpw, newpw, newpwconf)).toBeUndefined();
    
  });

})

