import { Component, OnInit } from '@angular/core';
import { ActionComponent, ActionIconValue, STATUS_TYPE } from 'kubeflow';
import { TableColumnComponent } from 'kubeflow/lib/resource-table/component-value/component-value.component';
@Component({
  selector: 'app-open-pvcviewer-button',
  templateUrl: './open-pvcviewer-button.component.html',
  styleUrls: ['./open-pvcviewer-button.component.scss'],
})
export class OpenPVCViewerButtonComponent
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
      name: 'open-pvcviewer',
      tooltip: $localize`Open PVCViewer`,
      color: 'primary',
      field: 'openPVCViewerAction',
      iconInit: 'material:folder',
      iconReady: 'custom:folderSearch',
    });
  }

  // Overwrite the default isPhaseReady() function to check for the viewer's status
  public isPhaseReady(): boolean {
    return this.element.viewer.status === STATUS_TYPE.READY;
  }

  isPhaseUninitialized(): boolean {
    return this.element.viewer.status === STATUS_TYPE.UNINITIALIZED;
  }

  isPhaseWaiting(): boolean {
    return this.element.viewer.status === STATUS_TYPE.WAITING;
  }

  isPhaseTerminating(): boolean {
    return this.element.viewer.status === STATUS_TYPE.TERMINATING;
  }
}
