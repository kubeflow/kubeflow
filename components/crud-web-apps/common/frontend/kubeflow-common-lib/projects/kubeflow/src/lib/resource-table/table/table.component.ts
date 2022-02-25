import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  HostBinding,
  ViewChild,
  OnDestroy,
  OnInit,
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
import { NamespaceService } from '../../services/namespace.service';
import { Subscription } from 'rxjs';
import { addColumn, NAMESPACE_COLUMN, removeColumn } from './utils';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'lib-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit, OnInit, OnDestroy {
  private nsSub = new Subscription();
  private innerData: any[] = [];
  public dataSource = new MatTableDataSource();
  public get displayedColumns(): string[] {
    if (!this.config) {
      return [];
    }

    const cols = [];
    for (const col of this.config.columns) {
      cols.push(col.matColumnDef);
    }

    return cols;
  }

  @HostBinding('class.lib-table') selfClass = true;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  TABLE_THEME = TABLE_THEME;

  @Input()
  config: TableConfig;

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

  constructor(public ns: NamespaceService) {}

  ngOnInit() {
    this.nsSub = this.ns.getSelectedNamespace2().subscribe(ns => {
      if (
        !this.config ||
        !this.config.dynamicNamespaceColumn ||
        this.config.columns.length === 0
      ) {
        return;
      }

      if (Array.isArray(ns)) {
        addColumn(this.config, NAMESPACE_COLUMN, 'name');
      } else {
        removeColumn(this.config, 'namespace');
      }
    });
    this.sort.sort({ disableClear: true, id: 'name', start: 'asc' });
  }

  ngOnDestroy() {
    this.nsSub.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (element, sortHeaderId) => {
      let sortingPreprocessorFn;
      let valueExtractor;
      this.config.columns.forEach(column => {
        if (column.matColumnDef === sortHeaderId) {
          valueExtractor = column.value;
          sortingPreprocessorFn = column.sortingPreprocessorFn;
        }
      });
      if (this.isPropertyValue(valueExtractor)) {
        if (sortingPreprocessorFn !== undefined) {
          return sortingPreprocessorFn(valueExtractor.getValue(element));
        } else {
          return valueExtractor.getValue(element);
        }
      }
      if (this.isDateTimeValue(valueExtractor)) {
        if (valueExtractor.getValue(element) === '') {
          return -1;
        } else {
          return new Date(valueExtractor.getValue(element));
        }
      }
      if (this.isStatusValue(valueExtractor)) {
        return valueExtractor.getPhase(element);
      }
      if (this.isComponentValue(valueExtractor)) {
        return sortingPreprocessorFn(element);
      }
    };
    this.dataSource.sortData = (data, sort) => {
      const active = sort.active;
      const direction = sort.direction;
      if (!active || direction === '') {
        return data;
      }
      return data.sort((a, b) => {
        const valueA = this.dataSource.sortingDataAccessor(a, active);
        const valueB = this.dataSource.sortingDataAccessor(b, active);
        // If both valueA and valueB exist (truthy), then compare the two. Otherwise, check if
        // one value exists while the other doesn't. In this case, existing value should come last.
        // This avoids inconsistent results when comparing values to undefined/null.
        // If neither value exists, return 0 (equal).
        let comparatorResult = 0;
        if (valueA != null && valueB != null) {
          // Check if one value is greater than the other; if equal, comparatorResult should remain 0.
          if (valueA > valueB) {
            comparatorResult = 1;
          } else if (valueA < valueB) {
            comparatorResult = -1;
          }
        } else if (valueA != null) {
          comparatorResult = 1;
        } else if (valueB != null) {
          comparatorResult = -1;
        }
        return comparatorResult * (direction === 'asc' ? 1 : -1);
      });
    };
    this.dataSource.sort = this.sort;
    this.sort.disableClear = true;
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
