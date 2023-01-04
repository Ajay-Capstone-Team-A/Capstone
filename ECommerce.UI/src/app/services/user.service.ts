import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl: string = "/api/user";

  constructor(private http: HttpClient) { }

  public checkEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(environment.baseUrl + this.userUrl + "/findEmail/" + email);
  }

  public checkPassword(password: string): Observable<boolean> {
    return this.http.get<boolean>(environment.baseUrl + this.userUrl + "/findPassword/" + password);
  }
}
