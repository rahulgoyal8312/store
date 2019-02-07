import { Injectable } from '@angular/core';
import { CanActivate,CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService:AuthService,
  	private router:Router) { }

  canActivate(route, state:RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  	if(this.authService.isLoggedIn()) return true;

  	this.router.navigate(['login'],{ queryParams: { returnUrl: state.url }});
  	return false;
  }

  canActivateChild(route, state:RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  	return this.canActivate(route,state);
  }
}
