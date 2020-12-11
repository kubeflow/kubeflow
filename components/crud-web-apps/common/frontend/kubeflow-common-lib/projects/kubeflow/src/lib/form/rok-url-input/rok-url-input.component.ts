import {
  Component,
  OnInit,
  Input,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { getRokUrlError } from '../validators';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'lib-rok-url-input',
  templateUrl: './rok-url-input.component.html',
  styleUrls: ['./rok-url-input.component.scss'],
})
export class RokUrlInputComponent implements OnInit {
  @Input() control: AbstractControl;
  @Input() mode = 'group';
  @Input() create = false;
  @Output() urlEntered = new EventEmitter<string>();

  private popupChooser;
  private chooserId = -1;

  constructor() {}

  ngOnInit() {
    // Emit an event whenever a valid url has been detected
    this.control.statusChanges
      .pipe(filter(() => this.control.valid && this.control.value !== ''))
      .subscribe(() => {
        const url = this.control.value;
        this.urlEntered.emit(url);
      });
  }

  // Chooser popup handlers
  public openChooser() {
    if (this.popupChooser && !this.popupChooser.closed) {
      this.popupChooser.focus();
      return;
    }
    this.chooserId = Date.now();
    this.popupChooser = window.open(
      `/rok/buckets?mode=${this.mode}-chooser` +
        `&create=${this.create}` +
        `&chooser-id=${this.chooserId}`,
      'Chooser',
      `height=500,width=600,menubar=0`,
    );
  }

  public parseRokUrlError() {
    return getRokUrlError(this.control);
  }

  @HostListener('window:message', ['$event'])
  onMessage(event) {
    if (
      typeof event.data === 'object' &&
      event.data.hasOwnProperty('chooser') &&
      event.data.hasOwnProperty('chooserId') &&
      event.data.chooserId === this.chooserId.toString()
    ) {
      this.control.setValue(event.data.chooser);
      this.popupChooser.close();
    }
  }
}
