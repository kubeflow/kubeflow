import { Component, Input } from '@angular/core';
import { ListEntry } from './types';

@Component({
  selector: 'lib-details-list',
  templateUrl: './details-list.component.html',
  styleUrls: ['./details-list.component.scss'],
})
export class DetailsListComponent {
  @Input() entries: ListEntry[] = [];
  @Input() topDivider = true;

  @Input() title: string;
}
