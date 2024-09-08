import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { KubeflowModule } from 'kubeflow';

import { HttpClientModule } from '@angular/common/http';
import { NotebookPageModule } from './pages/notebook-page/notebook-page.module';
import { FormNewModule } from './pages/form/form-new/form-new.module';
import {
  MatSnackBarConfig,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { IndexDefaultModule } from './pages/index/index-default/index-default.module';
import {MatDialogModule } from '@angular/material/dialog';
/* Lance begin 20240908 */
import { IndexModule2 } from './pages/index2/index2.module';
/* Lance end 20240908 */

/**
 * MAT_SNACK_BAR_DEFAULT_OPTIONS values can be found
 * here
 * https://github.com/angular/components/blob/main/src/material/snack-bar/snack-bar-config.ts#L25-L58
 */
const JwaSnackBarConfig: MatSnackBarConfig = {
  duration: 3000,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    KubeflowModule,
    NotebookPageModule,
    FormNewModule,
    IndexDefaultModule,
    MatDialogModule,
    /* Lance begin 20240908 */
    IndexModule2,
    /* Lance end 20240908 */
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: JwaSnackBarConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
