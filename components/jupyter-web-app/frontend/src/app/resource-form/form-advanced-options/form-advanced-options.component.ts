import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-form-advanced-options",
  templateUrl: "./form-advanced-options.component.html",
  styleUrls: [
    "./form-advanced-options.component.scss",
    "../resource-form.component.scss"
  ]
})
export class FormAdvancedOptionsComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() set shmReadonly(b: boolean) {
    if (b) {
      this.parentForm.get("shm").disable();
    } else {
      this.parentForm.get("shm").enable();
    }
  }

  constructor() {}

  ngOnInit() {}
}
