import { Component, OnInit } from '@angular/core';
import { ActionComponent, ActionIconValue, STATUS_TYPE } from 'kubeflow';
import { TableColumnComponent } from 'kubeflow/lib/resource-table/component-value/component-value.component';
@Component({
  selector: 'app-close-pvcviewer-button',
  templateUrl: './close-pvcviewer-button.component.html',
  styleUrls: ['./close-pvcviewer-button.component.scss'],
})
export class ClosePVCViewerButtonComponent
  extends ActionComponent
  implements TableColumnComponent, OnInit {
  set element(data: any) {
    this.data = data;
  }
  get element() {
    return this.data;
  }

  ngOnInit(): void {
    this.action = new ActionIconValue({
      name: 'close-pvcviewer',
      tooltip: $localize`Close PVCViewer`,
      color: 'warn',
      field: 'closePVCViewerAction',
      iconReady: 'material:close',
    });
  }

  public isDeletable(): boolean {
    return (
      this.element.viewer.status === STATUS_TYPE.READY ||
      this.element.viewer.status === STATUS_TYPE.WAITING
    );
  }

  isPhaseUninitialized(): boolean {
    return (
      this.element.viewer.status === STATUS_TYPE.UNAVAILABLE ||
      this.element.viewer.status === STATUS_TYPE.UNINITIALIZED
    );
  }

  isPhaseTerminating(): boolean {
    return this.element.viewer.status === STATUS_TYPE.TERMINATING;
  }
}
