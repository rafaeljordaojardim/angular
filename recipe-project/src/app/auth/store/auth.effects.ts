import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthResponseData, AuthService } from '../auth.service';
import { User } from '../user.model';
import { AUTO_LOGIN, LOGIN, Login, LoginFail, LoginStart, LOGIN_START, LOGOUT, SignupStart, SIGNUP_START } from './auth.actions';

const handleAuthentication = (expiresIn: number, email: string, userId: string, token: string) => {
  const  expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new Login({
    email,
    userId,
    token,
    expirationDate,
    redirect: true
  });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An unkown error occurred';
  if (!errorRes.error || !errorRes.error.error) {
   return of(new LoginFail(errorMessage));
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
  return of(new LoginFail(errorMessage));
};

@Injectable()
export class AuthEffects {

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(SIGNUP_START),
    switchMap((signupAction: SignupStart) => {
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApiKey,
        {
          email: signupAction.payload.email,
          password: signupAction.payload.password,
          returnSecureToken: true
        }).pipe(
          tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map(resData => {
            return handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.localId,
              resData.idToken
            );
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
        );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(LOGIN_START),
    switchMap((authData: LoginStart) => {
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }).pipe(
          tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map(resData => {
            return handleAuthentication(
              +resData.expiresIn,
              resData.email,
              resData.localId,
              resData.idToken
            );
          }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
        );
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AUTO_LOGIN),
    map(() => {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return {type: 'DUMMY'};
      }
      const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
      if (loadedUser.token) {
        // this.user.next(loadedUser);
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);
        return new Login({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate),
          redirect: false
        });
        // const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        // this.autoLogout(expirationDuration);
      }
      return {type: 'DUMMY'};
    })
  )
  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(ofType(LOGIN), tap(
    (authSuccessAction: Login) => {
      if (authSuccessAction.payload.redirect) {
        this.router.navigate(['/']);
      }
    }
  ));

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
      this.authService.clearLogoutTimer();
      this.router.navigate(['/auth']);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
