import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropdownModel } from '../models/DropdownModels/DropdownModel';

@Component({
  selector: 'ide-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
@Input() dropDataList: DropdownModel[];
@Input() selectedValue: string;
@Input() dropDownTitle: string;
@Output() dropChangedEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  dropChanged(value){
    // this.selectedValue = value;
    // console.log(value);
    this.dropChangedEvent.emit(value);
    this.selectedValue = value;
  }
}
