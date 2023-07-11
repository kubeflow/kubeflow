import {
  Component,
  Input,
  ComponentRef,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { ActionEvent, ComponentValue } from '../types';
import { ComponentPortal, Portal } from '@angular/cdk/portal';

export interface TableColumnComponent {
  element: any;
}

@Component({
  selector: 'lib-component-value',
  templateUrl: './component-value.component.html',
  styleUrls: ['./component-value.component.scss'],
})
export class ComponentValueComponent implements OnInit {
  public portal: Portal<any>;
  private componentRef: ComponentRef<TableColumnComponent>;
  private data: any;

  @Input()
  get element(): any {
    return this.data;
  }
  set element(data: any) {
    this.data = data;

    if (!this.componentRef) {
      return;
    }

    this.componentRef.instance.element = data;
  }

  @Input() valueDescriptor: ComponentValue;

  @Output()
  emitter = new EventEmitter<ActionEvent>();

  ngOnInit() {
    this.portal = new ComponentPortal(this.valueDescriptor.component);
  }

  onAttach(ref: ComponentRef<TableColumnComponent>) {
    this.componentRef = ref;
    this.componentRef.instance.element = this.element;
    /* eslint-disable */
    if (this.componentRef.instance?.['emitter']) {
      this.componentRef.instance['emitter'] = this.emitter;
    }
    /* eslint-enable */
  }
}
