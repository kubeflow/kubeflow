import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './pages/index/index.component';
import { FormNewComponent } from './pages/form/form-new/form-new.component';
import { NotebookPageComponent } from './pages/notebook-page/notebook-page.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
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
