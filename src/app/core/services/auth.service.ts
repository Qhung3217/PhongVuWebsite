import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError, tap, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credential } from '../models/credential.model';
interface AuthResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}
interface ErrorResponse {
  statusCode: string;
  error: string;
  message: string;
  errors;
  path: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  auth = new BehaviorSubject<Credential>(null);
  private refreshTokenTimer;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  register(payload: {
    email: string;
    password: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    dob?: string;
    gender?: string;
  }) {
    return this.http
      .post<{ message: string }>(environment.urlApi + '/auth/register', {
        payload,
      })
      .pipe(catchError(this.handleCatchError));
  }

  login(username: string, password: string) {
    return this.http
      .post<AuthResponse>(environment.urlApi + '/auth/login', {
        username,
        password,
      })
      .pipe(
        catchError(this.handleCatchError),
        tap((authRes) =>
          this.handleAuthentication(
            authRes.data.accessToken,
            authRes.data.refreshToken
          )
        )
      );
  }
  refreshToken(refreshToken: string) {
    return this.http
      .post<AuthResponse>(environment.urlApi + '/auth/refresh-token', {
        refreshToken,
      })
      .pipe(
        catchError(this.handleCatchError),
        tap((authRes) =>
          this.handleAuthentication(
            authRes.data.accessToken,
            authRes.data.refreshToken
          )
        )
      );
  }
  autoLogin() {
    const auth: {
      _token: string;
      _refreshToken: string;
      expiresIn: string;
    } = JSON.parse(localStorage.getItem('credential'));
    if (!auth) return;

    const loadedAuth = new Credential(
      auth._token,
      auth._refreshToken,
      new Date(auth.expiresIn)
    );
    if (loadedAuth.token) {
      this.auth.next(loadedAuth);
      const expirationDuration =
        new Date(auth.expiresIn).getTime() - new Date().getTime();
      this.autoRefresh(expirationDuration, auth._refreshToken);
    }
  }

  logout() {
    this.auth.next(null);
    this.router.navigate(['/authenticate']);
    localStorage.removeItem('credential');
    if (this.refreshTokenTimer) clearTimeout(this.refreshTokenTimer);
    this.refreshTokenTimer = null;
  }
  autoRefresh(expirationDuration: number, refreshToken) {
    this.refreshTokenTimer = setTimeout(() => {
      this.refreshToken(refreshToken).subscribe();
    }, expirationDuration);
  }
  private handleAuthentication(token: string, refreshToken: string) {
    const expireDurationSeconds = 3600;
    const expirationDate = new Date(
      new Date().getTime() + expireDurationSeconds * 1000
    );
    const credential = new Credential(token, refreshToken, expirationDate);
    this.auth.next(credential);
    this.autoRefresh(expireDurationSeconds * 1000, refreshToken);
    localStorage.setItem('credential', JSON.stringify(credential));
    this.redirect();
  }
  private redirect() {
    let nextUrl = null;
    this.route.queryParamMap.subscribe(
      (params) => (nextUrl = params.get('redirectUrl'))
    );

    if (nextUrl) this.router.navigate([nextUrl]);
    else this.router.navigate(['/']);
  }
  private handleCatchError(errRes: ErrorResponse) {
    let errorMessage = 'An unknow error occured!';
    switch (errRes.error) {
      case 'JsonWebTokenError':
        errorMessage = errRes.message + ': ' + errRes.path;
        break;
      case 'UnauthorizedException':
        errorMessage = 'Email or password is incorrect';
        break;
      case 'UnprocessableEntityException':
        errorMessage = '';
        errRes.errors.forEach((err, index) => {
          errorMessage += err.message;
          if (index < errRes.errors.length - 1) errorMessage += ';';
        });
        break;
      case 'Error':
        errorMessage = errRes.message;
        break;
    }
    return throwError(() => errorMessage);
  }
}
