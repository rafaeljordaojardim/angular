import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';
import { AutoLogin } from './auth/store/auth.actions';
import { LoggingService } from './logging.service';
import { AppState } from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'recipe-project';
  constructor(
    private authService: AuthService, 
    private loggingService: LoggingService,
    private store: Store<AppState>) {}
  ngOnInit(): void {
    // this.authService.autoLogin();
    this.store.dispatch(new AutoLogin());
    this.loggingService.printLog('Hello from AppComponent onInit')
  }


}
