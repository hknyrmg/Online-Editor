import { ChangeDetectorRef, Component} from '@angular/core';
import { LoaderService } from 'projects/onlineide/core/src/lib/Services/loader-service/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'online-ide-app';

  showLoader: boolean;

  constructor(
      private loaderService: LoaderService,
      private _cdRef: ChangeDetectorRef) {
  }
  ngOnInit() {
    this.loaderService.status.subscribe((val: boolean) => {
        this.showLoader = val;
    });

}
ngAfterContentChecked(): void {
  //Called after every check of the component's or directive's content.
  //Add 'implements AfterContentChecked' to the class.
  this._cdRef.detectChanges();
}
}
