import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { AddPostConfirmDialogComponent } from '../add-post-confirm-dialog/add-post-confirm-dialog.component';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { JWABackendService } from 'src/app/services/backend.service';

import { NotebookResponseObject, NotebookProcessedObject } from 'src/app/types';

@Component({
  selector: 'app-add-post-dialog',
  templateUrl: './add-post-dialog.component.html',
  styleUrls: ['./add-post-dialog.component.css']
})
export class AddPostDialogComponent implements OnInit {
  title: string;
  imageName: string;
  imageVersion: string;
  courseName: string;
  notebook: NotebookProcessedObject;

  tags = ['JavaScript', 'Material Design', 'Angular Material'];
  separatorKeysCodes = [ENTER, COMMA];
  constructor(private dialogRef: MatDialogRef<AddPostDialogComponent>, public backend: JWABackendService, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    //this.imageName = this.data.imageName
    //this.imageVersion = this.data.imageVersion
    //this.courseName = this.data.courseName

    this.notebook = this.data.notebook
    this.imageName = this.notebook.customerImageName
    this.imageVersion = this.notebook.customerImageVersion
    this.courseName = this.notebook.customerCourseName
  }

  doPost() {
    /*
    const confirmDialogRef = this.dialog.open(AddPostConfirmDialogComponent, {
      data: {
        title: this.title
      }
    });
    confirmDialogRef.componentInstance.doConfirm.subscribe(() => {
      console.log('開啟的dialog按下確認按鈕了');
    });
    */

    this.backend.setCustomerParamNotebook(this.notebook,'customerImageName', this.imageName).subscribe(() => {
      //this.poller.reset();
    });

    this.backend.setCustomerParamNotebook(this.notebook,'customerImageVersion', this.imageVersion).subscribe(() => {
      //this.poller.reset();
    });

    this.backend.setCustomerParamNotebook(this.notebook,'customerCourseName', this.courseName).subscribe(() => {
      //this.poller.reset();
    });
    this.dialogRef.close();
  }

  move() {
    this.dialogRef.updatePosition({
      top: '0',
      left: '0'
    });
  }

  removeTag(tagName) {
    this.tags = this.tags.filter(tag => tag !== tagName);
  }

  addTag($event: MatChipInputEvent) {
    if (($event.value || '').trim()) {
      const value = $event.value.trim();
      if (this.tags.indexOf(value) === -1) {
        this.tags.push(value);
      }
    }

    $event.input.value = '';
  }
}
