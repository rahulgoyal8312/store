import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthLogGuard } from './auth/auth-log.service';

const routes: Routes = [
{ 
	path: 'login', 
	component: LoginComponent, 
	canActivate: [AuthLogGuard] 
},
{
	path: 'register', 
	component: SignupComponent, 
	canActivate: [AuthLogGuard] 
},
{ 
	path: '', 
	redirectTo: '/home', 
	pathMatch: 'full' 
},
{ 
	path: 'home', 
	component: HomeComponent, 
	canActivate: [AuthGuard], 
	canActivateChild: [AuthGuard],
	children: [
	  {
	  	path: ':article-id', component: HomeComponent
	  }
  	]	
},
{
	path: '**',
	redirectTo: 'login',
	pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
