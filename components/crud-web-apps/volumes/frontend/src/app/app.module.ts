import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorStateMatcher } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  ResourceTableModule,
  NamespaceSelectModule,
  ConfirmDialogModule,
  FormModule,
  ImmediateErrorStateMatcher,
  KubeflowModule,
} from 'kubeflow';

import { FormDefaultComponent } from './pages/form/form-default/form-default.component';
import { IndexDefaultComponent } from './pages/index/index-default/index-default.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { VolumeDetailsPageModule } from './pages/volume-details-page/volume-details-page.module';
import { ColumnsModule } from './pages/index/columns/columns.module';
import {
  MatSnackBarConfig,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';

/**
 * MAT_SNACK_BAR_DEFAULT_OPTIONS values can be found
 * here
 * https://github.com/angular/components/blob/main/src/material/snack-bar/snack-bar-config.ts#L25-L58
 */
const VwaSnackBarConfig: MatSnackBarConfig = {
  duration: 3000,
};

@NgModule({
  declarations: [AppComponent, FormDefaultComponent, IndexDefaultComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ResourceTableModule,
    NamespaceSelectModule,
    ConfirmDialogModule,
    FormModule,
    KubeflowModule,
    HttpClientModule,
    VolumeDetailsPageModule,
    ColumnsModule,
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ImmediateErrorStateMatcher },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: VwaSnackBarConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
