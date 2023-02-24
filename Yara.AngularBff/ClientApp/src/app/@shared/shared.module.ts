import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { LoaderComponent } from './components/loader/loader.component';
import { CoreModule } from '@app/@core';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faSignIn,
  faSignOut,
  faCog,
  faBars,
  faRocket,
  faPowerOff,
  faUserCircle,
  faPlayCircle,
  faPlus,
  faEdit,
  faTrash,
  faTimes,
  faCaretUp,
  faCaretDown,
  faExclamationTriangle,
  faFilter,
  faTasks,
  faCheck,
  faSquare,
  faLanguage,
  faPaintBrush,
  faLightbulb,
  faWindowMaximize,
  faStream,
  faBook,
} from '@fortawesome/free-solid-svg-icons';

import { FormsModule } from '@angular/forms';
import { ObserveElementDirective } from './directives/observe-element.directive';

@NgModule({
  imports: [CommonModule, MaterialModule, FormsModule],
  declarations: [LoaderComponent, ObserveElementDirective],
  exports: [
    LoaderComponent,
    ObserveElementDirective,
    MaterialModule,
    FontAwesomeModule,
    FormsModule,
  ],
})
export class SharedModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
    faIconLibrary: FaIconLibrary
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
    faIconLibrary.addIcons(
      faSignIn,
      faSignOut,
      faCog,
      faBars,
      faRocket,
      faPowerOff,
      faUserCircle,
      faPlayCircle,
      faPlus,
      faEdit,
      faTrash,
      faTimes,
      faCaretUp,
      faCaretDown,
      faExclamationTriangle,
      faFilter,
      faTasks,
      faCheck,
      faSquare,
      faLanguage,
      faPaintBrush,
      faLightbulb,
      faWindowMaximize,
      faStream,
      faBook
    );
  }
}
