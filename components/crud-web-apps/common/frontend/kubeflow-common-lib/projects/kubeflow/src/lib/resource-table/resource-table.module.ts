import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceTableComponent } from './resource-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StatusComponent } from './status/status.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActionComponent } from './action/action.component';
import { MatChipsModule } from '@angular/material/chips';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActionButtonComponent } from './action-button/action-button.component';
import { IconModule } from '../icon/icon.module';
import { TableComponent } from './table/table.component';
import { DateTimeModule } from '../date-time/date-time.module';
import { PopoverModule } from '../popover/popover.module';
import { TableChipsListComponent } from './chips-list/chips-list.component';
import { ComponentValueComponent } from './component-value/component-value.component';
import { PortalModule } from '@angular/cdk/portal';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { HelpPopoverModule } from '../help-popover/help-popover.module';
import { RouterModule } from '@angular/router';
import { StatusIconModule } from '../status-icon/status-icon.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatMenuModule,
    MatPaginatorModule,
    PortalModule,
    FontAwesomeModule,
    MatIconModule,
    IconModule,
    DateTimeModule,
    PopoverModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSelectModule,
    HelpPopoverModule,
    RouterModule,
    StatusIconModule,
  ],
  declarations: [
    ResourceTableComponent,
    StatusComponent,
    ActionComponent,
    ActionButtonComponent,
    TableChipsListComponent,
    TableComponent,
    ComponentValueComponent,
  ],
  exports: [ResourceTableComponent, TableComponent, ActionComponent],
})
export class ResourceTableModule {}
