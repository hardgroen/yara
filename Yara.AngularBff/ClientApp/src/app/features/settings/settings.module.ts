import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { ThemeSelectorComponent } from './components/theme-selector/theme-selector.component';
import { SettingsContainerComponent } from './components/settings-container.component';
import { SharedModule } from '@app/@shared';
import { CoreModule } from '@app/@core';

@NgModule({
  declarations: [ThemeSelectorComponent, SettingsContainerComponent],
  imports: [CommonModule, SettingsRoutingModule, SharedModule, CoreModule],
})
export class SettingsModule {}
