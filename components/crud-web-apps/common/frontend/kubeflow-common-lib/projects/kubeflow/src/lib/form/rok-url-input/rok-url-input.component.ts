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
import { RokService } from '../../services/rok/rok.service';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'lib-rok-url-input',
  templateUrl: './rok-url-input.component.html',
  styleUrls: ['./rok-url-input.component.scss'],
})
export class RokUrlInputComponent implements OnInit {
  @Input() control: AbstractControl;
  @Input() snapshotType: string;
  @Input() mode = 'group';
  @Input() create = false;
  @Output() snapshotHeaders = new EventEmitter<HttpHeaders>();

  private popupChooser;
  private chooserId = -1;
  dateTime: string;

  constructor(public rok: RokService) {}

  ngOnInit() {
    // Emit an event whenever a valid url has been detected
    this.control.statusChanges
      .pipe(filter(() => this.control.valid && this.control.value !== ''))
      .subscribe(() => {
        this.getHeaders(this.control.value);
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

  getHeaders(url: string) {
    this.rok.getObjectMetadata(url).subscribe(headers => {
      this.snapshotHeaders.emit(headers);
      this.dateTime = this.formatDate(
        headers.get('x-origin-created-timestamp'),
      );
    });
  }

  formatDate(inputDate: string): string {
    // More info about 'en-GB' here:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
    const myDate = new Date(inputDate).toLocaleString('en-GB', {
      timeZone: 'UTC',
    });
    return myDate.replace(', ', ' - ');
  }
}
