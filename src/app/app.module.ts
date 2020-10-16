import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IdeMainModule } from './ide-main/ide-main.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    IdeMainModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule 
    
  ],
  providers: [ {
    provide: 'baseApiUrl', useValue: environment.apiUrl
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
