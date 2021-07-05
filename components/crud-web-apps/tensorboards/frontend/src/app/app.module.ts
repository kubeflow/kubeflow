import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ErrorStateMatcher,
  MatRadioModule,
  MatInputModule,
} from '@angular/material';

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

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ImmediateErrorStateMatcher },
  ],
  bootstrap: [AppComponent],
  entryComponents: [FormComponent],
})
export class AppModule {}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'static/assets/i18n/', '.json');
}
