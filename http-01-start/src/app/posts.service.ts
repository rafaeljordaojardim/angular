import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {

  error = new Subject<string>(); // we can osubscribe in all places taht we want
  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title, content };
    return this.http.post('https://ng-complete-guide-38e33.firebaseio.com/posts.json', postData, 
      {
        observe: 'response',
        responseType: 'json'
      });
  }

  fetchPosts() {
    return this.http.get('https://ng-complete-guide-38e33.firebaseio.com/posts.json', {
      headers: new HttpHeaders({ }),
      params: new HttpParams().set('print', 'pretty')
    })
    .pipe(
      map((responseData: {[key: string]: Post }): Post[] => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key });
          }
        }
        return postsArray;
      }),
      catchError(errorRes => {
        // send to analytics server
        return throwError(errorRes);
      })
    );
  }

  clearPosts() {
    return this.http.
      delete('https://ng-complete-guide-38e33.firebaseio.com/posts.json', {
        observe: 'events'
      })
        .pipe(
          tap(event => {
            console.log(event);
            if (event.type === HttpEventType.Response) {
              
            }
          })
        );

  }
}
