import { Component, Input } from '@angular/core';
import { Session } from '../../services/authentication.service';

@Component({
  selector: 'app-user-session',
  templateUrl: './user-session.component.html',
  styleUrls: ['./user-session.component.scss'],
})
export class UserSessionComponent {
  @Input() session: Session | null = null;
  // @Input() isAuthenticated: boolean | null = false;
  // @Input() isAnonymous = true;
}
