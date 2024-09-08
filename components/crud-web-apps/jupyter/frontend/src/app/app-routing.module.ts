import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormNewComponent } from './pages/form/form-new/form-new.component';
import { IndexDefaultComponent } from './pages/index/index-default/index-default.component';
import { NotebookPageComponent } from './pages/notebook-page/notebook-page.component';
/* Lance begin 20240908 */
import { IndexComponent2 } from './pages/index2/index2.component';
/* Lance end 20240908 */

const routes: Routes = [
  { path: '', component: IndexDefaultComponent },
  { path: 'new', component: FormNewComponent },
  {
    path: 'notebook/details/:namespace/:notebookName',
    component: NotebookPageComponent,
  },
  /* Lance begin 20240908 */
  { path: 'notebook/auto-start/:namespace/:notebook_name/view', component: IndexComponent2},
  { path: 'notebook/auto-start/:namespace/:notebook_name', component: IndexComponent2},
  /* Lance end 20240908 */
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
