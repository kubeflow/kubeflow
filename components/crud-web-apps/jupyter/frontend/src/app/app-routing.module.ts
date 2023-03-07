import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormNewComponent } from './pages/form/form-new/form-new.component';
import { IndexDefaultComponent } from './pages/index/index-default/index-default.component';
import { NotebookPageComponent } from './pages/notebook-page/notebook-page.component';

const routes: Routes = [
  { path: '', component: IndexDefaultComponent },
  { path: 'new', component: FormNewComponent },
  {
    path: 'notebook/details/:namespace/:notebookName',
    component: NotebookPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
