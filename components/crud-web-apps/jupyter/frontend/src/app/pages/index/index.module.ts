import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { IndexRokModule } from './index-rok/index-rok.module';
import { IndexDefaultModule } from './index-default/index-default.module';
import { IndexComponent } from './index.component';
import { ServerTypeComponent } from './index-default/server-type/server-type.component';

@NgModule({
  declarations: [IndexComponent, ServerTypeComponent],
  imports: [CommonModule, IndexRokModule, IndexDefaultModule, MatIconModule],
  entryComponents: [ServerTypeComponent],
})
export class IndexModule {}
