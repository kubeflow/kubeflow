import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexDefaultComponent } from './pages/index/index-default/index-default.component';
import { VolumeDetailsPageComponent } from './pages/volume-details-page/volume-details-page.component';

const routes: Routes = [
  { path: '', component: IndexDefaultComponent },
  {
    path: 'volume/details/:namespace/:pvcName',
    component: VolumeDetailsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
