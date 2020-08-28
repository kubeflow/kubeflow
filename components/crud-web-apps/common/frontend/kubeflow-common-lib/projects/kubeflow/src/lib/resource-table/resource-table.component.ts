import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import {
  TableConfig,
  ActionEvent,
  ActionListValue,
  ActionButtonValue,
  ActionIconValue,
  MenuValue,
  StatusValue,
  PropertyValue,
} from './types';

@Component({
  selector: 'lib-resource-table',
  templateUrl: './resource-table.component.html',
  styleUrls: ['./resource-table.component.scss'],
})
export class ResourceTableComponent implements OnInit {
  private innerConfig: TableConfig;
  private innerData: any[] = [];

  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = [];

  @Input()
  set config(config: TableConfig) {
    this.innerConfig = config;

    this.displayedColumns = [];
    for (const col of config.columns) {
      this.displayedColumns.push(col.matColumnDef);
    }
  }
  get config(): TableConfig {
    return this.innerConfig;
  }

  @Input()
  trackByFn: (index: number, r: any) => string;

  @Input()
  get data() {
    return this.innerData;
  }
  set data(newData) {
    this.dataSource.data = newData;
  }

  // Whenever a button in a row is pressed the component will emit an event
  // with information regarding the button that was pressed as well as the
  // row's object.
  @Output() actionsEmitter = new EventEmitter<ActionEvent>();

  constructor() {}

  ngOnInit() {}

  public isActionListValue(obj) {
    return obj instanceof ActionListValue;
  }

  public isActionButtonValue(obj) {
    return obj instanceof ActionButtonValue;
  }

  public isActionIconValue(obj) {
    return obj instanceof ActionIconValue;
  }

  public isMenuValue(obj) {
    return obj instanceof MenuValue;
  }

  public isStatusValue(obj) {
    return obj instanceof StatusValue;
  }

  public isPropertyValue(obj) {
    return obj instanceof PropertyValue;
  }

  public actionTriggered(e: ActionEvent) {
    // Forward the emitted ActionEvent
    this.actionsEmitter.emit(e);
  }

  public newButtonTriggered() {
    const ev = new ActionEvent('newResourceButton', {});
    this.actionsEmitter.emit(ev);
  }

  public minTableWidth() {
    // Review: This will break if the config is an other falsy value
    // https://developer.mozilla.org/en-US/docs/Glossary/Falsy
    if (typeof this.config === 'undefined') {
      return '600px';
    }

    return `${this.config.columns.length * 100}px`;
  }
}
