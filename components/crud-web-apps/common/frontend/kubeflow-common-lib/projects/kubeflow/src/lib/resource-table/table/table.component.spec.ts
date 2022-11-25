import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { ResourceTableModule } from '../resource-table.module';
import { quantityToScalar } from '@kubernetes/client-node/dist/util';
import {
  PropertyValue,
  DateTimeValue,
  StatusValue,
  ComponentValue,
} from '../types';
import { MatChipInputEvent } from '@angular/material/chips';
import { TableColumnComponent } from '../component-value/component-value.component';
import { Component, SimpleChange } from '@angular/core';
import subMonths from 'date-fns/sub_months';
import { cloneDeep } from 'lodash-es';

@Component({
  selector: 'lib-server-type',
  template: ``,
})
export class ServerTypeComponent implements TableColumnComponent {
  constructor() {}

  notebookServerType: string;

  set element(notebook) {
    this.notebookServerType = notebook.serverType;
  }
}

const tableConfig = {
  title: 'test',
  columns: [
    {
      matHeaderCellDef: `Status`,
      matColumnDef: 'status',
      value: new StatusValue(),
    },
    {
      matHeaderCellDef: `Name`,
      matColumnDef: 'name',
      value: new PropertyValue({
        field: 'name',
        tooltipField: 'name',
        truncate: true,
      }),
    },
    {
      matHeaderCellDef: `Type`,
      matColumnDef: 'type',
      value: new ComponentValue({
        component: ServerTypeComponent,
      }),
      filteringPreprocessorFn: element => element.serverType,
    },
    {
      matHeaderCellDef: `Created at`,
      matColumnDef: 'age',
      value: new DateTimeValue({ field: 'age' }),
    },
  ],
};

const tableData = [
  {
    status: {
      phase: 'ready',
      message: 'Running',
    },
    name: 'a-notebook',
    serverType: 'jupyter',
    age: '2022-02-25T16:57:23Z',
  },
  {
    status: {
      phase: 'stopped',
      message: 'No Pods are currently running for this Notebook Server.',
    },
    name: 'b-notebook',
    serverType: 'group-one',
    age: '2022-01-23T14:51:29Z',
  },
];

function checkCell(compiled) {
  const nameCell = compiled.querySelector(
    '[data-cy-resource-table-row="Name"]',
  );
  expect(nameCell.textContent.replace(/\s+/g, '')).toBe('b-notebook');
}

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ResourceTableModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;

    component.config = { title: 'test', columns: [] };
    component.data = [];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort property values', () => {
    component.config = {
      title: 'test',
      columns: [
        {
          matHeaderCellDef: `Name`,
          matColumnDef: 'name',
          value: new PropertyValue({
            field: 'name',
            tooltipField: 'name',
            truncate: true,
          }),
          sort: true,
        },
      ],
    };
    component.data = [{ name: 'a-notebook' }, { name: 'b-notebook' }];
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const button = compiled.querySelector('[data-cy-table-header-row="Name"]');
    button.click();
    const columnCells = compiled.querySelectorAll(
      '[data-cy-resource-table-row="Name"]',
    );

    // after click on the first element, detect the changes to ensure sorting took place
    fixture.detectChanges();

    // your assertions, i.e. expect to see the first element being sorted in the table
    expect(columnCells[0].textContent.replace(/\s+/g, '')).toBe('b-notebook');
  });

  it('should sort date values', () => {
    component.config = {
      title: 'test',
      columns: [
        {
          matHeaderCellDef: `Created at`,
          matColumnDef: 'age',
          value: new DateTimeValue({ field: 'age' }),
          sort: true,
        },
      ],
    };
    component.data = [
      { age: '2022-02-18T14:35:51Z' },
      { age: '2022-02-25T16:57:23Z' },
    ];
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const button = compiled.querySelector(
      '[data-cy-table-header-row="Created at"]',
    );
    button.click();
    button.click();
    const columnCells = compiled.querySelectorAll(
      '[data-cy-resource-table-row="Created at"]',
    );

    // after click on the first element, detect the changes to ensure sorting took place
    fixture.detectChanges();

    // your assertions, i.e. expect to see the first element being sorted in the table
    expect(columnCells[0].attributes['data-cy-timestamp'].nodeValue).toBe(
      '2022-02-25T16:57:23Z',
    );
  });

  it('should sort number values', () => {
    component.config = {
      title: 'test',
      columns: [
        {
          matHeaderCellDef: `CPUs`,
          matColumnDef: 'cpu',
          value: new PropertyValue({ field: 'cpu' }),
          sort: true,
          sortingPreprocessorFn: quantityToScalar,
        },
      ],
    };
    component.data = [{ cpu: '500m' }, { cpu: '1' }];
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const button = compiled.querySelector('[data-cy-table-header-row="CPUs"]');
    button.click();
    button.click();
    const columnCells = compiled.querySelectorAll(
      '[data-cy-resource-table-row="CPUs"]',
    );

    // after click on the first element, detect the changes to ensure sorting took place
    fixture.detectChanges();

    // your assertions, i.e. expect to see the first element being sorted in the table
    expect(columnCells[0].textContent.replace(/\s+/g, '')).toBe('1');
  });

  it('should filter property values based on all columns', () => {
    component.config = tableConfig;
    component.data = tableData;

    const compiled = fixture.debugElement.nativeElement;
    const inputElement = compiled.querySelector('#filterInput');
    component.add({
      input: inputElement,
      value: 'b-not',
    } as MatChipInputEvent);

    fixture.detectChanges();

    checkCell(compiled);
  });

  it('should filter property values based on one column', () => {
    component.config = tableConfig;
    component.data = tableData;

    const compiled = fixture.debugElement.nativeElement;
    const inputElement = compiled.querySelector('#filterInput');
    component.add({
      input: inputElement,
      value: 'Name: b-not',
    } as MatChipInputEvent);

    fixture.detectChanges();

    checkCell(compiled);
  });

  it('should filter date values based on one column using UTC timestamp', () => {
    component.config = tableConfig;
    component.data = tableData;

    const compiled = fixture.debugElement.nativeElement;
    const inputElement = compiled.querySelector('#filterInput');
    component.add({
      input: inputElement,
      value: 'Created at: 2022-01-23',
    } as MatChipInputEvent);

    fixture.detectChanges();

    checkCell(compiled);
  });

  it('should filter date values based on one column using X months ago', () => {
    component.config = tableConfig;
    const tableDataCopy = cloneDeep(tableData);
    tableDataCopy[1].age = subMonths(new Date(), 2).toISOString();
    component.data = tableDataCopy;

    const compiled = fixture.debugElement.nativeElement;
    const inputElement = compiled.querySelector('#filterInput');
    component.add({
      input: inputElement,
      value: 'Created at: 2 months ago',
    } as MatChipInputEvent);

    fixture.detectChanges();

    checkCell(compiled);
  });

  it('should filter component values based on one column', () => {
    component.config = tableConfig;
    component.data = tableData;

    const compiled = fixture.debugElement.nativeElement;
    const inputElement = compiled.querySelector('#filterInput');
    component.add({
      input: inputElement,
      value: 'Type: group',
    } as MatChipInputEvent);

    fixture.detectChanges();

    checkCell(compiled);
  });

  it('should filter status values based on one column using status phase', () => {
    component.config = tableConfig;
    component.data = tableData;

    const compiled = fixture.debugElement.nativeElement;
    const inputElement = compiled.querySelector('#filterInput');
    component.add({
      input: inputElement,
      value: 'Status: stopped',
    } as MatChipInputEvent);

    fixture.detectChanges();

    checkCell(compiled);
  });

  it('should filter status values based on one column using status message', () => {
    component.config = tableConfig;
    component.data = tableData;

    const compiled = fixture.debugElement.nativeElement;
    const inputElement = compiled.querySelector('#filterInput');
    component.add({
      input: inputElement,
      value: 'Status: No Pods',
    } as MatChipInputEvent);

    fixture.detectChanges();

    checkCell(compiled);
  });

  it('should properly configure filter section', () => {
    component.config = tableConfig;

    expect(component.filteredHeaders).toEqual([]);
    expect(component.showStatus).toEqual(false);
    expect(component.showDate).toEqual(false);

    fixture.detectChanges();
    component.ngOnChanges({
      config: new SimpleChange(null, component.config, true),
    });

    expect(component.filteredHeaders).toEqual([
      { title: 'Status' },
      { title: 'Name' },
      { title: 'Type' },
      { title: 'Created at' },
    ]);
    expect(component.showStatus).toEqual(true);
    expect(component.showDate).toEqual(true);

    const configCopy = cloneDeep(tableConfig);
    configCopy.columns.pop();
    component.ngOnChanges({
      config: new SimpleChange(null, configCopy, false),
    });

    expect(component.filteredHeaders).toEqual([
      { title: 'Status' },
      { title: 'Name' },
      { title: 'Type' },
    ]);
    expect(component.showStatus).toEqual(true);
    expect(component.showDate).toEqual(false);
  });
});
