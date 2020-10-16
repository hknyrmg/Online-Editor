import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DropdownComponent } from './dropdown/dropdown.component';

// anguşlar material modules
import {MatSelectModule} from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ButtonToggleComponent } from './button-toggle/button-toggle.component';

@NgModule({
  declarations: [  DropdownComponent, ButtonToggleComponent],
  imports: [CommonModule,
    BrowserModule,
    MatSelectModule,
    MatButtonToggleModule
  ],
  exports: [ DropdownComponent, ButtonToggleComponent]
})
export class IdeComponentsModule { }
