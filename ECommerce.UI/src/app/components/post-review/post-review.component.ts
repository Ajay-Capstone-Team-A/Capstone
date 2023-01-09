import { Component, Input, OnInit ,Output,EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from '../../services/review.service';
import { CurrentuserService } from '../../services/currentuser.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-post-review',
  templateUrl: './post-review.component.html',
  styleUrls: ['./post-review.component.css']
})
export class PostReviewComponent implements OnInit {

  @Input()
    productId!: number;

  @Output()
  addReviewEvent = new EventEmitter<string>();

  currentUserId!: number;

  postReviewForm = new FormGroup({
    comment: new FormControl(''),
    rating: new FormControl('', [Validators.required])
  })

  
  constructor(private reviewService: ReviewService, private CurrentUserService: CurrentuserService) { }

  

  ngOnInit(): void {
  }

  onSubmit() {
    this.currentUserId = this.CurrentUserService.getUser().userId;
    console.log(this.postReviewForm);
    console.log(this.postReviewForm.value.comment);
    console.log(this.postReviewForm.value.rating);
    
    this.reviewService.postReview(this.currentUserId, this.productId, this.postReviewForm.value.comment!, Number(this.postReviewForm.value.rating!)).subscribe(
      () => {
        console.log("Review Posted")
        this.addReviewEvent.emit('A review was made on this product');
      },
      (err) => {
        console.log(err)
      }    ); 
  }

  ratingCheck(input:number) {
    if (input <= 0 && input > 6)
      return false;
    return true;
  }
  get comment() {
    return this.postReviewForm.get('comment');
  }

  get rating() {
    return this.postReviewForm.get('rating');
  }

}
