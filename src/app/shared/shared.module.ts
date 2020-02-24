import { DialogModule } from "./modules/dialog/dialog.module";
import { ErrorPageModule } from "./modules/error-page/error-page.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { PipesModule } from "./pipes/pipes.module";
import { TableModule } from "./modules/table/table.module";
import { SearchBarModule } from "./modules/search-bar/search-bar.module";

@NgModule({
  imports: [
    ErrorPageModule,
    FormsModule,
    DialogModule,
    ReactiveFormsModule,
    PipesModule,
    SearchBarModule,
    TableModule
  ],
  declarations: [],
  providers: [],
  exports: [
    DialogModule,
    ErrorPageModule,
    PipesModule,
    SearchBarModule,
    TableModule
  ]
})
export class SharedCatanieModule {}
