import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PublisheddataDetailsComponent } from './publisheddata-details/publisheddata-details.component';

const routes: Routes = [
  { path: 'detail/:id1/:id2', component: PublisheddataDetailsComponent },
  { path: 'detail/:id', component: PublisheddataDetailsComponent },
  { path: '', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
