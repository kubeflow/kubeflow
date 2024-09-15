/* This code was developed by @tasos-ale */
import {
  Component,
  HostListener,
  ViewContainerRef,
  TemplateRef,
  ChangeDetectorRef,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { TemplatePortal } from '@angular/cdk/portal';

export class PopoverTemplatePortal<C> extends TemplatePortal<C> {
  constructor(
    template: TemplateRef<C>,
    context?: C,
    viewContainerRef?: ViewContainerRef,
  ) {
    super(template, viewContainerRef, context);
  }
}

@Component({
  selector: 'lib-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PopoverComponent {
  private classListPrv: string[] = ['lib-popover'];
  get classList(): string[] {
    return this.classListPrv;
  }
  set classList(list: string[]) {
    this.classListPrv = ['lib-popover', ...list];
  }
  @HostBinding('class')
  get hostClass(): string {
    return this.classList.join(' ');
  }
  @HostBinding('style.visibility') visibilityPrv = 'hidden';
  tplPortal: TemplatePortal<any>;
  message = '';
  set template(v: PopoverTemplatePortal<any>) {
    this.tplPortal = v;
  }
  private hideTimeoutId: number;
  private showTimeoutId: number;
  private readonly onHide: Subject<void> = new Subject<void>();
  @HostListener('mouseenter')
  OnMouseEnter() {
    if (this.hideTimeoutId) {
      clearTimeout(this.hideTimeoutId);
    }
  }
  @HostListener('mouseleave')
  OnMouseLeave() {
    this.hide(0);
  }

  constructor(
    private vcr: ViewContainerRef,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  show(delay: number): void {
    if (this.hideTimeoutId) {
      window.clearTimeout(this.hideTimeoutId);
    }
    this.showTimeoutId = window.setTimeout(() => {
      this.visibilityPrv = 'visible';
      // Mark for check in case the parent has set ChangeDetectionStrategy
      // to OnPush.
      this.markForCheck();
    }, delay);
  }

  hide(delay: number): void {
    if (this.showTimeoutId) {
      window.clearTimeout(this.showTimeoutId);
    }
    this.hideTimeoutId = window.setTimeout(() => {
      // TODO: When we start to use @angular/animations move the
      // "onHide.next()" method to animation's finished callback
      this.onHide.next(undefined);
      this.visibilityPrv = 'hidden';
      // Mark for check in case the parent has set ChangeDetectionStrategy
      // to OnPush.
      this.markForCheck();
    }, delay);
  }

  afterHidden(): Observable<void> {
    return this.onHide.asObservable();
  }

  markForCheck(): void {
    this.changeDetectorRef.markForCheck();
  }
}
