import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageModule } from './pages/main-page/main-page.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { IframeWrapperComponent } from './pages/iframe-wrapper/iframe-wrapper.component';
import { SafePipe } from './pipes/safe.pipe';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SnackBarModule } from 'kubeflow';
import {
  MatSnackBarConfig,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { ErrorInterceptor } from './interceptors/error.interceptor';

/**
 * MAT_SNACK_BAR_DEFAULT_OPTIONS values can be found
 * here:
 * https://github.com/angular/components/blob/main/src/material/snack-bar/snack-bar-config.ts#L25-L58
 */
const CdbSnackBarConfig: MatSnackBarConfig = {
  duration: 3000,
  horizontalPosition: 'left',
  panelClass: 'cdb-snackbar',
};

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    IframeWrapperComponent,
    SafePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainPageModule,
    HttpClientModule,
    SnackBarModule,
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: CdbSnackBarConfig },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
