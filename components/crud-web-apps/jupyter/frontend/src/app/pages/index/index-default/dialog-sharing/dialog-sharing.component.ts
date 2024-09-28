import { Component, OnInit, Inject } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ChangeDetectionStrategy} from '@angular/core';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import { JWABackendService } from 'src/app/services/backend.service';
//2024/01/30 跳出成功加入訊息 start//
import {MatSnackBar} from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';
//2024/01/30 跳出成功加入訊息 end//
export interface Useremail {
  name: string;
}

@Component({
  selector: 'app-dialog-sharing',
  templateUrl: './dialog-sharing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DialogSharing implements OnInit {
  namespace: string;
  notebook: string;
 //2024/01/30 跳出成功加入訊息 start//
  constructor(public backend: JWABackendService,private dialogRef: MatDialogRef<DialogSharing>, @Inject(MAT_DIALOG_DATA) public data: any,private snackBar: MatSnackBar,private clipboard: Clipboard) {
    this.namespace = data.namespace;
    this.notebook = data.name;
 //2024/01/30 跳出成功加入訊息 end//   
  }
  
  // 2024/01/21 分享清單內容 start//
  ngOnInit()  {
    this.backend.getAllAuthorizationPolicy(this.namespace).subscribe(aps => {
      console.log(this.namespace);
      var deletename = "notebook-"+this.notebook+"-authorizationpolicy-view";
      var names = aps.reduce((acc, ap) => {
        if (ap.metadata.name.includes(deletename) && ap.spec && ap.spec.rules) {
          ap.spec.rules.forEach(rule => {
            if (rule.when && rule.when[0] && rule.when[0].values) {
              acc.push(...rule.when[0].values);
            }
          });
        }
        return acc;
      }, []);
      console.log('View List:', names);
      this.viewlist = names;
    });
    this.backend.getAllAuthorizationPolicy(this.namespace).subscribe(aps => {
      var deletename = "notebook-"+this.notebook+"-authorizationpolicy-editable";
      var names = aps.reduce((acc, ap) => {
        if (ap.metadata.name.includes(deletename) && ap.spec && ap.spec.rules) {
          ap.spec.rules.forEach(rule => {
            if (rule.when && rule.when[0] && rule.when[0].values) {
              acc.push(...rule.when[0].values);
            }
          });
        }
        return acc;
      }, []);
      console.log('edit List:', names);
      this.editlist = names;
    });
  }  
  // 2024/01/21 分享清單內容 end//

  selected :string;
  selected1 = 'option1';
  copylink: string;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;


  viewlist: string[] = [];
  editlist: string[] = [];

  // Chips of email start //
  useremail: Useremail[] = [];
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add email
    if ((value || '').trim()) {
      this.useremail.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
    // Remove value
  remove(useremail: Useremail): void {
    const index = this.useremail.indexOf(useremail);
    if (index >= 0) {
      this.useremail.splice(index, 1);
    }
  }
  // Chips email end //

  cancel(): void {
    this.dialogRef.close();
  }
  
  //2024/01/20 可添加多個email功能完成 start//
  useremailNames: string[] = [];
  myString:string;
   // 2024/01/29 YCL 加入錯誤訊息 start//
  errorMessage: string = '';
  onSubmit() {
    this.useremailNames = this.useremail.map(email => email.name);
    if (this.useremailNames.length === 0 || !this.selected) {
      this.errorMessage = 'Please enter "email" and select "Access".';
      console.log('Please enter "email" and select "Access".');
    } else {
      if (this.useremailNames.some(email => this.viewlist.includes(email) || this.editlist.includes(email))) {
        this.errorMessage = 'The email has already existed in the share list.';
        console.log('The email has already existed in the share list.');
      } else {
        //2024/01/30 YCL 跳出成功加入訊息 start//
        this.dialogRef.close({ useremail: this.useremailNames, selected: this.selected });
        //2024/02/04 YCL 自動複製連結 start//
         // 複製連結
        this.clipboard.copy(this.copylink);
  
        this.snackBar.open('Successfully added email: ' + this.useremailNames+ ', and the link has been copied.', 'Close', {
          duration: 8000, 
          horizontalPosition: 'center', 
          verticalPosition: 'bottom'   
      });
      //2024/02/04 YCL 自動複製連結 end//
      //2024/01/30 YCL 跳出成功加入訊息 end//
      }
    }
  }
  // 2024/01/29 YCL 加入錯誤訊息 end//
  //2024/01/20 可添加多個email功能完成 end//

 /// CopyLink 選項 串連notebook的name和namespace start//
 updateCopyLink(){
  console.log('updateCopyLink:', this.selected);
  console.log('href', window.location.href);
  console.log('pathname', window.location.pathname);
  console.log('href without pathname:', window.location.href.replace(window.location.pathname, ''));

  if (this.selected == 'option1') {
    this.copylink = `${window.location.href.replace(window.location.pathname, '')}/notebook/${this.namespace}/${this.notebook}/view/`;
  } else if(this.selected == 'option2') {
    this.copylink = `${window.location.href.replace(window.location.pathname, '')}/notebook/${this.namespace}/${this.notebook}/`;
  } else{
    this.copylink = `${window.location.href.replace(window.location.pathname, '')}/notebook/${this.namespace}/${this.notebook}/`;
  }
  console.log('copylink:', this.copylink);
}
// CopyLink 選項 串連notebook的name和namespace  end //

 // Expansion panel start // 
    panelOpenState = false;
 // Expansion panel end //

 // 2024/01/16 Expansion panel for view start //
  remove1(viewlist): void {
    const index1 = this.viewlist.indexOf(viewlist);
    if (index1 >= 0) {
      this.viewlist.splice(index1, 1);
      console.log("########");
      console.log([viewlist]);
      const address = `notebook-${this.notebook}-authorizationpolicy-view`;
      this.backend.modify_authorizaiton_delete(this.namespace, address, [viewlist])
      .subscribe(
        response => {
          console.log("########");
          console.log([viewlist]);
          console.log("Authorization modified successfully:", response);
        },
        error => {
          console.error("Error modifying authorization:", error);
        }
      );
  }
  }
  // 2024/01/16 Expansion panel for view end //

  // 2024/01/16 Expansion panel for edit start //
  remove2(editlist): void {
    const index2 = this.editlist.indexOf(editlist);
    if (index2 >= 0) {
      this.editlist.splice(index2, 1);
      console.log("########");
      console.log([editlist]);
      const address = `notebook-${this.notebook}-authorizationpolicy-editable`;
      this.backend.modify_authorizaiton_delete(this.namespace, address, [editlist])
      .subscribe(
        response => {
          console.log("########");
          console.log([editlist]);
          console.log("Authorization modified successfully:", response);
        },
        error => {
          console.error("Error modifying authorization:", error);
        }
      );
  }
  }
  // 2024/01/16 Expansion panel for edit end //

// 2024/01/20 取消所有分享function start //
    delete() {
       //Close the open dialog only if the DELETE request succeeded
      const delete_name= `notebook-${this.notebook}-authorizationpolicy-editable`
      console.log('Request URL:', `/api/namespaces/${this.namespace}/aps_vnc/${delete_name}`);
      if (delete_name) {
        this.backend.deleteauthorization(delete_name, this.namespace).subscribe({
        next: response => {
        console.log(`notebook-${this.notebook}-authorizationpolicy-editable`)
        console.log('success');
        },
        error: error => {
         console.log(`notebook-${this.notebook}-authorizationpolicy-editable`)
         console.log('error');
       }
      })};
      const delete_name2= `notebook-${this.notebook}-authorizationpolicy-view`
      if (delete_name2) {
       this.backend.deleteauthorization(delete_name2, this.namespace).subscribe({
        next: response => {
          console.log(`notebook-${this.notebook}-authorizationpolicy-view`)
          console.log('success');
        },
        error: error => {
          console.log(`notebook-${this.notebook}-authorizationpolicy-view`)
          console.log('error');
        }
      })};
 }
  // 2024/01/20 取消所有分享function end //
}


