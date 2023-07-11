import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { VolumeDetailsPageComponent } from './pages/volume-details-page/volume-details-page.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
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
