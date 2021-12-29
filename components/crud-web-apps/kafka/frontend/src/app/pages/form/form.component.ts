import { Component, OnInit } from '@angular/core';
import { environment } from '@app/environment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  env = environment;

  constructor() {}

  ngOnInit(): void {}
}
