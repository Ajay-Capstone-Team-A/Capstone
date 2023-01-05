import { TestBed } from '@angular/core/testing';
import { User } from '../models/user';

import { CurrentuserService } from './currentuser.service';

describe('CurrentuserService', () => {
  let service: CurrentuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('CurrentuserService methods', () => {
  
  let component: CurrentuserService;
    
  
  beforeEach(async () => {
    component = new CurrentuserService();
  });
  
  it('should set and get user', () => {
    let u = new User(0,"b","b","b","b");
    component.setUser(u);
    expect(component.getUser() == u);

  });

});
