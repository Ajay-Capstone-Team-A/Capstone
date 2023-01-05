import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { CurrentuserService } from '../../services/currentuser.service';
import { AuthService } from '../../services/auth.service';
import { noAuto } from '@fortawesome/fontawesome-svg-core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentuser!: User;

  constructor(private userService: CurrentuserService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.currentuser = this.userService.getUser();

  }


  updateEmail(currentemail: string, newemail: string){
    // Update the current user
    this.currentuser.userEmail = newemail;
    this.authService.patchUser(this.currentuser).subscribe(
      (response) => {
        alert("Email has been updated")
        this.userService.setUser(this.currentuser)
        return
      },
      (error: HttpErrorResponse) => {
        this.currentuser.userEmail = currentemail;
        alert("This email already exist. Please enter a different email")
        return
    });
  }

  updatePassword(currpw: any, newpw: any, newpwconf: any){
    // ! If the user wants to change anything, they better be remembering their password
    if (currpw != this.currentuser.userPassword) {
      alert("The password that you entered was incorrect. Please try again");
      return;
    }
    
    // ! They got their own password right, so let's check if they're updating it
    if (newpw){
      if (newpw != newpwconf)
      {
        alert("Your new password and confirmation do not match. Please try again");
        return;
      }
      this.currentuser.userPassword = newpw;
    }

    

    this.authService.patchUser(this.currentuser).subscribe(
      (response) => {
        alert("Password has been updated!")
        this.userService.setUser(this.currentuser)
        return
      },
      (error: HttpErrorResponse) => {
        alert(error)
        return
      });
    
  }

}
