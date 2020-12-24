import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteManagerService {

  constructor(private _router: Router) { }

  public redirect(url: string, miliseconds?: number): Promise<boolean> {
    if (miliseconds) {
      setTimeout(() => {
        this._router.navigateByUrl(url)
      }, miliseconds);
    }
    else {
      return this._router.navigateByUrl(url);
    }

  }
  public redirectWithExtras(url: string, extras?: NavigationExtras, miliseconds?: number): Promise<boolean> {
    if (miliseconds) {
      setTimeout(() => {
        this._router.navigate([url], extras)
      }, miliseconds);
    }
    else {
      return this._router.navigate([url], extras);
    }

  }
}
