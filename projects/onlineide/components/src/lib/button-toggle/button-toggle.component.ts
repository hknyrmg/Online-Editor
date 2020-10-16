import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonToggleModel } from '../models/ToggleButtonModels/ButtonToggleModel';

@Component({
  selector: 'ide-button-toggle',
  templateUrl: './button-toggle.component.html',
  styleUrls: ['./button-toggle.component.css']
})
export class ButtonToggleComponent implements OnInit {
  @Input() buttonToggleList: ButtonToggleModel[];
  @Input() selectedValue: string;
  // @Input() dropDownTitle: string;
  @Output() buttonChangedEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  buttonChanged(value){
 
    this.buttonChangedEvent.emit(value);
    this.selectedValue = value;
  }
}
