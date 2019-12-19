import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { PublishedDataDetailComponent } from "./publisheddata-detail/publisheddata-detail.component";

const routes: Routes = [
  { path: "^/detail/:id(.*//.*)", component: PublishedDataDetailComponent },
  { path: "detail/:id", component: PublishedDataDetailComponent },
  { path: "", component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
