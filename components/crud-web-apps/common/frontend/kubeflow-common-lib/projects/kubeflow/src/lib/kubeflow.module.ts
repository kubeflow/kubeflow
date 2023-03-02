import '@angular/localize/init';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NamespaceSelectModule } from './namespace-select/namespace-select.module';
import { ResourceTableModule } from './resource-table/resource-table.module';
import { SnackBarModule } from './snack-bar/snack-bar.module';
import { FormModule } from './form/form.module';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClientXsrfModule,
} from '@angular/common/http';
import { HeadersInterceptor } from './services/rok/injector';
import { PopoverModule } from './popover/popover.module';
import { TitleActionsToolbarModule } from './title-actions-toolbar/title-actions-toolbar.module';
import { ConditionsTableModule } from './conditions-table/conditions-table.module';
import { DetailsListModule } from './details-list/details-list.module';
import { DateTimeModule } from './date-time/date-time.module';
import { PanelModule } from './panel/panel.module';
import { LoadingSpinnerModule } from './loading-spinner/loading-spinner.module';
import { ConfirmDialogModule } from './confirm-dialog/confirm-dialog.module';
import { EditorModule } from './editor/editor.module';
import { HelpPopoverModule } from './help-popover/help-popover.module';
import { StatusIconModule } from './status-icon/status-icon.module';

@NgModule({
  declarations: [],
  exports: [
    NamespaceSelectModule,
    ResourceTableModule,
    SnackBarModule,
    FormModule,
    PopoverModule,
    ConfirmDialogModule,
    HttpClientModule,
    HttpClientXsrfModule,
    TitleActionsToolbarModule,
    ConditionsTableModule,
    DetailsListModule,
    DateTimeModule,
    PanelModule,
    LoadingSpinnerModule,
    EditorModule,
    HelpPopoverModule,
    StatusIconModule,
  ],
  imports: [CommonModule, HttpClientModule, HttpClientXsrfModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
  ],
})
export class KubeflowModule {}
