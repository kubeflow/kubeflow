import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { environment } from '@app/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { ServerType } from 'src/app/types';

@Component({
  selector: 'app-form-image',
  templateUrl: './form-image.component.html',
  styleUrls: ['./form-image.component.scss'],
})
export class FormImageComponent implements OnInit, OnDestroy {
  @Input() parentForm: FormGroup;
  @Input() imagesJupyter: string[];
  @Input() imagesVSCode: string[];
  @Input() imagesRStudio: string[];
  @Input() allowCustomImage: boolean;

  subs = new Subscription();
  imagesInputLabel = 'Image (Jupyter)';

  ngOnInit() {
    // update the input's label based on the Server type
    this.subs.add(
      this.parentForm.get('image').valueChanges.subscribe((image: string) => {
        if (this.imagesJupyter && this.imagesJupyter.includes(image)) {
          this.imagesInputLabel = 'Image (Jupyter)';
          this.parentForm.get('serverType').setValue('jupyter');
        }

        if (this.imagesRStudio && this.imagesRStudio.includes(image)) {
          this.imagesInputLabel = 'Image (RStudio)';
          this.parentForm.get('serverType').setValue('rstudio');
        }

        if (this.imagesVSCode && this.imagesVSCode.includes(image)) {
          this.imagesInputLabel = 'Image (VSCode)';
          this.parentForm.get('serverType').setValue('vscode');
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
