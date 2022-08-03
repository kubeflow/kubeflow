import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './pages/index/index.component';
import { FormDefaultComponent } from './pages/form/form-default/form-default.component';
import { NotebookPageComponent } from './pages/notebook-page/notebook-page.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'new', component: FormDefaultComponent },
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
