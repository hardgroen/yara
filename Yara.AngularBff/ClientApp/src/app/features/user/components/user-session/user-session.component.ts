import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Session } from '@core/auth/auth-api.service';

@Component({
  selector: 'app-user-session',
  templateUrl: './user-session.component.html',
  styleUrls: ['./user-session.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSessionComponent {
  @Input() session: Session | null = null;

  constructor() {
    console.log('session', this.session);
  }
}
