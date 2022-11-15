import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { ResourceTableModule } from '../resource-table.module';
import { PropertyValue, DateTimeValue } from '../types';
import { quantityToScalar } from '@kubernetes/client-node/dist/util';

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
});
