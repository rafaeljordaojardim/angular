import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';
// import { Router } from '@angular/router';
// import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { Login, Logout } from './store/auth.actions';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root'})
export class AuthService {

  // user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(
    private store: Store<AppState>
  ) {}
  // signup(email: string, password: string) {
  //   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApiKey,
  //   {
  //     email,
  //     password,
  //     returnSecureToken: true
  //   }).pipe(
  //     catchError(this.handleError),
  //     tap(resData => {
  //       this.handleAuthentication(
  //         resData.email,
  //         resData.localId,
  //         resData.idToken,
  //         +resData.expiresIn,
  //       );
  //     })
  //   )

  // }

  // login(email: string, password: string) {
  //   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey,
  //   {
  //     email,
  //     password,
  //     returnSecureToken: true
  //   }).pipe(
  //     catchError(this.handleError),
  //     tap(resData => {
  //       this.handleAuthentication(
  //         resData.email,
  //         resData.localId,
  //         resData.idToken,
  //         +resData.expiresIn,
  //       );
  //     })
  //   )
  // }

  logout() {
    // this.user.next(null);
    this.store.dispatch(new Logout());
    // this.router.navigate(['/auth']); removed because about ngrx
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      // this.logout();
      this.store.dispatch(new Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      // this.user.next(loadedUser);
      this.store.dispatch(new Login({
        email: loadedUser.email,
        userId: loadedUser.id,
        token: loadedUser.token,
        expirationDate: new Date(userData._tokenExpirationDate),
        redirect: true
      }));
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.setLogoutTimer(expirationDuration);
    }
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const  expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    // this.user.next(user);
    this.store.dispatch(new Login({
      email,
      userId,
      token,
      expirationDate,
      redirect: true
    }));
    this.setLogoutTimer(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unkown error occurred';
    if (!errorRes.error || !errorRes.error.error) {
     return throwError(errorMessage)
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exists';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;
    }
    return throwError(errorMessage);
  }
}
