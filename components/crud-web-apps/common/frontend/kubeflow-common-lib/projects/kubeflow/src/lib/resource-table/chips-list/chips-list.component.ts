import { Component, OnInit, Input } from '@angular/core';
import { ChipsListValue } from '../types';
import { ChipDescriptor } from '../../details-list/types';

@Component({
  selector: 'lib-table-chips-list',
  templateUrl: './chips-list.component.html',
  styleUrls: ['./chips-list.component.scss'],
})
export class TableChipsListComponent {
  @Input() element: any;
  @Input() valueDescriptor: ChipsListValue;

  hasVisibleItems(row: any): boolean {
    return this.getChips(row).length > this.valueDescriptor.maxVisibleChips;
  }

  getVisibleChips(row: any): ChipDescriptor[] {
    return this.getChips(row).slice(0, this.valueDescriptor.maxVisibleChips);
  }

  getChips(row: any): ChipDescriptor[] {
    return this.valueDescriptor.getChips(row);
  }

  trackByFn(index: number, chip: ChipDescriptor) {
    return chip.value;
  }
}
