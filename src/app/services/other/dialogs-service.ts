import {Injectable} from '@angular/core';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../../components/home/external/dialogs/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {InputDialogComponent, InputDialogModel} from '../../components/home/external/dialogs/input-dialog/input-dialog.component';
import {MessageDialogComponent, MessageDialogModel} from '../../components/home/external/dialogs/message-dialog/message-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor(public dialog: MatDialog) {
  }

  requestConfirmation(title: string, message: string) {

    const dialogData = new ConfirmDialogModel(title, message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    return dialogRef.afterClosed();
  }

  requestInput(title: string, placeholder: string, type: string) {
    const dialogData = new InputDialogModel(title, placeholder, type);
    const dialogRef = this.dialog.open(InputDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    return dialogRef.afterClosed();
  }

  showMessage(title: string, message: string) {
    const dialogData = new MessageDialogModel(title, message);
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    return dialogRef.afterClosed();
  }


}
