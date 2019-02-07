import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService{
	token: string = localStorage.getItem('token');

	constructor(private router: Router, 
		private route: ActivatedRoute,
		private http:HttpClient) {}

	signUp(email:string,password:string){
		firebase.auth().createUserWithEmailAndPassword(email,password).catch(
		error=>{ 
			console.log(error)
			if(error['code']==='auth/invalid-email'){
				alert('Invalid Email');
			}
			else if(error['code']==='auth/weak-password'){
				alert('Weak Password');
			}
			else{
				console.log('Unknown Error');
			}
		  }
		);
	}

	signIn(email:string,password:string){
		firebase.auth().signInWithEmailAndPassword(email,password)
		.then(
			res => {
				// console.log(res)
				this.router.navigate(['home']);
			})
		.catch(
			error => {
				console.log(error)
			}
		);
	}

	onSignUp(em:string,pass:string){
		let obj= { email: em, password : pass };
		console.log(obj);
		return this.http.post('http://localhost:8000/api/register',obj)
		.pipe(
			map(
				res=>{
					return res;
				},
				catchError(
					error=>{
						console.log(error);
						throw('Some unknown Error');
					}
				)
			)
		);
	}

	onSignIn(em:string,pass:string){
		let obj= { email: em, password : pass };
		console.log(obj);
		return this.http.post('http://localhost:8000/api/login',obj)
		.pipe(
			map(
				res=>{
					// return res;
					let result = res;
					if(result && result['token']){
						localStorage.setItem('token',result['token']);
						this.token = localStorage.getItem('token');
						return true;
					}
					return false;
				},
				catchError(
					error=>{
						console.log(error);
						throw('Some unknown Error');
					}
				)
			)
		);
	}
	
	isLoggedIn(){

		// const helper = new JwtHelperService();

		// let token = localStorage.getItem('token');

		// if(!token){
		// 	return false;
		// }
		// const isExpired = helper.isTokenExpired(token);

		// if(!isExpired){
		// 	return true;
		// }
		// console.log(this.token);
		return this.token !=null;
	}

	get currentUser(){

		if(this.token){
		// console.log(new JwtHelperService().decodeToken(this.token));
			return new JwtHelperService().decodeToken(this.token);
		}
		return null;
	}

	logout(){
		// const helper = new JwtHelperService();

		// let token = localStorage.getItem('token');

		localStorage.removeItem('token');

		this.token =null;
		
		this.router.navigate(['/login']);
	}

}