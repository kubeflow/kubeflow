import { Component, Input, OnInit } from '@angular/core';
import { VariablesGroup } from './types';

@Component({
  selector: 'lib-variables-group-table',
  templateUrl: './variables-groups-table.component.html',
  styleUrls: ['./variables-groups-table.component.scss'],
})
export class VariablesGroupsTableComponent implements OnInit {
  private prvEnvGroups: VariablesGroup[];
  @Input()
  set envGroups(groups: VariablesGroup[]) {
    this.prvEnvGroups = groups;
  }
  get envGroups() {
    return this.prvEnvGroups;
  }
  @Input() loadErrorMsg = 'Resources not available';
  @Input() loadCompleted = false;

  envGroupsEmpty(): boolean {
    return this.envGroups?.length === 0;
  }

  constructor() {}

  ngOnInit(): void {}
}
