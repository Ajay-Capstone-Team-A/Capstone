import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { UserService } from './user.service';

describe('UserService', () => {
  let spy: jasmine.SpyObj<HttpClient>
  let component: UserService;

  beforeEach(async ()=>{
    component = new UserService(spy);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
