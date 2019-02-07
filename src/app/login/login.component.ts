import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 errors: any;
 isLoading= false;

  constructor(private authService: AuthService,
    private router:Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // this.authService.isLoggedIn();
    // this.route.queryParams
    //   .subscribe(params => {return(params['returnUrl'] || 'hom') });
  }

  login(form: NgForm){
  	const email = form.value.email;
  	const password = form.value.password;
  	this.authService.signIn(email,password);
  	form.reset();
  }

  onLogin(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.authService.onSignIn(email,password).subscribe(
      res=>{
        if(res){
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/'])
        }
      },
      error=>{
        // this.errors = error.error;
        if(error.status === 401){
          this.errors = "Either Email and/or Password is incorrect";
        }
        else if(error.status === 422){
          this.errors = "The data provided is Invalid, please try again";
        }
        else{
          this.errors = "Some Unknown Error";
        }
        console.log(error)
      }
  );
    this.isLoading = true;
    form.reset();
  }

}
