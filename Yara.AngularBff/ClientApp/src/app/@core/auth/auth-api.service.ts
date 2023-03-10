import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, shareReplay } from 'rxjs';
import { AuthModel, Session } from './auth.model';

const ANONYMOUS: Session = null;
const CACHE_SIZE = 1;
const CLAIM_TYPE_LOGOUT_URL = 'bff:logout_url';
const CLAIM_TYPE_NAME = 'name';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private session$: Observable<Session> | null = null;

  constructor(private http: HttpClient) {}

  public getAuthModel(): Observable<AuthModel> {
    return this._getSession().pipe(
      map((session) => {
        if (session !== null) {
          const logoutUrl = session.find(
            (c) => c.type === CLAIM_TYPE_LOGOUT_URL
          )?.value;
          const userName = session.find(
            (c) => c.type === CLAIM_TYPE_NAME
          )?.value;
          return {
            isAuthenticated: true,
            logoutUrl: logoutUrl,
            userName: userName,
            claims: session,
          };
        } else {
          return {
            isAuthenticated: false,
            logoutUrl: undefined,
            userName: undefined,
            claims: [],
          };
        }
      })
    );
  }

  private _getSession(ignoreCache = false) {
    if (!this.session$ || ignoreCache) {
      console.log('wtf?');
      this.session$ = this.http.get<Session>('/bff/user').pipe(
        catchError((err) => {
          console.log('getsession error', err);
          return of(ANONYMOUS);
        }),
        shareReplay(CACHE_SIZE)
      );
    }
    return this.session$;
  }

  // public getIsAuthenticated(ignoreCache = false): Observable<boolean> {
  //   return this.getSession(ignoreCache).pipe(map(UserIsAuthenticated));
  // }

  // public getIsAnonymous(ignoreCache = false): Observable<boolean> {
  //   return this.getSession(ignoreCache).pipe(map(UserIsAnonymous));
  // }

  // public getUsername(ignoreCache = false): Observable<string | undefined> {
  //   return this.getSession(ignoreCache).pipe(
  //     filter(UserIsAuthenticated),
  //     map((s) => s.find((c) => c.type === 'name')?.value)
  //   );
  // }

  // public getLogoutUrl(ignoreCache = false): Observable<string | undefined> {
  //   return this.getSession(ignoreCache).pipe(
  //     filter(UserIsAuthenticated),
  //     map((s) => s.find((c) => c.type === 'bff:logout_url')?.value)
  //   );
  // }
}

// function UserIsAuthenticated(s: Session): s is Claim[] {
//   return s !== null;
// }

// function UserIsAnonymous(s: Session): s is null {
//   return s === null;
// }
