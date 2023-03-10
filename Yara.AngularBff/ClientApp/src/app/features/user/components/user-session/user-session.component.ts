import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AuthModel, Claim } from '@app/@core/auth/auth.model';

@Component({
  selector: 'app-user-session',
  templateUrl: './user-session.component.html',
  styleUrls: ['./user-session.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSessionComponent {
  @Input() claims: Claim[] | null = [];
}
