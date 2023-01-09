import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from '../models/review';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private url = 'api/Review';
  constructor(private http: HttpClient) { }

  postReview(userId: number, productId: number, comment: string, rating: number) {
    const payload = { UserId: userId, ProductId: productId, Comment: comment, Rating: rating };
    return this.http.post<any>(environment.baseUrl + "/" + `${this.url}`, payload);
  }

}
