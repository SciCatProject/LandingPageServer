import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleCasePipe } from './title-case.pipe';
import { FileSizePipe } from './filesize.pipe';

@NgModule({
  declarations: [FileSizePipe, TitleCasePipe],
  imports: [CommonModule],
  exports: [FileSizePipe, TitleCasePipe],
})
export class PipesModule {}
