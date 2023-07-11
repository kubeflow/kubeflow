/* This code was developed by @tasos-ale */
import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  ElementRef,
  HostListener,
  OnDestroy,
  NgZone,
  ComponentRef,
} from '@angular/core';
import {
  Overlay,
  OverlayConfig,
  OverlayRef,
  OriginConnectionPosition,
  OverlayConnectionPosition,
  HorizontalConnectionPos,
  VerticalConnectionPos,
  ScrollDispatcher,
  FlexibleConnectedPositionStrategy,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { take } from 'rxjs/operators';

import { PopoverComponent, PopoverTemplatePortal } from './popover.component';

interface OriginPosition {
  main: OriginConnectionPosition;
  fallback: OriginConnectionPosition;
}

interface OverlayPosition {
  main: OverlayConnectionPosition;
  fallback: OverlayConnectionPosition;
}

type Position = 'above' | 'below' | 'before' | 'after';

type PopoverValue = TemplateRef<any> | string;

@Directive({ selector: '[libPopover]' })
export class PopoverDirective implements OnDestroy {
  private libPopoverPrv: PopoverValue;
  @Input('libPopover')
  get libPopover(): PopoverValue {
    return this.libPopoverPrv;
  }
  set libPopover(v: PopoverValue) {
    this.checkAndUpdate(this.libPopoverPrv, v);
    this.libPopoverPrv = v;
  }
  @Input() libPopoverContext: any = {};
  @Input() libPopoverPosition: Position = 'below';
  @Input() libPopoverClass: string[] = [];
  @Input('libPopoverDisabled') disabled = false;
  @Input() libPopoverShowDelay = 100;
  @Input() libPopoverHideDelay = 100;

  portal: ComponentPortal<PopoverComponent>;
  popoverInstance: PopoverComponent | null;
  overlayRef: OverlayRef | null;

  @HostListener('mouseenter')
  OnMouseEnter() {
    if (this.disabled || !this.libPopover) {
      return;
    }
    this.show();
  }

  @HostListener('mouseleave')
  OnMouseLeave() {
    this.hide();
  }
  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private elemRef: ElementRef,
    private ngZone: NgZone,
    private scrollDispatcher: ScrollDispatcher,
  ) {}

  ngOnDestroy() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.popoverInstance = null;
    }
  }

  show(delay: number = this.libPopoverShowDelay) {
    if (!this.popoverInstance) {
      this.createPopover();
    }
    if (typeof this.libPopover === 'string') {
      this.popoverInstance.message = this.libPopover;
    } else if (this.libPopover instanceof TemplateRef) {
      this.popoverInstance.template = new PopoverTemplatePortal(
        this.libPopover,
        this.libPopoverContext,
      );
    } else if ((this.libPopover as any) instanceof ComponentRef) {
      // https://github.com/Microsoft/TypeScript/issues/19298
      // FIXME: Add support for Components
    }
    if (this.libPopoverClass.length > 0) {
      this.popoverInstance.classList = this.libPopoverClass;
    }
    this.popoverInstance.show(delay);
    this.popoverInstance.afterHidden().subscribe(() => this.detach());
    this.updatePosition();
  }

  createPopover() {
    const overlayRef = this.createOverlay();
    this.portal =
      this.portal ||
      new ComponentPortal(PopoverComponent, this.viewContainerRef);
    this.popoverInstance = overlayRef.attach(this.portal).instance;
  }

  createOverlay(): OverlayRef {
    if (this.overlayRef) {
      return this.overlayRef;
    }
    const overlayConfig = this.getOverlayConfig();
    this.overlayRef = this.overlay.create(overlayConfig);
    return this.overlayRef;
  }

  hide(delay: number = this.libPopoverHideDelay): void {
    if (this.popoverInstance) {
      this.popoverInstance.hide(delay);
    }
  }

  detach() {
    if (this.overlayRef && this.overlayRef.hasAttached) {
      this.overlayRef.detach();
    }

    this.popoverInstance = null;
  }

  getOverlayConfig(): OverlayConfig {
    const state = new OverlayConfig({
      positionStrategy: this.getPositionStrategy(),
      scrollStrategy: this.overlay.scrollStrategies.close(),
      panelClass: 'lib-popover-panel',
      direction: 'ltr',
    });
    return state;
  }

  getConnectedElement(): ElementRef {
    return this.elemRef;
  }

  updatePosition() {
    if (this.popoverInstance) {
      this.popoverInstance.markForCheck();
      this.ngZone.onMicrotaskEmpty.pipe(take(1)).subscribe(() => {
        this.overlayRef.updatePosition();
      });
    }
  }

  getPositionStrategy(): FlexibleConnectedPositionStrategy {
    const originPos: OriginPosition = this.getOriginPos(
      this.libPopoverPosition,
    );
    const overlayPos: OverlayPosition = this.getOverlayPos(
      this.libPopoverPosition,
    );

    const scrollableAncestors =
      this.scrollDispatcher.getAncestorScrollContainers(this.elemRef);
    return this.overlay
      .position()
      .flexibleConnectedTo(this.elemRef)
      .withTransformOriginOn('.lib-popover')
      .withFlexibleDimensions(false)
      .withViewportMargin(8)
      .withScrollableContainers(scrollableAncestors)
      .withPositions([
        { ...originPos.main, ...overlayPos.main },
        { ...originPos.fallback, ...overlayPos.fallback },
      ]);
  }

  getOriginPos(position: Position): OriginPosition {
    let originPos: OriginConnectionPosition;
    if (position === 'above' || position === 'below') {
      originPos = {
        originX: 'center',
        originY: position === 'above' ? 'top' : 'bottom',
      };
    } else if (position === 'before') {
      originPos = {
        originX: 'start',
        originY: 'center',
      };
    } else if (position === 'after') {
      originPos = {
        originX: 'end',
        originY: 'center',
      };
    } else {
      throw Error(`Origin position "${position}" is invalid.`);
    }

    const { x, y } = this.invertPosition(
      position,
      originPos.originX,
      originPos.originY,
    );

    return {
      main: originPos,
      fallback: { originX: x, originY: y },
    };
  }

  getOverlayPos(position: Position): OverlayPosition {
    let overlayPos: OverlayConnectionPosition;
    if (position === 'above') {
      overlayPos = {
        overlayX: 'center',
        overlayY: 'bottom',
      };
    } else if (position === 'below') {
      overlayPos = {
        overlayX: 'center',
        overlayY: 'top',
      };
    } else if (position === 'before') {
      overlayPos = {
        overlayX: 'end',
        overlayY: 'center',
      };
    } else if (position === 'after') {
      overlayPos = {
        overlayX: 'start',
        overlayY: 'center',
      };
    } else {
      throw Error(`Overlay position "${position}" is invalid.`);
    }

    const { x, y } = this.invertPosition(
      position,
      overlayPos.overlayX,
      overlayPos.overlayY,
    );

    return {
      main: overlayPos,
      fallback: { overlayX: x, overlayY: y },
    };
  }

  invertPosition(
    position: Position,
    x: HorizontalConnectionPos,
    y: VerticalConnectionPos,
  ) {
    if (position === 'above' || position === 'below') {
      if (y === 'top') {
        y = 'bottom';
      } else if (y === 'bottom') {
        y = 'top';
      }
    } else {
      if (x === 'end') {
        x = 'start';
      } else if (x === 'start') {
        x = 'end';
      }
    }

    return { x, y };
  }

  checkAndUpdate(oldValue: PopoverValue, newValue: PopoverValue): void {
    if (
      typeof newValue === 'string' &&
      newValue !== oldValue &&
      this.popoverInstance
    ) {
      this.popoverInstance.message = newValue;
      this.updatePosition();
    }
  }
}
