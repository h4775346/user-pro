import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LocalService} from '../../../../../services/api/local-service';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent implements OnInit {

  title: string;
  message: string;

  constructor(public dialogRef: MatDialogRef<MessageDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: MessageDialogModel, public locale: LocalService) {
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit(): void {
  }


}

export class MessageDialogModel {

  constructor(public title: string, public message: string) {
  }
}

