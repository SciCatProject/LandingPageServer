import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "detail/:id1/:id2",
    loadChildren: () =>
      import("./publisheddata-details/publisheddata-details.module").then(
        (m) => m.PublisheddataDetailsModule
      ),
  },
  {
    path: "detail/:id",
    loadChildren: () =>
      import("./publisheddata-details/publisheddata-details.module").then(
        (m) => m.PublisheddataDetailsModule
      ),
  },
  {
    path: "",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
