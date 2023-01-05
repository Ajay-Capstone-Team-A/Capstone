import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new UntypedFormGroup({
    fname: new UntypedFormControl('', [Validators.pattern('^[a-zA-Z ]*$')]),
    lname: new UntypedFormControl('', [Validators.pattern('^[a-zA-Z ]*$')]),
    email: new UntypedFormControl('', [Validators.email, Validators.required]),
    password: new UntypedFormControl('', [Validators.required])
  })
  

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  emailTaken = false;


  ngOnInit(): void {
  }
  
  onSubmit(): void {
    this.checkEmail();

    setTimeout(() => {
      if (this.emailTaken == false && !this.registerForm.invalid) {
        console.log("Registration service starting");
        this.authService.register(this.registerForm.get('fname')?.value,
          this.registerForm.get('lname')?.value,
          this.registerForm.get('email')?.value,
          this.registerForm.get('password')?.value).subscribe(
            () => {
              console.log("New user registered")
              this.router.navigate(['login'])
            }
            ,
            (err) => console.log(err),
            //() => this.router.navigate(['login'])
          );
      }
    }
    , 2000);


    /*
    //check if there are form errors before we make user
    if (this.registerForm.invalid == true) {
      console.log("seomthing wrong")
    }
    else {
      this.authService.register(this.registerForm.get('fname')?.value,
        this.registerForm.get('lname')?.value,
        this.registerForm.get('email')?.value,
        this.registerForm.get('password')?.value).subscribe(
          () => {
            console.log("New user registered")
            this.router.navigate(['login'])
          }
          ,
          (err) => console.log(err),
          //() => this.router.navigate(['login'])
        );
    }
    */
  }


  public  checkEmail() {
    this.userService.checkEmail(this.registerForm.get('email')?.value).subscribe(
      (data) => {
        console.log("Is email taken? " + data)
        this.emailTaken = data;
      },
      (err) => { console.log(err) })
  }



  

  get fname() {
    return this.registerForm.get('fname');
  }

  get lname() {
    return this.registerForm.get('lname');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }
}
