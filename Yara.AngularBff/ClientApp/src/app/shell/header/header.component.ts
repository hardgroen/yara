import { Title } from '@angular/platform-browser';
import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthApiService } from '@app/@core/auth/auth-api.service';
import { Logger } from '@app/@core/logging/logger.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() sidenav!: MatSidenav;
  @Input() logoutUrl: string | null | undefined = undefined;
  @Input() isAuthenticated: boolean | null = false;
  @Input() userName: string | null | undefined = undefined;

  private _logger = new Logger('[Header]');

  constructor(private _titleService: Title) {}

  get title(): string {
    return this._titleService.getTitle();
  }
}
