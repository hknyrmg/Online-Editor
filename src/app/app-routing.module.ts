import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './ide-main/main-page/main-page.component';

const routes: Routes = [{
  path: '',  redirectTo: "editor", pathMatch: "full"
},
{
  path: 'editor', component: MainPageComponent, pathMatch: "full"
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload", scrollPositionRestoration:"enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
