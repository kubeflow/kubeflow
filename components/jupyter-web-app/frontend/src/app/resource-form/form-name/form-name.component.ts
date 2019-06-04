import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-form-name",
  templateUrl: "./form-name.component.html",
  styleUrls: ["./form-name.component.scss", "../resource-form.component.scss"]
})
export class FormNameComponent implements OnInit {
  @Input() parentForm: FormGroup;

  constructor() {}

  ngOnInit() {}
}
