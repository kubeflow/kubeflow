import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-image',
  templateUrl: './form-image.component.html',
  styleUrls: ['./form-image.component.scss'],
})
export class FormImageComponent implements OnInit, OnDestroy {
  @Input() parentForm: FormGroup;
  @Input() images: string[];
  @Input() readonly: boolean;

  subs = new Subscription();

  constructor() {}

  ngOnInit() {
    this.subs.add(
      this.parentForm.get('customImageCheck').valueChanges.subscribe(check => {
        // Make sure that the use will insert and Image value
        if (check) {
          this.parentForm.get('customImage').setValidators(Validators.required);
          this.parentForm.get('image').setValidators([]);
        } else {
          this.parentForm.get('customImage').setValidators([]);
          this.parentForm.get('image').setValidators(Validators.required);
        }

        this.parentForm.get('customImage').updateValueAndValidity();
        this.parentForm.get('image').updateValueAndValidity();
      }),
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
