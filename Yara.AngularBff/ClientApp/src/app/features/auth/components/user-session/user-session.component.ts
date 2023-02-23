import { Component } from '@angular/core';

import {
  AuthenticationService,
  Session
} from '../../services/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-session',
  templateUrl: './user-session.component.html',
  styleUrls: ['./user-session.component.scss']
})
export class UserSessionComponent {
  public session$: Observable<Session>;
  public isAuthenticated$: Observable<boolean>;
  public isAnonymous$: Observable<boolean>;

  constructor(private _auth: AuthenticationService) {
    this.session$ = _auth.getSession();
    this.isAuthenticated$ = _auth.getIsAuthenticated();
    this.isAnonymous$ = _auth.getIsAnonymous();
  }
}
