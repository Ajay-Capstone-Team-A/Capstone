import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ReviewService } from './review.service';

describe('ReviewService', () => {
  let spy: jasmine.SpyObj<HttpClient>;
  let component: ReviewService;
    
  
  beforeEach(async () => {
    component = new ReviewService(spy);
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
describe('ReviewService methods', () => {
  let spy: jasmine.SpyObj<HttpClient>;
  let component: ReviewService;
    
  
  beforeEach(async () => {
    spy = jasmine.createSpyObj(["post"]);
    component = new ReviewService(spy);
  });
  
  it('should call postReview', () => {
    component.postReview(1,1,"",1);
    expect(component.postReview).toHaveBeenCalled;
  });
});