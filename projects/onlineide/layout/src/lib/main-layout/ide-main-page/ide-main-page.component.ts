import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MainLeftSidebarComponent } from '../main-left-sidebar/main-left-sidebar.component';

@Component({
  selector: 'ide-main-page',
  templateUrl: './ide-main-page.component.html',
  styleUrls: ['./ide-main-page.component.css']
})
export class IdeMainPageComponent implements OnInit {
  // @ViewChild('leftBar') leftBar: MainLeftSidebarComponent;
  @Output() toggleChangeEvent = new EventEmitter<Boolean>();

  opened: boolean;

  @Input() headerTitle: string = "OBSS Online IDE"

  constructor() { }

  ngOnInit(): void {
  }

  toggleChange(slideToggleState: Boolean){
this.toggleChangeEvent.emit(slideToggleState);
  }
  // menuClicked(value){
  //   this.leftBar.menuToggle(value);
  // }
}
