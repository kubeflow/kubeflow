import { Component, Input, HostBinding } from '@angular/core';
import { ListValueType, ChipDescriptor, ListValue } from '../types';
import { SnackBarService } from '../../snack-bar/snack-bar.service';
import { SnackBarConfig, SnackType } from '../../snack-bar/types';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'lib-details-list-item',
  templateUrl: './details-list-item.component.html',
  styleUrls: ['./details-list-item.component.scss'],
})
export class DetailsListItemComponent {
  @Input() key: string;
  @Input() value: ListValue;
  @Input() icon: string;
  @Input() valueType: ListValueType;
  @Input() chipsList: ChipDescriptor[];
  @Input() keyTooltip: string;
  @Input() valueTooltip: string;
  @Input() topDivider = false;
  @Input() bottomDivider = true;
  @Input() copyValue;
  @Input() keyMinWidth = '250px';

  @HostBinding('class.lib-details-list-item') selfClass = true;

  constructor(public snack: SnackBarService, public clipboard: Clipboard) {}

  copy() {
    if (!this.copyValue) {
      const configWarning: SnackBarConfig = {
        data: {
          msg: 'No value to copy to clipboard',
          snackType: SnackType.Warning,
        },
        duration: 2000,
      };
      this.snack.open(configWarning);
      return;
    }

    const configInfo: SnackBarConfig = {
      data: {
        msg: 'Content copied to clipboard',
        snackType: SnackType.Info,
      },
      duration: 2000,
    };
    this.clipboard.copy(this.copyValue);
    this.snack.open(configInfo);
  }

  getClasses() {
    const classes = ['key-icon'];

    if (!this.icon) {
      return classes;
    }

    classes.push(this.icon);
    return classes;
  }
}
