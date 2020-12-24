import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './ide-main/main-page/main-page.component';
import { ResultPageComponent } from './ide-main/result-page/result-page.component';

const routes: Routes = [{
  path: '',  redirectTo: "editor", pathMatch: "full"
},
{
  path: 'editor', component: MainPageComponent, pathMatch: "full"
},

{
  path: 'result', component: ResultPageComponent, pathMatch: "full"
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload", scrollPositionRestoration:"enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
