import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthLogGuard implements CanActivate {

  constructor(private authService:AuthService,
  	private router:Router) { }

  canActivate(route, state:RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  	if(!this.authService.isLoggedIn()) return true;

  	this.router.navigate(['/']);
  	return false;
  }
}
