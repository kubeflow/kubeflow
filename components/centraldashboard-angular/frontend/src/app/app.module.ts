import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import { SvgIconsService } from './services/svg-icons.service';
import { NamespaceNeededPageComponent } from './pages/namespace-needed-page/namespace-needed-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

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
    NamespaceNeededPageComponent,
    NotFoundPageComponent,
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
    {
      provide: APP_INITIALIZER,
      useFactory: (sis: SvgIconsService) => () => sis.init(),
      deps: [SvgIconsService],
      multi: true,
    },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: CdbSnackBarConfig },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
