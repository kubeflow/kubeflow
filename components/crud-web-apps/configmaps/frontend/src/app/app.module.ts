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

import { IndexComponent } from './pages/index/index.component';
import { FormDefaultComponent } from './pages/form/form-default/form-default.component';
import { IndexDefaultComponent } from './pages/index/index-default/index-default.component';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { YamlsModule } from './pages/form/yamls/yamls.module';
import { ListKeyValueModule } from './pages/form/list-key-value/list-key-value.module';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    FormDefaultComponent,
    IndexDefaultComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ResourceTableModule,
    NamespaceSelectModule,
    ConfirmDialogModule,
    FormModule,
    MatTabsModule,
    MatCheckboxModule,
    YamlsModule,
    ListKeyValueModule,
    KubeflowModule,
    HttpClientModule,
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ImmediateErrorStateMatcher },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
