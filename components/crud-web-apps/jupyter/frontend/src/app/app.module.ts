import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IndexModule } from './pages/index/index.module';
import { FormModule } from './pages/form/form.module';
import { KubeflowModule } from 'kubeflow';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NotebookPageModule } from './pages/notebook-page/notebook-page.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    KubeflowModule,
    IndexModule,
    FormModule,
    NotebookPageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
