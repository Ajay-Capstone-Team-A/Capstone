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

  newemail: string = "";
  currpw: string = "";
  newpw: string = "";
  newpwconf: string = "";

  Service: CurrentuserService = new CurrentuserService;
  currentuser!: User;

  constructor(private userService: CurrentuserService, private authService: AuthService) {
    // this.Service = userService;
    // this.currentuser = this.Service.getUser();
  }

  ngOnInit(): void {
    this.Service = this.userService;
    this.currentuser = this.Service.getUser();
  }

  updateEmail(){
    // Update the current user
    this.currentuser.userEmail = this.newemail;
    this.authService.putUser(this.currentuser).subscribe(
      result => {console.log(`Result ${result}`)},
      err => (console.log(`Error: ${err}`))
    );
    alert("Email has been updated!");
  }

  updatePassword(){
    // ! If the user wants to change anything, they better be remembering their password
    if (this.currpw != this.currentuser.userPassword) {
      alert("The password that you entered was incorrect. Please try again");
      return;
    }
    
    // ! They got their own password right, so let's check if they're updating it
    if (this.newpw){
      if (this.newpw != this.newpwconf)
      {
        alert("Your new password and confirmation do not match. Please try again");
        return;
      }
      this.currentuser.userPassword = this.newpw;
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
