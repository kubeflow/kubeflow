import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SvgIconsService {
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
  ) {}

  init() {
    this.iconRegistry.addSvgIcon(
      'namespace',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/namespace.svg',
      ),
    );
  }
}
