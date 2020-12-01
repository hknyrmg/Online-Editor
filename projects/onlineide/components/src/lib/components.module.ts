import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DropdownComponent } from './dropdown/dropdown.component';

// anguşlar material modules
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ButtonToggleComponent } from './button-toggle/button-toggle.component';
import { CodeProblemFieldComponent } from './code-problem-field/code-problem-field.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DialogWindowComponent } from './dialog-window/dialog-window.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [DropdownComponent, ButtonToggleComponent, CodeProblemFieldComponent, DialogWindowComponent],
  imports: [CommonModule,
    BrowserModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule
  ],
  exports: [DropdownComponent, ButtonToggleComponent, CodeProblemFieldComponent, DialogWindowComponent]
})
export class IdeComponentsModule { }
