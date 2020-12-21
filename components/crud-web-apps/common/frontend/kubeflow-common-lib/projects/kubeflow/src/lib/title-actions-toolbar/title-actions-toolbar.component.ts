import {
  Component,
  Input,
  EventEmitter,
  Output,
  HostBinding,
} from '@angular/core';
import { ToolbarButton } from './types';

@Component({
  selector: 'lib-title-actions-toolbar',
  templateUrl: './title-actions-toolbar.component.html',
  styleUrls: ['./title-actions-toolbar.component.scss'],
})
export class TitleActionsToolbarComponent {
  @Input() buttons: ToolbarButton[] = [];
  @Input() backButton = true;
  @Input() title: string;
  @Output() buttonClicked = new EventEmitter<string>();
  @HostBinding('class.lib-title-actions-toolbar') selfClass = true;

  emitButtonClicked(button: string) {
    this.buttonClicked.emit(button);
  }

  emitBack() {
    this.buttonClicked.emit('backButton');
  }
}
