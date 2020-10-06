import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';

import { MatIconModule } from '@angular/material/icon';

import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import {
  faCogs,
  faHdd,
  faBook,
  faMicrochip,
  faLaptopCode,
  faLink,
  faSlidersH,
  faBullseye,
  faStopCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faDocker } from '@fortawesome/free-brands-svg-icons';

@NgModule({
  declarations: [IconComponent],
  imports: [CommonModule, MatIconModule, FontAwesomeModule],
  exports: [IconComponent],
})
export class IconModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faCogs,
      faHdd,
      faBook,
      faMicrochip,
      faLaptopCode,
      faDocker,
      faLink,
      faSlidersH,
      faBullseye,
      faStopCircle,
    );
  }
}
