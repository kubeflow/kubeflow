import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-form-image',
  templateUrl: './form-image.component.html',
  styleUrls: ['./form-image.component.scss'],
})
export class FormImageComponent implements OnInit, OnDestroy {
  @Input() parentForm: FormGroup;
  @Input() images: string[];
  @Input() jupyterReadonly: boolean;
  @Input() imagesVSCode: string[];
  @Input() vscodeReadonly: boolean;
  @Input() imagesRStudio: string[];
  @Input() rstudioReadonly: boolean;

  subs = new Subscription();

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('jupyterlab', sanitizer.bypassSecurityTrustResourceUrl('static/assets/jupyterlab-wordmark.svg'));
    iconRegistry.addSvgIcon('vs-code', sanitizer.bypassSecurityTrustResourceUrl('static/assets/visual-studio-code.svg'));
    iconRegistry.addSvgIcon('rstudio', sanitizer.bypassSecurityTrustResourceUrl('static/assets/rstudio.svg'));
  }

  ngOnInit() {
    this.subs.add(
      this.parentForm.get('customImageCheck').valueChanges.subscribe(check => {
        // Make sure that the use will insert and Image value
        if (check) {
          this.parentForm.get('customImage').setValidators(Validators.required);
          this.parentForm.get('image').setValidators([]);
          this.parentForm.get('imageVSCode').setValidators([]);
          this.parentForm.get('imageRStudio').setValidators([]);
        }
        this.parentForm.get('serverType').valueChanges.subscribe(selection => {
          if (selection === "jupyter") {
            this.parentForm.get('customImage').setValidators([]);
            this.parentForm.get('image').setValidators(Validators.required);
            this.parentForm.get('imageVSCode').setValidators([]);
            this.parentForm.get('imageRStudio').setValidators([]);
          } else if (selection === "vs-code") {
            this.parentForm.get('customImage').setValidators([]);
            this.parentForm.get('image').setValidators([]);
            this.parentForm.get('imageVSCode').setValidators(Validators.required);
            this.parentForm.get('imageRStudio').setValidators([]);
          } else if (selection === "rstudio") {
            this.parentForm.get('customImage').setValidators([]);
            this.parentForm.get('image').setValidators([]);
            this.parentForm.get('imageVSCode').setValidators([]);
            this.parentForm.get('imageRStudio').setValidators(Validators.required);
          }
          this.parentForm.get('image').updateValueAndValidity();
          this.parentForm.get('imageVSCode').updateValueAndValidity();
          this.parentForm.get('imageRStudio').updateValueAndValidity();
          
        })
        this.parentForm.get('customImage').updateValueAndValidity();
        this.parentForm.get('serverType').updateValueAndValidity();
        this.parentForm.get('httpRewriteURI').updateValueAndValidity();
        this.parentForm.get('httpHeadersRequestSet').updateValueAndValidity();
      }),
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
