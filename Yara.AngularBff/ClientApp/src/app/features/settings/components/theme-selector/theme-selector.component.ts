import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSelectorComponent {
  @Input() currentTheme = '';
  @Output() themeSelected = new EventEmitter<string>();

  public themes = [
    { value: 'LIGHT-THEME', label: 'light' },
    { value: 'DARK-THEME', label: 'dark' },
  ];

  public onThemeSelect(event: MatSelectChange) {
    this.themeSelected.emit(event.value);
  }
}
