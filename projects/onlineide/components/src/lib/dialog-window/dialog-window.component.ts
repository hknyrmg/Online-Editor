import { Component, Inject, Input, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogModel } from '../models/DialogModels/DialogModel';


@Component({
  selector: 'ide-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.css']
})
export class DialogWindowComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogModel) {}

  ngOnInit(): void {
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
