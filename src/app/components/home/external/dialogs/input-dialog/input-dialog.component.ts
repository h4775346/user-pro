import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LocalService} from '../../../../../services/api/local-service';

@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.css']
})
export class InputDialogComponent implements OnInit {

  title: string;
  placeholder: string;
  inputType: string;
  input = '';

  constructor(public dialogRef: MatDialogRef<InputDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: InputDialogModel, public locale: LocalService) {
    this.title = data.title;
    this.placeholder = data.placeholder;
    this.inputType = data.inputType;
  }

  ngOnInit(): void {
  }


  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close({text: this.input});
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }


}

export class InputDialogModel {

  constructor(public title: string, public placeholder: string, public inputType) {
  }
}

