import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { environment } from '@app/environment';
import {
  NamespaceService,
  ExponentialBackoff,
  ActionEvent,
  STATUS_TYPE,
  DialogConfig,
  PollerService,
  ConfirmDialogService,
  SnackBarConfig,
  SnackBarService,
  DIALOG_RESP,
  SnackType,
  ToolbarButton,
} from 'kubeflow';
import { JWABackendService } from 'src/app/services/backend.service';
import { Subscription } from 'rxjs';
import {
  defaultAdvancedConfig,
  defaultConfig,
  getDeleteDialogConfig,
  getStopDialogConfig,
  getDisableTemplateDialogConfig,
} from './config';
import { isEqual } from 'lodash';
import { NotebookResponseObject, NotebookProcessedObject } from 'src/app/types';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddPostDialogComponent } from '../../index/index-default/add-post-dialog/add-post-dialog.component';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StringifyOptions } from 'querystring';
@Component({
  selector: 'app-index-default2',
  templateUrl: './index-default2.component.html',
  styleUrls: ['./index-default2.component.scss'],
})
export class IndexDefaultComponent2 implements OnInit, OnDestroy {
  @Input()
  searchControl: AbstractControl;

  env = environment;

  currNamespace = '';
  origNamespace = '';
  isBasic = false;
  configAdvance = defaultAdvancedConfig;
  config = defaultConfig;
  subs = new Subscription();
  pollSub = new Subscription();

  currentName = '';
  
  //if (isBasicSetting) {
  //  this.config = defaultConfig;
  //} 
      
  rawData: NotebookResponseObject[] = [];
  processedData2: NotebookProcessedObject[] = [];


  constructor(
    public ns: NamespaceService,
    public backend: JWABackendService,
    public confirmDialog: ConfirmDialogService,
    public snackBar: SnackBarService,
    public poller: PollerService,
    public router: Router,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public http: HttpClient
  ) {}
  // currNamespace1: string;
  notebookName: string;
  // currNamespace2:string;
  url1 :string;
  ngOnInit(): void {
        
    //this.poller = new ExponentialBackoff({ interval: 1000, retries: 3 });
        
    this.backend.getUsername().subscribe(username => {

      if (Object.keys(username).length === 0) {
        // Don't fire on empty config
        //console.log("NO username")
        this.isBasic = true;
        return;
      }

      if( username.substring(0,1) === "D" || username.substring(0,1) === "d" )
        this.isBasic = false;
      else
        this.isBasic = true;

      //this.isBasic = false;  
      //alert(username);
      //console.log("username", username)
    });


    // Reset the poller whenever the selected namespace changes
    this.subs.add(
      this.ns.getSelectedNamespace().subscribe(ns => {
        // Lance
        this.origNamespace = ns;
        //this.poller.reset();

        this.backend.getManager(this.origNamespace).subscribe(manager => {
            // alert(manager[0]);
            if( manager[0] === "manager" )
              this.isBasic = false;
            else
              this.isBasic = true;
            this.loadPage();
        });
      })
    );
  }

  loadPage() {
    this.route.params.subscribe(params => {
      // 從路由參數中獲取 namespace 和 notebook_name
      this.currNamespace = params['namespace'];
      this.notebookName = params['notebook_name'];
      this.url1 = this.router.url
      //this.currNamespace2 = 'm1161002-2'

      if (this.url1.includes('/view')) {
        this.url1 = 'view'
        console.log('The URL contains "/view"');
      } else {
        this.url1 = 'editable'
        console.log('The URL does not contain "/view"');
      }
      const request = this.backend.getsharedNotebooks(this.origNamespace, this.currNamespace,this.notebookName);

      this.pollSub = this.poller.exponential(request).subscribe(notebooks => {
          // Lance
          this.rawData = notebooks;
          this.processedData2 = this.processIncomingData(notebooks);
      });
    


      this.backend.getsharedNotebooks(this.origNamespace, this.currNamespace, this.notebookName).subscribe(notebooks => {
        if (!isEqual(this.rawData, notebooks)) {
          this.rawData = notebooks;
          // Update the frontend's state
          this.processedData2 = this.processIncomingData(notebooks);
          //this.poller.reset();
        }
        console.log('User success');
        console.log(this.currNamespace)
      });
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    //this.poller.stop();
    this.pollSub.unsubscribe();

  }
 
  
  // Event handling functions
  reactToAction(a: ActionEvent) {
    switch (a.action) {       
      case 'delete':
        this.deleteVolumeClicked(a.data);
        break;
      case 'connect':
        this.connectClicked();
        break;
      case 'start-stop':
        this.startStopClicked(a.data);
        break;
      
        
    }
  }

  public templateClicked(notebook: NotebookProcessedObject) {
    if (notebook.isTemplate === 'yes') {
      this.disableTemplateNotebook(notebook);
    } else {
      this.enableTemplateNotebook(notebook);
    }
  }

  public enableTemplateNotebook(notebook: NotebookProcessedObject) {
    /* Lance - begin 20240908 */
    /*
    this.snackBar.open(
      $localize`Set Notebook as template '${notebook.name}'...`,
      SnackType.Info,
      1000,
    );
    */

    const config: SnackBarConfig = {
      data: {
        msg: $localize`Set Notebook as template '${notebook.name}'...`,
        snackType: SnackType.Info,
      },
      duration: 1000,
    };
    this.snackBar.open(config);
    /* Lance - end 20240908 */

    notebook.status.phase = STATUS_TYPE.WAITING;
    notebook.status.message = 'Set Notebook as template...';
    this.updateNotebookFields(notebook);

    this.backend.enableTemplateNotebook(notebook).subscribe(() => {
      //this.poller.reset();
    });

    this.showAddPostDialog(notebook);
  }

  public disableTemplateNotebook(notebook: NotebookProcessedObject) {
    const stopDialogConfig = getDisableTemplateDialogConfig(notebook.name);
    const ref = this.confirmDialog.open(notebook.name, stopDialogConfig);
    const stopSub = ref.componentInstance.applying$.subscribe(applying => {
      if (!applying) {
        return;
      }

      // Close the open dialog only if the request succeeded
      this.backend.disableTemplateNotebook(notebook).subscribe({
        next: _ => {
          //this.poller.reset();
          ref.close(DIALOG_RESP.ACCEPT);
        },
        error: err => {
          const errorMsg = err;
          stopDialogConfig.error = errorMsg;
          ref.componentInstance.applying$.next(false);
        },
      });

      // request has succeeded
      ref.afterClosed().subscribe(res => {
        stopSub.unsubscribe();
        if (res !== DIALOG_RESP.ACCEPT) {
          return;
        }

        /* Lance - end 20240908 */
        /*
        this.snackBar.open(
          $localize`Disable Notebook as template '${notebook.name}'...`,
          SnackType.Info,
          1000,
        );
        */
       
        const config: SnackBarConfig = {
          data: {
            msg: $localize`Disable Notebook as template '${notebook.name}'...`,
            snackType: SnackType.Info,
          },
          duration: 1000,
        };
        this.snackBar.open(config);
        /* Lance - end 20240908 */

        notebook.status.phase = STATUS_TYPE.TERMINATING;
        notebook.status.message = 'Preparing to disable the Notebook as template...';
        this.updateNotebookFields(notebook);
      });
    });
  }

  public deleteVolumeClicked(notebook: NotebookProcessedObject) {
    const deleteDialogConfig = getDeleteDialogConfig(notebook.name);

    const ref = this.confirmDialog.open(notebook.name, deleteDialogConfig);
    const delSub = ref.componentInstance.applying$.subscribe(applying => {
      if (!applying) {
        return;
      }

      // Close the open dialog only if the DELETE request succeeded
      this.backend.deleteNotebook(this.currNamespace, notebook.name).subscribe({
        next: _ => {
          //this.poller.reset();
          ref.close(DIALOG_RESP.ACCEPT);
        },
        error: err => {
          const errorMsg = err;
          deleteDialogConfig.error = errorMsg;
          ref.componentInstance.applying$.next(false);
        },
      });

      // DELETE request has succeeded
      ref.afterClosed().subscribe(res => {
        delSub.unsubscribe();
        if (res !== DIALOG_RESP.ACCEPT) {
          return;
        }

        notebook.status.phase = STATUS_TYPE.TERMINATING;
        notebook.status.message = 'Preparing to delete the Notebook...';
        this.updateNotebookFields(notebook);
      });
    });
  }
  public connectClicked() {
    let url: string;
    console.log("connectClicked " + this.currNamespace + " " + this.notebookName);
    if (window.location.href.includes('/view')) {
        url = `/notebook/${this.currNamespace}/${this.notebookName}/view`;
    } else {
        url = `/notebook/${this.currNamespace}/${this.notebookName}/`;
    }
    // Open new tab to work on the Notebook
    window.open(url)

}

  public startStopClicked(notebook: NotebookProcessedObject) {
    if (notebook.status.phase === STATUS_TYPE.STOPPED) {
      this.startNotebook(notebook);
    } else {
      this.stopNotebook(notebook);
    }
  }

  public startNotebook(notebook: NotebookProcessedObject) {
    /* Lance - begin 20240908 */
    /*
    this.snackBar.open(
      $localize`Starting Notebook server '${notebook.name}'...`,
      SnackType.Info,
      3000,
    );
    */

    const config: SnackBarConfig = {
      data: {
        msg: $localize`Starting Notebook server '${notebook.name}'...`,
        snackType: SnackType.Info,
      },
      duration: 3000,
    };
    this.snackBar.open(config);
    /* Lance - end 20240908 */

    notebook.status.phase = STATUS_TYPE.WAITING;
    notebook.status.message = 'Starting the Notebook Server...';
    this.updateNotebookFields(notebook);
    /* Lance - begin 20240908 */
    // this.backend.startNotebook(notebook).subscribe(() => {
    this.backend.startSharedNotebook(this.origNamespace, notebook.namespace, this.notebookName).subscribe(() => {
    /* Lance - end 20240908 */  
      //this.poller.reset();
    });
  }

  public stopNotebook(notebook: NotebookProcessedObject) {
    const stopDialogConfig = getStopDialogConfig(notebook.name);
    const ref = this.confirmDialog.open(notebook.name, stopDialogConfig);
    const stopSub = ref.componentInstance.applying$.subscribe(applying => {
      if (!applying) {
        return;
      }

      // Close the open dialog only if the request succeeded
      /* Lance - begin 20240908 */
      // this.backend.stopNotebook(notebook).subscribe({
      this.backend.stopSharedNotebook(this.origNamespace,notebook.namespace, notebook.name).subscribe({
      /* Lance - end 20240908 */
        next: _ => {
          //this.poller.reset();
          ref.close(DIALOG_RESP.ACCEPT);
        },
        error: err => {
          const errorMsg = err;
          stopDialogConfig.error = errorMsg;
          ref.componentInstance.applying$.next(false);
        },
      });

      // request has succeeded
      ref.afterClosed().subscribe(res => {
        stopSub.unsubscribe();
        if (res !== DIALOG_RESP.ACCEPT) {
          return;
        }

        /* Lance - end 20240908 */
        /*
        this.snackBar.open(
          $localize`Stopping Notebook server '${notebook.name}'...`,
          SnackType.Info,
          3000,
        );
        */

        const config: SnackBarConfig = {
          data: {
            msg: $localize`Stopping Notebook server '${notebook.name}'...`,
            snackType: SnackType.Info,
          },
          duration: 3000,
        };
        this.snackBar.open(config);
        /* Lance - end 20240908 */

        notebook.status.phase = STATUS_TYPE.TERMINATING;
        notebook.status.message = 'Preparing to stop the Notebook Server...';
        this.updateNotebookFields(notebook);
      });
    });
  }

  // Data processing functions
  updateNotebookFields(notebook: NotebookProcessedObject) {
    notebook.setTemplateAction = this.processSetTemplateActionStatus(notebook);
    notebook.removeTemplateAction = this.processRemoveTemplateActionStatus(notebook);
    notebook.deleteAction = this.processDeletionActionStatus(notebook);
    notebook.connectAction = this.processConnectActionStatus(notebook);
    notebook.startStopAction = this.processStartStopActionStatus(notebook);
    notebook.shareAction = STATUS_TYPE.READY;
    notebook.viewAction = STATUS_TYPE.READY;
  }

  processIncomingData(notebooks: NotebookResponseObject[]) {
    const notebooksCopy = JSON.parse(
      JSON.stringify(notebooks),
    ) as NotebookProcessedObject[];

    for (const nb of notebooksCopy) {
      this.updateNotebookFields(nb);
    }
    return notebooksCopy;
  }

  // Action handling functions
  processSetTemplateActionStatus(notebook: NotebookProcessedObject) {

    if (notebook.jsonStr === null) 
      return STATUS_TYPE.TERMINATING;
    
    if (notebook.isTemplate !== 'yes') {
      return STATUS_TYPE.READY;
    }

    // Lance
    // if (notebook.status.phase !== STATUS_TYPE.TERMINATING) {
    //    return STATUS_TYPE.READY;
    //  }

    return STATUS_TYPE.TERMINATING;
  }

  processRemoveTemplateActionStatus(notebook: NotebookProcessedObject) {

    if (notebook.isTemplate === 'yes') {
      return STATUS_TYPE.READY;
    }

    // Lance
    // if (notebook.status.phase !== STATUS_TYPE.TERMINATING) {
    //    return STATUS_TYPE.READY;
    //  }

    return STATUS_TYPE.TERMINATING;
  }

  processDeletionActionStatus(notebook: NotebookProcessedObject) {
    if (notebook.status.phase !== STATUS_TYPE.TERMINATING) {
      return STATUS_TYPE.READY;
    }

    return STATUS_TYPE.TERMINATING;
  }

  processStartStopActionStatus(notebook: NotebookProcessedObject) {
    // Stop button
    if (notebook.status.phase === STATUS_TYPE.READY) {
      return STATUS_TYPE.UNINITIALIZED;
    }

    // Start button
    if (notebook.status.phase === STATUS_TYPE.STOPPED) {
      return STATUS_TYPE.READY;
    }

    // If it is terminating, then the action should be disabled
    if (notebook.status.phase === STATUS_TYPE.TERMINATING) {
      return STATUS_TYPE.UNAVAILABLE;
    }

    // If the Notebook is not Terminating, then always allow the stop action
    return STATUS_TYPE.UNINITIALIZED;
  }

  processConnectActionStatus(notebook: NotebookProcessedObject) {
    if (notebook.status.phase !== STATUS_TYPE.READY) {
      return STATUS_TYPE.UNAVAILABLE;
    }

    return STATUS_TYPE.READY;
  }

  public notebookTrackByFn2(index: number, notebook: NotebookProcessedObject) {
    return `${notebook.name}/${notebook.image}`;
  }

  showAddPostDialog(notebook: NotebookProcessedObject) {

    this.currentName = notebook.name;
    this.dialog.open(AddPostDialogComponent, {
      hasBackdrop: false,
      data: { notebook: notebook}
    });

    //this.dialog.open(AddPostDialogComponent, {
    //  width: '600px',
    //  panelClass: 'form--dialog-padding',
    //});
  }
}
