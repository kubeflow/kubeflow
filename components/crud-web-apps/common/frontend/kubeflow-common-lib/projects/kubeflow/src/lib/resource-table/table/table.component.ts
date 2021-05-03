import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  HostBinding,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {
  TableConfig,
  ActionEvent,
  ActionListValue,
  ActionButtonValue,
  ActionIconValue,
  MenuValue,
  StatusValue,
  PropertyValue,
  TABLE_THEME,
  ChipsListValue,
  ComponentValue,
} from '../types';
import { DateTimeValue } from '../types/date-time';
import { TemplateValue } from '../types/template';

@Component({
  selector: 'lib-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit {
  private innerConfig: TableConfig;
  private innerData: any[] = [];

  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = [];

  @HostBinding('class.lib-table') selfClass = true;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  TABLE_THEME = TABLE_THEME;

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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public isActionListValue(obj) {
    return obj instanceof ActionListValue;
  }

  public isActionButtonValue(obj) {
    return obj instanceof ActionButtonValue;
  }

  public isChipsListValue(obj) {
    return obj instanceof ChipsListValue;
  }

  public isComponentValue(obj) {
    return obj instanceof ComponentValue;
  }

  public isTemplateValue(obj) {
    return obj instanceof TemplateValue;
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

  public isDateTimeValue(obj) {
    return obj instanceof DateTimeValue;
  }

  public actionTriggered(e: ActionEvent) {
    // Forward the emitted ActionEvent
    this.actionsEmitter.emit(e);
  }

  public newButtonTriggered() {
    const ev = new ActionEvent('newResourceButton', {});
    this.actionsEmitter.emit(ev);
  }

  public linkClicked(col: string, data: any) {
    const ev = new ActionEvent(`${col}:link`, data);
    this.actionsEmitter.emit(ev);
  }

  get tableTheme(): TABLE_THEME {
    if (!this.config || !this.config.theme) {
      return TABLE_THEME.CARD;
    }

    return this.config.theme;
  }
}
