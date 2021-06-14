import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PublisheddataDetailsComponent } from "./publisheddata-details.component";

const routes: Routes = [
  {
    path: "",
    component: PublisheddataDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublisheddataDetailsRoutingModule {}
