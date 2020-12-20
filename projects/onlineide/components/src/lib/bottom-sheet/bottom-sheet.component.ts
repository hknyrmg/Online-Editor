import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { TestResult } from '../models/BottomSheetModels/TestResult.model';

@Component({
  selector: 'ide-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css']
})
export class BottomSheetComponent implements OnInit {

  

 
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: {resultList: TestResult[]},
  private _bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>) {}
  ngOnInit(): void {
  }
  openSheet(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
