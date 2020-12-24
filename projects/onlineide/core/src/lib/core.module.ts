import { NgModule } from '@angular/core';
import { ChangeClassDirective } from './Directives/change-class.directive';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ChangeClassDirective],
  imports: [
    RouterModule
  ],
  exports: [ChangeClassDirective]
})
export class CoreModule { }
