import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { DatasetDetailComponent } from "./dataset-detail/dataset-detail.component";

const routes: Routes = [
  { path: "detail/:id1/:id2", component: DatasetDetailComponent },
  { path: "detail/:id", component: DatasetDetailComponent },
  { path: "", component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
