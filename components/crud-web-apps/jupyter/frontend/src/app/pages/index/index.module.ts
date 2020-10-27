import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRokModule } from './index-rok/index-rok.module';
import { IndexDefaultModule } from './index-default/index-default.module';
import { IndexComponent } from './index.component';

@NgModule({
  declarations: [IndexComponent],
  imports: [CommonModule, IndexRokModule, IndexDefaultModule],
})
export class IndexModule {}
