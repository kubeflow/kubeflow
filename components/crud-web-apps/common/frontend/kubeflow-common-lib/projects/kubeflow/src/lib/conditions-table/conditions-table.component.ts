import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Condition, ConditionIR } from './types';
import { STATUS_TYPE } from '../resource-table/status/types';
import { generateConfig } from './config';
import { TableConfig } from '../resource-table/types';

@Component({
  selector: 'lib-conditions-table',
  templateUrl: './conditions-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [],
})
export class ConditionsTableComponent {
  private conditionsPrv: ConditionIR[] = [];
  public config: TableConfig = generateConfig();

  @Input()
  set title(t: string) {
    this.config.title = t;
  }

  @Input()
  set conditions(cs: ConditionIR[]) {
    this.conditionsPrv = JSON.parse(JSON.stringify(cs));

    // parse the status. It should be ready only if it was True
    for (const condition of this.conditionsPrv) {
      condition.statusPhase = STATUS_TYPE.WARNING;
      if (condition.status === 'True') {
        condition.statusPhase = STATUS_TYPE.READY;
      }

      condition.statusMessage = condition.status;
    }
  }

  get conditions(): ConditionIR[] {
    return this.conditionsPrv;
  }

  public conditionsTrackByFn(index: number, c: Condition) {
    return `${c.type}/${c.lastTransitionTime}`;
  }
}
