import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError, tap, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credential } from '../models/credential.model';
import { UserService } from './user.service';
interface AuthResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  auth = new BehaviorSubject<Credential>(null);
  private refreshTokenTimer;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
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
        ...payload,
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
            authRes.data.refreshToken,
            false
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
    console.log('load: ', loadedAuth.token);
    if (loadedAuth.token) {
      this.auth.next(loadedAuth);
      const expirationDuration =
        new Date(auth.expiresIn).getTime() - new Date().getTime();
      this.autoRefresh(expirationDuration, auth._refreshToken);
      this.userService.fetchOwnProfile().subscribe();
    }
  }

  logout() {
    this.router.navigate(['/']);
    this.auth.next(null);
    localStorage.removeItem('credential');
    this.userService.clearUser();
    if (this.refreshTokenTimer) clearTimeout(this.refreshTokenTimer);
    this.refreshTokenTimer = null;
  }
  autoRefresh(expirationDuration: number, refreshToken) {
    this.refreshTokenTimer = setTimeout(() => {
      this.refreshToken(refreshToken).subscribe();
    }, expirationDuration);
  }
  private handleAuthentication(
    token: string,
    refreshToken: string,
    isRedirect = true
  ) {
    const expireDurationSeconds = 3600;
    const expirationDate = new Date(
      new Date().getTime() + expireDurationSeconds * 1000
    );
    const credential = new Credential(token, refreshToken, expirationDate);
    this.auth.next(credential);
    this.autoRefresh(expireDurationSeconds * 1000, refreshToken);
    localStorage.setItem('credential', JSON.stringify(credential));
    if (isRedirect) this.redirect();
    this.userService.fetchOwnProfile().subscribe();
  }
  private redirect() {
    let nextUrl = null;
    this.route.queryParamMap.subscribe(
      (params) => (nextUrl = params.get('redirectUrl'))
    );

    if (nextUrl) this.router.navigate([nextUrl]);
    else this.router.navigate(['/account/me']);
  }
  private handleCatchError(errRes: HttpErrorResponse) {
    console.log(errRes);
    let errorMessage = 'An unknow error occured!';
    if (!errRes.error && !errRes.error.error)
      return throwError(() => errorMessage);
    switch (errRes.error.error) {
      case 'JsonWebTokenError':
        errorMessage = errRes.error.message + ': ' + errRes.error.path;
        break;
      case 'UnauthorizedException':
        errorMessage = 'Email or password is incorrect';
        break;
      case 'UnprocessableEntityException':
        errorMessage = '';
        errRes.error.errors.forEach((err, index) => {
          errorMessage += err.message;
          if (index < errRes.error.errors.length - 1) errorMessage += ';';
        });
        break;
      case 'Error':
        errorMessage = errRes.error.message;
        break;
    }
    return throwError(() => errorMessage);
  }
}
