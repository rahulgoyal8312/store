import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Store';

  ngOnInit(){
  	firebase.initializeApp({
  		apiKey: "AIzaSyDFFo0R-_qzfxxnKAJLYJXNqAWL2fMnvSs",
	    authDomain: "g-auth-8312.firebaseapp.com",
  	});
  }
}
