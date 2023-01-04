import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { faUserInjured } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  authUrl: string = `${environment.baseUrl}/auth`;
  loggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const payload = {email:email, password:password};
    return this.http.post<any>(`${this.authUrl}/login`, payload, {headers: environment.headers, withCredentials: environment.withCredentials});
  }

  logout(): void{
    this.http.post(`${this.authUrl}/logout`, null);
  }

  register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    const payload = {firstName: firstName, lastName: lastName, email: email, password: password};
    return this.http.post<any>(`${this.authUrl}/register`, payload, {headers: environment.headers});
  }

  getUser(userId: number): Observable<any>{
    return this.http.get<any>(`${this.authUrl}/profile/` + userId.toString());
  }

  patchUser(user: User): Observable<any>{
    return this.http.patch<any>(`${this.authUrl}/profileupdate/` + user.userId.toString(), user);
  }
  // emailExist(user: User):Observable<any>{
  //   return this.http.put<any>(`${this.authUrl}/profile/`, user.userId);
  // }
}
