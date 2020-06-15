import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-form-image",
  templateUrl: "./form-image.component.html",
  styleUrls: ["./form-image.component.scss", "../resource-form.component.scss"]
})
export class FormImageComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() images: string[];
  @Input() readonly: boolean;
  @Input() hideRegistry: boolean;
  @Input() hideVersion: boolean;

  constructor() {}

  ngOnInit() {}

  imageDisplayName(image: string): string {
    const [name, version = null] = image.split(':');
    let tokens = name.split('/')

    if (this.hideRegistry && tokens.length > 1 && tokens[0].includes('.')) {
      tokens.shift();
    }
    let displayName = tokens.join('/');

    if (!this.hideVersion && version !== null) {
      displayName = `${displayName}:${version}`;
    }

    return displayName;
  }
}
