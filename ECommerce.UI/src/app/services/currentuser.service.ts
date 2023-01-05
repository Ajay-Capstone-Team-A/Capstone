import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CurrentuserService {

  private currentuser = new User(0, "", "", "", "");

  constructor() { }

  setUser(currentuser: User){
    this.currentuser = currentuser;
  }
  getUser(): User{
    return this.currentuser;
  }
}


