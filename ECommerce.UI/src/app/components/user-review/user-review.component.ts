import { Component,Input, OnChanges, OnInit,SimpleChanges } from '@angular/core';
import { reviewDTO } from '../../models/reviewDTO';

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.css']
})
export class UserReviewComponent implements OnInit, OnChanges {
  @Input() 
  reviewInfo!: reviewDTO;


  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
    
    }
  
  ngOnInit(): void {
  }



}
