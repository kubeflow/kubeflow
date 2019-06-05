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
  @Input()
  set readonly(b: boolean) {
    if (b) {
      this.parentForm.get("image").disable();
      this.parentForm.get("customImageCheck").disable();
    } else {
      this.parentForm.get("image").enable();
      this.parentForm.get("customImageCheck").enable();
    }
  }

  constructor() {}

  ngOnInit() {}
}
