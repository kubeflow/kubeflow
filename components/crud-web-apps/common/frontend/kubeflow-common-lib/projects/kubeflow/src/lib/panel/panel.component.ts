import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent {
  @Input() icon = 'info';
  @Input() color = 'primary';
  @Input() message: string;
}
