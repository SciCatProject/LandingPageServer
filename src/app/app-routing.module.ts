import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { DatasetDetailComponent } from "./dataset-detail/dataset-detail.component";
import { APP_DI_CONFIG } from "./app-config.module";
import { PublishedDataDetailComponent } from "./publisheddata-detail/publisheddata-detail.component";

let routes: Routes;
if (APP_DI_CONFIG.useMaterialView) {
  routes = [
    { path: "^/detail/:id(.*//.*)", component: DatasetDetailComponent },
    { path: "detail/:id", component: DatasetDetailComponent },
    { path: "", component: DashboardComponent }
  ];
} else {
  routes = [
    { path: "^/detail/:id(.*//.*)", component: PublishedDataDetailComponent },
    { path: "detail/:id", component: PublishedDataDetailComponent },
    { path: "", component: DashboardComponent }
  ];
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
