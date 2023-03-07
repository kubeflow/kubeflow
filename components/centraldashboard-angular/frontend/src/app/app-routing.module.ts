import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { IframeWrapperComponent } from './pages/iframe-wrapper/iframe-wrapper.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: '**', component: IframeWrapperComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
