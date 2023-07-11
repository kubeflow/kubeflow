import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IndexModule } from './pages/index/index.module';
import { KubeflowModule } from 'kubeflow';

import { HttpClientModule } from '@angular/common/http';
import { NotebookPageModule } from './pages/notebook-page/notebook-page.module';
import { FormNewModule } from './pages/form/form-new/form-new.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    KubeflowModule,
    IndexModule,
    NotebookPageModule,
    FormNewModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
