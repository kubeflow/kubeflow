import { Component, OnInit } from '@angular/core';
import { ActionComponent, ActionIconValue, STATUS_TYPE } from 'kubeflow';
import { TableColumnComponent } from 'kubeflow/lib/resource-table/component-value/component-value.component';
@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss'],
})
export class DeleteButtonComponent
  extends ActionComponent
  implements TableColumnComponent, OnInit
{
  set element(data: any) {
    this.data = data;
  }
  get element() {
    return this.data;
  }

  ngOnInit(): void {
    this.action = new ActionIconValue({
      name: 'delete',
      tooltip: $localize`Delete Volume`,
      color: 'warn',
      field: 'deleteAction',
      iconReady: 'material:delete',
    });
  }

  isPhaseUnavailable(): boolean {
    return this.status === STATUS_TYPE.UNAVAILABLE;
  }

  isPhaseTerminating(): boolean {
    return this.status === STATUS_TYPE.TERMINATING;
  }

  getDisabledTooltip(element: any) {
    let tooltip = `Cannot delete PVC because it is being used by the following notebooks:\n`;

    for (const nb of element.notebooks) {
      tooltip += `\n ${nb}`;
    }
    return tooltip;
  }
}
