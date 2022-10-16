import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-thanks-for-buying',
  templateUrl: './thanks-for-buying.component.html',
  styleUrls: ['./thanks-for-buying.component.css']
})
export class ThanksForBuyingComponent implements OnInit {

  command : string;

  constructor(
    private dialogRef: MatDialogRef<ThanksForBuyingComponent>,
    @Inject(MAT_DIALOG_DATA) data : any,
  ) {
    this.command = data.command;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }


}
