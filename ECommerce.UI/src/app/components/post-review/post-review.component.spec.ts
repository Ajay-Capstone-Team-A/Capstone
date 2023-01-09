import { ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from 'src/app/models/user';
import { CurrentuserService } from 'src/app/services/currentuser.service';
import { ReviewService } from 'src/app/services/review.service';

import { PostReviewComponent } from './post-review.component';

describe('PostReviewComponent', () => {
  let spyReview: jasmine.SpyObj<ReviewService>;
  let spyCurrent: jasmine.SpyObj<CurrentuserService>;
  let component: PostReviewComponent;
    
  
  beforeEach(async () => {
    component = new PostReviewComponent(spyReview,spyCurrent);
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('PostReviewComponent mehods', () => {
  let spyReview: jasmine.SpyObj<ReviewService>;
  let spyCurrent: jasmine.SpyObj<CurrentuserService>;
  let component: PostReviewComponent;
    
  
  beforeEach(async () => {
    let spyCurrent = jasmine.createSpyObj(['getUser']);
    component = new PostReviewComponent(spyReview,spyCurrent);
  });

  it('should call comment', () => {

    expect(component.comment).toHaveBeenCalled;
  });
  it('should call rating', () => {

    expect(component.rating).toHaveBeenCalled;
  });
  it('should call ngOnInit',()=>{
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled
  });
});
