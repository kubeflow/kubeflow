import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrlsComponent } from './urls.component';

@NgModule({
  declarations: [UrlsComponent],
  imports: [CommonModule],
  exports: [UrlsComponent],
})
export class UrlsModule {}
