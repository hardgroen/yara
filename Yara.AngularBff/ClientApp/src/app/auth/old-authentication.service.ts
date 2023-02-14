import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

import { Credentials, CredentialsService } from './credentials.service';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

const routes = {
  login: () => `/bff/login`,
};

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class OldAuthenticationService {
  constructor(private credentialsService: CredentialsService, private httpClient: HttpClient) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  // login(context: LoginContext): Observable<Credentials> {
  //   // Replace by proper authentication call
  //   const data = {
  //     username: context.username,
  //     token: '123456',
  //   };
  //   this.credentialsService.setCredentials(data, context.remember);
  //   return of(data);
  // }

  login(context: LoginContext): Observable<any> {
    const data = {
      username: context.username,
      token: '123456',
    };
    this.credentialsService.setCredentials(data, context.remember);
    return this.httpClient.get<any>(routes.login()).pipe(
      tap((result) => console.log),
      catchError(() => of({}))
    );
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }
}
