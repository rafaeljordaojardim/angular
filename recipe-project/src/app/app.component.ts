import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
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
    private loggingService: LoggingService,
    private store: Store<AppState>,
    @Inject(PLATFORM_ID) private plataformId
    ) {}
  ngOnInit(): void {
    // this.authService.autoLogin();
    if (isPlatformBrowser(this.plataformId)) {
      this.store.dispatch(new AutoLogin());
    }
    this.loggingService.printLog('Hello from AppComponent onInit')
  }


}
