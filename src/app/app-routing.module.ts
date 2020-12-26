import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './ide-main/main-page/main-page.component';
import { ResultPageComponent } from './ide-main/result-page/result-page.component';
import { ApiCallsMainPage } from 'src/constants/ApiCalls/MainEditor';
const routes: Routes = [{
  path: '',  redirectTo: ApiCallsMainPage.MainEditorPage.Editor, pathMatch: "full"
},
{
  path: ApiCallsMainPage.MainEditorPage.Editor, component: MainPageComponent, pathMatch: "full"
},

{
  path: ApiCallsMainPage.MainEditorPage.Result, component: ResultPageComponent, pathMatch: "full"
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload", scrollPositionRestoration:"enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
