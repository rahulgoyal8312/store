import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
articles: any;
isOpen = false;

pagination: { current: number, last:number, next: string, prev:string };
modArticle: any;

  constructor(private http:HttpClient,
    private authService: AuthService,
    private modal: NgbModal) { }

  ngOnInit() {
    this.fetchArticle('http://localhost:8000/api/articles');
    this.pagination = {
      current: 0,
      last: 0,
      next: '',
      prev: ''
    };

  }

  // open(){
  //   this.isOpen = true;
  // }

  fetchArticle(url){
    this.http.get(url).pipe(
      map(
        res=>{
          this.articles = res['data'];
          this.makePagination(res['meta'],res['links']);
          console.log(res);
        }
      ),
      catchError(
        (error)=>{
          console.log(error);
          throw('Unexpected error');
        }
      )
    ).subscribe();
  }

  makePagination(meta,links){
    this.pagination = {
      current: meta['current_page'],
      last: meta['last_page'],
      next: links['next'],
      prev: links['prev']
    };
  }

}
