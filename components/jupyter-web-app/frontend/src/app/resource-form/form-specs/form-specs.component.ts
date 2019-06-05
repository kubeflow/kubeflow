import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-form-specs",
  templateUrl: "./form-specs.component.html",
  styleUrls: ["./form-specs.component.scss", "../resource-form.component.scss"]
})
export class FormSpecsComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() set readonlyCPU(b: boolean) {
    if (b) {
      this.parentForm.get("cpu").disable();
    } else {
      this.parentForm.get("cpu").enable();
    }
  }
  @Input() set readonlyMemory(b: boolean) {
    if (b) {
      this.parentForm.get("memory").disable();
    } else {
      this.parentForm.get("memory").enable();
    }
  }

  constructor() {}

  ngOnInit() {}
}
