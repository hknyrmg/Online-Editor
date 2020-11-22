import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ide-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {
@Input() headerTitle: string = "OBSS Online IDE"
@Output() menuButtonClicked = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
  }

  menuClicked(value){
this.menuButtonClicked.emit(value);
  }
}
