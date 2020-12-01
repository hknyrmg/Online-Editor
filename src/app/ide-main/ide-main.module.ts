import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { IdeComponentsModule } from '@onlineide/components';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { HttpClientModule } from '@angular/common/http';

// angular material modules


import { AppRoutingModule } from '../app-routing.module';
import { IdeLayoutModule } from '@onlineide/layout';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    
  MainPageComponent],
  imports: [
    BrowserModule,
    RouterModule,
    CommonModule,
    FormsModule,
    IdeComponentsModule,
    HttpClientModule,
    AppRoutingModule, 
    IdeLayoutModule,
    MatButtonModule,
    MatDialogModule

  ],
  providers: [],
  exports: [MainPageComponent]
})
export class IdeMainModule { }
