import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  signUp(form: NgForm){
  	const email=form.value.email;
  	const password=form.value.password;
  	this.authService.signUp(email,password);
  	form.reset();
  }

  onSignUp(form: NgForm){
    const email=form.value.email;
    const password=form.value.password;
    this.authService.onSignUp(email,password).subscribe(
      res=>{
        console.log(res);
      },
      error=>{
        console.log(error);
      }
    );
  }

}
