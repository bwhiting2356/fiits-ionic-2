// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

const auth0Config = {
  // needed for auth0
  clientID: 'TobrJNkQAdTNZuvUb7AS09hmunDE1fQJ',

  // needed for auth0cordova
  clientId: 'TobrJNkQAdTNZuvUb7AS09hmunDE1fQJ',
  domain: 'fiits.auth0.com',
  callbackURL: location.href,
  packageIdentifier: 'io.ionic.starter.auth0'
};

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'TobrJNkQAdTNZuvUb7AS09hmunDE1fQJ',
    domain: 'fiits.auth0.com',
    responseType: 'token id_token',
    audience: 'https://fiits.auth0.com/userinfo',
    redirectUri: 'http://localhost:8100',
    scope: 'openid'
  });

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        // this.router.navigate(['/home']);
      } else if (err) {
        // this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    // this.router.navigate(['/']);
  }

  constructor(
    // public router: Router
  ) {}

  public login(): void {
    this.auth0.authorize();
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

}
