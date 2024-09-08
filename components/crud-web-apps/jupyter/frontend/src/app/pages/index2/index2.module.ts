import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
// import { IndexRokModule } from '../index2/index-rok/index-rok.module';
import { IndexComponent2 } from './index2.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatDialogModule } from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { KubeflowModule } from 'kubeflow';
import { IndexDefaultModule2 } from './index-default2/index-default2.module';

@NgModule({
  declarations: [IndexComponent2],
  imports: [
    CommonModule,
    // IndexRokModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    KubeflowModule,
    MatFormFieldModule,
    MatChipsModule,
    IndexDefaultModule2,
  
  ],
})
export class IndexModule2 {}
