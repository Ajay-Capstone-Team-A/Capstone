import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReviewComponent } from './user-review.component';
import { Component,Input, OnChanges, OnInit,SimpleChanges } from '@angular/core';

describe('UserReviewComponent', () => {
  //let spyService: jasmine.SpyObj<>;
  //let spyRouter: jasmine.SpyObj<>;
  let component: UserReviewComponent;
    
  
  beforeEach(async () => {
    component = new UserReviewComponent();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should call ngOnInit",()=>{
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled;
  });
});
