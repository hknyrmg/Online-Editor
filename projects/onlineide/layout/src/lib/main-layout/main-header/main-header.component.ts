import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ide-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {
@Input() headerTitle: string = "Obss Online Ide"
  constructor() { }

  ngOnInit(): void {
  }

}
