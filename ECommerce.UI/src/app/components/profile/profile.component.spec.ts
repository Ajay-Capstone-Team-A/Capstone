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
    spyAuth = jasmine.createSpyObj(["putUser"]);
    component = new ProfileComponent(spyCurrentUser, spyAuth);
  });

  it('should call updateEmail', () => {
    var user = new User(1, "First", "Last", "email@no.com", "password");
    let newemail = "newemail@no.com";
    spyAuth.putUser.and.returnValue(defer(()=>Promise.resolve({user, newemail})));
    component.updateEmail();
    expect(component.currentuser.userEmail==newemail);
  });

  it('should call updateEmail, error', () => {
    var user = new User(1, "First", "Last", "email@no.com", "password");
    let newemail = "email@no.com";
    spyAuth.putUser.and.returnValue(throwError({status:404}));
    component.updateEmail();
    expect!(component.currentuser.userEmail==newemail);
  });

})

