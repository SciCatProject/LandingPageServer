import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from './modules/table/table.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, PipesModule, TableModule],
  exports: [PipesModule, TableModule],
})
export class SharedModule {}
