import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MainLeftSidebarComponent } from '../main-left-sidebar/main-left-sidebar.component';

@Component({
  selector: 'ide-main-page',
  templateUrl: './ide-main-page.component.html',
  styleUrls: ['./ide-main-page.component.css']
})
export class IdeMainPageComponent implements OnInit {
  // @ViewChild('leftBar') leftBar: MainLeftSidebarComponent;

  opened: boolean;

  @Input() headerTitle: string = "OBSS Online IDE"

  constructor() { }

  ngOnInit(): void {
  }
  // menuClicked(value){
  //   this.leftBar.menuToggle(value);
  // }
}
