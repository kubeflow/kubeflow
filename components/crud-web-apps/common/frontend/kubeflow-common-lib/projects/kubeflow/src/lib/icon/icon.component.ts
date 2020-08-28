import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'lib-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnInit {
  @Input() icon = '';

  @HostBinding('class.lib-icon')
  libIcon = true;

  get iconSplit(): string[] {
    return this.icon.split(':');
  }

  constructor() {}

  ngOnInit() {}

  public getIcon() {
    if (this.iconSplit.length === 0) {
      console.error(`Invalid icon '${this.icon}'`);
      return '';
    }

    if (this.getCategory() === 'fa') {
      const inpt = this.iconSplit;
      return inpt.slice(1, inpt.length);
    }

    return this.iconSplit[1];
  }

  public getCategory() {
    if (this.iconSplit.length === 0) {
      console.error(`Invalid icon '${this.icon}'`);
      return '';
    }

    return this.iconSplit[0];
  }
}
