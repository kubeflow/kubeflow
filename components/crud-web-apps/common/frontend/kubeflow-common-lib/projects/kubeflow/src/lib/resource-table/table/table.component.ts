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
  ElementRef,
  SimpleChanges,
  OnChanges,
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
  LinkValue,
  LinkType,
} from '../types';
import { DateTimeValue } from '../types/date-time';
import { TemplateValue } from '../types/template';
import { NamespaceService } from '../../services/namespace.service';
import { Subscription } from 'rxjs';
import { addColumn, NAMESPACE_COLUMN, removeColumn } from './utils';
import { MatSort } from '@angular/material/sort';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { DateTimeService } from '../../services/date-time.service';
import { isEqual } from 'lodash-es';
import { MemoryValue } from '../types/memory-value';

@Component({
  selector: 'lib-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent
  implements AfterViewInit, OnInit, OnDestroy, OnChanges
{
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

  chipList = [];
  chips = [];
  headers: { title: string }[] = [];
  isClear: boolean;
  filteredHeaders: { title: string }[] = [];
  chipCtrl = new FormControl();
  showDate = false;
  showStatus = false;
  LinkType = LinkType;

  @HostBinding('class.lib-table') selfClass = true;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('chipInput') chipInput: ElementRef<HTMLInputElement>;
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;

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

  @Input()
  highlightedRow: unknown = {};

  // Whenever a button in a row is pressed the component will emit an event
  // with information regarding the button that was pressed as well as the
  // row's object.
  @Output() actionsEmitter = new EventEmitter<ActionEvent>();

  constructor(public ns: NamespaceService, private dtService: DateTimeService) {
    this.chipCtrl.valueChanges.subscribe(chip => {
      this.filteredHeaders = this.filter(chip);
    });
  }

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

    const sortByColumn = this.config.sortByColumn || 'name';
    const sortDirection = this.config.sortDirection || 'asc';
    this.sort.sort({
      disableClear: true,
      id: sortByColumn,
      start: sortDirection,
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      this.configureFilter(changes.config.currentValue);
    }
  }

  configureFilter(config: TableConfig): void {
    this.headers = [];
    this.showStatus = false;
    this.showDate = false;
    config.columns.forEach(column => {
      if (
        !this.isMenuValue(column.value) &&
        !this.isActionListValue(column.value) &&
        !(
          this.isComponentValue(column.value) &&
          column.filteringPreprocessorFn === undefined
        )
      ) {
        this.headers.push({
          title: column.matHeaderCellDef,
        });
      }

      if (this.isStatusValue(column.value)) {
        this.showStatus = true;
      }

      if (this.isDateTimeValue(column.value)) {
        this.showDate = true;
      }
    });
    this.filteredHeaders = this.filter(this.chipCtrl.value);
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
      if (this.isLinkValue(valueExtractor)) {
        if (sortingPreprocessorFn !== undefined) {
          return sortingPreprocessorFn(valueExtractor.getValue(element));
        } else {
          return valueExtractor.getValue(element);
        }
      }
      if (this.isMemoryValue(valueExtractor)) {
        return valueExtractor.getValue(element);
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
    this.dataSource.sort = this.sort;
    this.sort.disableClear = true;
    this.dataSource.filterPredicate = (row: unknown, filterInput: string) =>
      this.filterPredicate(row, filterInput);
  }

  filterPredicate(row: unknown, filterInput: string): boolean {
    const filterValueList = JSON.parse(filterInput);
    let found = false;
    for (const filterValue of filterValueList) {
      if (typeof filterValue === 'string') {
        found = this.handleStringMatch(row, filterValue);
      } else {
        found = this.handleObjectMatch(row, filterValue);
      }
      if (!found) {
        break;
      }
    }
    return found;
  }

  handleStringMatch(row: unknown, filterValue: string): boolean {
    let isMatchText = false;
    this.config.columns.forEach(column => {
      const valueExtractor = column.value;
      const filteringPreprocessorFn = column.filteringPreprocessorFn;
      if (this.isPropertyValue(valueExtractor)) {
        isMatchText =
          isMatchText ||
          (valueExtractor as PropertyValue)
            .getValue(row)
            .toString()
            .toLocaleLowerCase()
            .includes(filterValue);
      }
      if (this.isLinkValue(valueExtractor)) {
        isMatchText =
          isMatchText ||
          (valueExtractor as LinkValue)
            .getValue(row)
            .toString()
            .toLocaleLowerCase()
            .includes(filterValue);
      }
      if (this.isMemoryValue(valueExtractor)) {
        isMatchText =
          isMatchText ||
          (valueExtractor as MemoryValue)
            .getViewValue(row)
            .toString()
            .toLocaleLowerCase()
            .includes(filterValue);
      }
      if (this.isDateTimeValue(valueExtractor)) {
        isMatchText =
          isMatchText ||
          (valueExtractor as DateTimeValue)
            .getValue(row)
            .toString()
            .toLocaleLowerCase()
            .includes(filterValue) ||
          this.dtService
            .distanceInWords((valueExtractor as DateTimeValue).getValue(row))
            .toString()
            .toLocaleLowerCase()
            .includes(filterValue);
      }
      if (this.isStatusValue(valueExtractor)) {
        isMatchText =
          isMatchText ||
          (valueExtractor as StatusValue)
            .getPhase(row)
            .toString()
            .toLocaleLowerCase()
            .includes(filterValue) ||
          (valueExtractor as StatusValue)
            .getMessage(row)
            .toString()
            .toLocaleLowerCase()
            .includes(filterValue);
      }
      if (
        this.isComponentValue(valueExtractor) &&
        filteringPreprocessorFn !== undefined
      ) {
        isMatchText =
          isMatchText ||
          filteringPreprocessorFn(row)
            .toString()
            .toLocaleLowerCase()
            .includes(filterValue);
      }
    });

    return isMatchText;
  }

  handleObjectMatch(row: unknown, filterValue: string): boolean {
    let isValid = false;
    let isMatchObj = true;
    Object.keys(filterValue).forEach(element => {
      let filteringPreprocessorFn;
      let valueExtractor;
      this.config.columns.forEach(column => {
        if (
          column.matHeaderCellDef.toLocaleLowerCase() === element &&
          !this.isMenuValue(column.value) &&
          !this.isActionListValue(column.value) &&
          !(
            this.isComponentValue(column.value) &&
            column.filteringPreprocessorFn === undefined
          )
        ) {
          valueExtractor = column.value;
          filteringPreprocessorFn = column.filteringPreprocessorFn;
          isValid = true;
        }
      });
      if (isValid) {
        if (this.isPropertyValue(valueExtractor)) {
          if (filterValue[element] === '""') {
            isMatchObj =
              isMatchObj && valueExtractor.getValue(row).length === 0;
          } else {
            isMatchObj =
              isMatchObj &&
              valueExtractor
                .getValue(row)
                .toString()
                .toLocaleLowerCase()
                .includes(filterValue[element]);
          }
        }
        if (this.isLinkValue(valueExtractor)) {
          if (filterValue[element] === '""') {
            isMatchObj =
              isMatchObj && valueExtractor.getValue(row).length === 0;
          } else {
            isMatchObj =
              isMatchObj &&
              valueExtractor
                .getValue(row)
                .toString()
                .toLocaleLowerCase()
                .includes(filterValue[element]);
          }
        }
        if (this.isMemoryValue(valueExtractor)) {
          if (filterValue[element] === '""') {
            isMatchObj =
              isMatchObj && valueExtractor.getViewValue(row).length === 0;
          } else {
            isMatchObj =
              isMatchObj &&
              valueExtractor
                .getViewValue(row)
                .toString()
                .toLocaleLowerCase()
                .includes(filterValue[element]);
          }
        }
        if (this.isDateTimeValue(valueExtractor)) {
          if (filterValue[element] === '-') {
            isMatchObj =
              isMatchObj && valueExtractor.getValue(row).length === 0;
          } else {
            isMatchObj =
              isMatchObj &&
              (valueExtractor
                .getValue(row)
                .toString()
                .toLocaleLowerCase()
                .includes(filterValue[element]) ||
                this.dtService
                  .distanceInWords(valueExtractor.getValue(row))
                  .toString()
                  .toLocaleLowerCase()
                  .includes(filterValue[element]));
          }
        }
        if (this.isStatusValue(valueExtractor)) {
          isMatchObj =
            isMatchObj &&
            (valueExtractor
              .getPhase(row)
              .toString()
              .toLocaleLowerCase()
              .includes(filterValue[element]) ||
              valueExtractor
                .getMessage(row)
                .toString()
                .toLocaleLowerCase()
                .includes(filterValue[element]));
        }
        if (this.isComponentValue(valueExtractor)) {
          isMatchObj =
            isMatchObj &&
            filteringPreprocessorFn(row)
              .toString()
              .toLocaleLowerCase()
              .includes(filterValue[element]);
        }
      } else {
        isMatchObj = false;
      }
    });

    return isMatchObj;
  }

  add(event: MatChipInputEvent): void {
    const chip = (event.value || '').trim();
    if (chip.indexOf(':') > -1) {
      if (chip.split(':')[1].length !== 0) {
        this.chips.push(chip);
        this.isClear = true;
        this.chipCtrl.setValue(null);
        this.editFilter(chip);

        this.clearInputValue();
      }
    } else if (chip) {
      this.chips.push(chip);
      this.isClear = true;
      this.chipCtrl.setValue(null);
      this.editFilter(chip);

      this.clearInputValue();
    }
    this.resetPaginator();
  }

  remove(chip: string): void {
    const index = this.chips.indexOf(chip);

    if (index >= 0) {
      this.chips.splice(index, 1);
      this.autocomplete.closePanel();
      this.chipList = [];
      if (this.chips.length === 0) {
        if (this.chipCtrl.value === null) {
          this.isClear = false;
        } else {
          this.isClear = true;
        }
        this.dataSource.filter = '';
      } else {
        this.chips.forEach(chipValue => {
          this.editFilter(chipValue);
        });
      }
    }
    this.resetPaginator();
  }

  editFilter(filterValue: string) {
    if (filterValue.indexOf(':') > -1) {
      const myHeader = filterValue.substring(0, filterValue.indexOf(':'));
      const myFilter = filterValue.substring(filterValue.indexOf(':') + 1);
      const obj = {};
      obj[myHeader.trim().toLocaleLowerCase()] = myFilter.trim().toLowerCase();
      this.chipList.push(obj);
    } else {
      this.chipList.push(filterValue.trim().toLowerCase());
    }

    const jsonString = JSON.stringify(this.chipList);
    this.dataSource.filter = jsonString;
  }

  clear() {
    this.chips = [];
    this.chipList = [];
    this.chipCtrl.setValue(null);
    this.dataSource.filter = '';
    this.clearInputValue();
    this.isClear = false;
    this.resetPaginator();
  }

  blurInput(value: HTMLTextAreaElement) {
    setTimeout(() => {
      value.blur();
    });
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.chipInput.nativeElement.value = event.option.viewValue.concat(': ');
    this.isClear = true;
  }

  // Clear the input value
  clearInputValue() {
    this.chipInput.nativeElement.value = '';
  }

  // Reset paginator
  resetPaginator() {
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private filter(value: string | null): { title: string }[] {
    if (value === null) {
      return this.headers.slice();
    }
    const filterValue = value.toLowerCase();

    return this.headers.filter(chip =>
      chip.title.toLowerCase().includes(filterValue),
    );
  }

  highlightRow(row: unknown, highlightedRow: unknown): string {
    try {
      return isEqual(row, highlightedRow) ? 'highlight-row' : '';
    } catch (error) {
      console.error(error);
      return '';
    }
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

  public isLinkValue(obj) {
    return obj instanceof LinkValue;
  }

  public isDateTimeValue(obj) {
    return obj instanceof DateTimeValue;
  }

  public isMemoryValue(obj) {
    return obj instanceof MemoryValue;
  }

  public actionTriggered(e: ActionEvent) {
    // Forward the emitted ActionEvent
    if (e instanceof ActionEvent) {
      this.actionsEmitter.emit(e);
    }
  }

  public newButtonTriggered() {
    const ev = new ActionEvent('newResourceButton', {});
    this.actionsEmitter.emit(ev);
  }

  public linkClicked(col: string, data: any, event: Event) {
    const ev = new ActionEvent(`${col}:link`, data, event);
    this.actionsEmitter.emit(ev);
  }

  get tableTheme(): TABLE_THEME {
    if (!this.config || !this.config.theme) {
      return TABLE_THEME.CARD;
    }

    return this.config.theme;
  }
}
