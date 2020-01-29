import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { DatasetDetailComponent } from "./dataset-detail/dataset-detail.component";
import { APP_DI_CONFIG } from "./app-config.module";
import { PublishedDataDetailComponent } from "./publisheddata-detail/publisheddata-detail.component";

const getComponent = () => {
  if (APP_DI_CONFIG.useMaterialView) {
    return DatasetDetailComponent;
  } else {
    return PublishedDataDetailComponent;
  }
};

const routes: Routes = [
  { path: "detail/:id1/:id2", component: getComponent() },
  { path: "detail/:id", component: getComponent() },
  { path: "", component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
