import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainHeaderComponent } from './main-layout/main-header/main-header.component';
import { IdeMainPageComponent } from './main-layout/ide-main-page/ide-main-page.component';
import { MainLeftSidebarComponent } from './main-layout/main-left-sidebar/main-left-sidebar.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { RouterModule } from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatStepperModule} from '@angular/material/stepper';
import { CoreModule } from '@onlineide/core';


@NgModule({
  declarations: [MainHeaderComponent, IdeMainPageComponent, MainLeftSidebarComponent],
  imports: [CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    RouterModule ,
    MatSlideToggleModule,
    MatTooltipModule,
    MatStepperModule,
    CoreModule
  ],
  exports: [MainHeaderComponent, IdeMainPageComponent, MainLeftSidebarComponent]
})
export class IdeLayoutModule { }
