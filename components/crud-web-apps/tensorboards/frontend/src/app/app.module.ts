import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

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

import { IndexComponent } from './pages/index/index.component';
import { FormComponent } from './pages/form/form.component';
import { FormConfigurationsModule } from './pages/form/form-configurations/form-configurations.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {
  MatSnackBarConfig,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';

/**
 * MAT_SNACK_BAR_DEFAULT_OPTIONS values can be found
 * here:
 * https://github.com/angular/components/blob/main/src/material/snack-bar/snack-bar-config.ts#L25-L58
 */
const TwaSnackBarConfig: MatSnackBarConfig = {
  duration: 2000,
};
@NgModule({
  declarations: [AppComponent, IndexComponent, FormComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    KubeflowModule,
    ResourceTableModule,
    NamespaceSelectModule,
    ConfirmDialogModule,
    MatRadioModule,
    MatInputModule,
    FormModule,
    KubeflowModule,
    HttpClientModule,
    FormConfigurationsModule,
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ImmediateErrorStateMatcher },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: TwaSnackBarConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
