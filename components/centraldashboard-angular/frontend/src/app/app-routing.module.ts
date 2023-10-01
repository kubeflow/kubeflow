import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IframeGuard } from './guards/iframe.guard';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { IframeWrapperComponent } from './pages/iframe-wrapper/iframe-wrapper.component';
import { NamespaceNeededPageComponent } from './pages/namespace-needed-page/namespace-needed-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: '_',
    component: IframeWrapperComponent,
    children: [
      {
        path: '**',
        component: IframeWrapperComponent,
      },
    ],
    canActivateChild: [IframeGuard],
  },
  { path: 'namespace-needed', component: NamespaceNeededPageComponent },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
