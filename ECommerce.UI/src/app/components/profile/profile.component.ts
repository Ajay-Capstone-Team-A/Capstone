import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { CurrentuserService } from '../../services/currentuser.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  Service: CurrentuserService = new CurrentuserService;
  currentuser: User;

  constructor(private userService: CurrentuserService, private authService: AuthService) {
    this.Service = userService;
    this.currentuser = this.Service.getUser();
  }

  ngOnInit(): void {
  }

  updateEmail(){
    var newemail = (<HTMLInputElement>document.getElementById("user-new-email")).value;
    // Update the current user
    this.currentuser.userEmail = newemail;
    this.authService.putUser(this.currentuser).subscribe(
      result => {console.log(`Result ${result}`)},
      err => (console.log(`Error: ${err}`))
    );
    alert("Email has been updated!");
  }

  updatePassword(){
    var currpw = (<HTMLInputElement>document.getElementById("user-curr-pw")).value;
    var newpw = (<HTMLInputElement>document.getElementById("user-new-pw")).value;
    var newconfpw = (<HTMLInputElement>document.getElementById("user-conf-pw")).value;
    
    // ! If the user wants to change anything, they better be remembering their password
    if (currpw != this.currentuser.userPassword) {
      alert("The password that you entered was incorrect. Please try again");
      return;
    }
    
    // ! They got their own password right, so let's check if they're updating it
    if (newpw){
      if (newpw != newconfpw)
      {
        alert("Your new password and confirmation do not match. Please try again");
        return;
      }
      this.currentuser.userPassword = newpw;
    }

    this.Service.setUser(this.currentuser);
    
    //    So I just need to put now
    this.authService.putUser(this.currentuser).subscribe(
      result => {console.log(`Result ${result}`)},
      err => (console.log(`Error: ${err}`))
    );
    alert("Password has been updated!");
  }

}
