import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NamespaceSelectModule } from './namespace-select/namespace-select.module';
import { ResourceTableModule } from './resource-table/resource-table.module';
import { SnackBarModule } from './snack-bar/snack-bar.module';
import { FormModule } from './form/form.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeadersInterceptor } from './services/rok/injector';

@NgModule({
  declarations: [],
  exports: [
    NamespaceSelectModule,
    ResourceTableModule,
    SnackBarModule,
    FormModule,
    HttpClientModule,
  ],
  imports: [CommonModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
  ],
})
export class KubeflowModule {}
