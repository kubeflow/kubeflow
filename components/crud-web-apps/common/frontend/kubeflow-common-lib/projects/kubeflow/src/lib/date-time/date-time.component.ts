import {
  Component,
  OnDestroy,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { DateTimeService } from '../services/date-time.service';

@Component({
  selector: 'lib-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimeComponent implements OnDestroy {
  private timer: number;
  private defaultDisplayValuePrv = '-';
  private datePrv: string | Date;

  @Input()
  get date(): string | Date {
    return this.datePrv;
  }
  set date(v: string | Date) {
    this.datePrv = v;
    this.formattedDate = this.timeAgo(v);
  }
  formattedDate: string;

  @Input() popoverPosition = 'below';

  @Input('default')
  set defaultDisplayValue(v: string) {
    this.defaultDisplayValuePrv = v;
    this.checkAndUpdate(this.date);
  }
  get defaultDisplayValue(): string {
    return this.defaultDisplayValuePrv;
  }

  get isPopoverDisabled(): boolean {
    return !this.date;
  }

  constructor(
    private dtService: DateTimeService,
    private cdRef: ChangeDetectorRef,
  ) {
    this.timer = window.setInterval(() => {
      if (this.date) {
        this.checkAndUpdate(this.date);
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  private timeAgo(d: string | Date): string {
    if (!d) {
      return this.defaultDisplayValue;
    }
    return this.dtService.distanceInWords(d);
  }

  private checkAndUpdate(date: string | Date) {
    const d = this.timeAgo(date);
    if (this.formattedDate !== d && this.cdRef) {
      this.formattedDate = d;
      this.cdRef.detectChanges();
    }
  }
}
