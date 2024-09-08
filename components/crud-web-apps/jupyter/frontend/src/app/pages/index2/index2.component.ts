import { Component, OnInit } from '@angular/core';
import { environment } from '@app/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index2.component.html',
  styleUrls: ['./index2.component.scss'],
})
export class IndexComponent2 implements OnInit {
  env = environment;

  constructor() {}

  ngOnInit(): void {}
}
