import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TitleCasePipe } from "./title-case.pipe";
import { FileSizePipe } from "./filesize.pipe";
import { DescriptionTitlePipe } from "./description-title.pipe";

@NgModule({
  declarations: [DescriptionTitlePipe, FileSizePipe, TitleCasePipe],
  imports: [CommonModule],
  exports: [DescriptionTitlePipe, FileSizePipe, TitleCasePipe],
})
export class PipesModule {}
