import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private url = 'api/Review';
  constructor(private http: HttpClient) { }
}
