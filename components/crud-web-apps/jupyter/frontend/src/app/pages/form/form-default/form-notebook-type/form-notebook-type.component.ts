import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-notebook-type',
  templateUrl: './form-notebook-type.component.html',
  styleUrls: ['./form-notebook-type.component.scss'],
})
export class FormNotebookTypeComponent  {
  @Input() parentForm: FormGroup;
  @Input() notebookTypes: string[];

  constructor() { }
}
