import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AfterPostNotifyComponent } from '../after-post-notify/after-post-notify.component';

@Component({
  selector: 'app-add-post-confirm-dialog',
  templateUrl: './add-post-confirm-dialog.component.html',
  styleUrls: ['./add-post-confirm-dialog.component.css']
})
export class AddPostConfirmDialogComponent implements OnInit {
  @Output() doConfirm = new EventEmitter<any>();

  get title() {
    return this.data.title;
  }
  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) private data: any, private snackBar: MatSnackBar) {}

  ngOnInit() {}

  confirm() {
    this.doConfirm.emit();
    this.dialog.closeAll();
    this.snackBar.openFromComponent(AfterPostNotifyComponent, {
      data: { title: this.title },
      horizontalPosition: 'left',
      verticalPosition: 'bottom'
    });
  }
}
