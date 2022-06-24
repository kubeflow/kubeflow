import { Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-yamls',
  templateUrl: './yamls.component.html',
  styleUrls: ['./yamls.component.scss'],
})
export class YamlsComponent {
  @Input() value: Object;

  @ViewChild('editor') editor;

  get data(){
    if (this.editor.text != "") {
      return JSON.parse(this.editor.text);
    }
    return null;
  }
}
