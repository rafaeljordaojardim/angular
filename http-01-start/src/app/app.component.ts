import { Component, OnInit } from '@angular/core';

import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;


  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.fecthPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
   this.postsService.createAndStorePost(postData.title, postData.content)
    .subscribe(() => {
      this.fecthPosts();
    });
  }

  onFetchPosts() {
   this.fecthPosts();
  }

  onClearPosts() {
    this.postsService
      .clearPosts()
      .subscribe(() => {
        this.loadedPosts = [];
        this.fecthPosts();
      }, (error) => {
        this.error = error.message;
      });
  }

  onHandleError() {
    this.isFetching = false;
    this.error = null;
  }

  private fecthPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    });
  }
}
