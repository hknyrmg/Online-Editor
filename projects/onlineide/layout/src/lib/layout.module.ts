import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainHeaderComponent } from './main-layout/main-header/main-header.component';



@NgModule({
  declarations: [MainHeaderComponent],
  imports: [CommonModule
  ],
  exports: [MainHeaderComponent]
})
export class IdeLayoutModule { }
