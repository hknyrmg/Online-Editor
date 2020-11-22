import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'ide-main-left-sidebar',
  templateUrl: './main-left-sidebar.component.html',
  styleUrls: ['./main-left-sidebar.component.css']
})
export class MainLeftSidebarComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  opened: boolean;

  constructor() { }

  ngOnInit(): void {
  }
  menuToggle(value){
    this.sidenav.toggle();
  }
}
