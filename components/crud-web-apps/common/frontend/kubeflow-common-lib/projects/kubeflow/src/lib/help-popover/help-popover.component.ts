import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lib-help-popover',
  templateUrl: './help-popover.component.html',
  styleUrls: ['./help-popover.component.scss'],
})
export class HelpPopoverComponent implements OnInit {
  @Input() popoverPosition = 'below';

  @Input()
  showStatus: boolean;

  @Input()
  showDate: boolean;

  constructor() {}

  ngOnInit(): void {}
}
