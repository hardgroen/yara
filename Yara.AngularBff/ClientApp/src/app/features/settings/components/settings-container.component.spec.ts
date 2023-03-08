import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { actionSettingsChangeTheme } from '@app/@core/settings/settings.actions';
import { selectSettings } from '@app/@core/settings/settings.selectors';
import { SettingsState } from '@app/@core/settings/settings.state';
import { SharedModule } from '@app/@shared';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { SettingsContainerComponent } from './settings-container.component';
import { ThemeSelectorComponent } from './theme-selector/theme-selector.component';

describe('SettingsContainerComponent', () => {
  let component: SettingsContainerComponent;
  let fixture: ComponentFixture<SettingsContainerComponent>;
  let store: MockStore;
  let mockSelectSettings: MemoizedSelector<{}, SettingsState>;
  let dispatchSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, NoopAnimationsModule],
      declarations: [SettingsContainerComponent, ThemeSelectorComponent],
      providers: [provideMockStore()],
    });

    store = TestBed.inject(MockStore);
    mockSelectSettings = store.overrideSelector(
      selectSettings,
      {} as SettingsState
    );
    fixture = TestBed.createComponent(SettingsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch change theme action on theme selection', () => {
    dispatchSpy = spyOn(store, 'dispatch');
    component.onThemeSelect('[themename]');
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(
      actionSettingsChangeTheme({ theme: '[themename]' })
    );
  });
});
