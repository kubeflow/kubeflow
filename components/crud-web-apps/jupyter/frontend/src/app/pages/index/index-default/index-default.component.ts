import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import { environment } from '@app/environment';
import {
  NamespaceService,
  ActionEvent,
  STATUS_TYPE,
  ConfirmDialogService,
  SnackBarService,
  DIALOG_RESP,
  SnackType,
  ToolbarButton,
  PollerService,
  DashboardState,
  SnackBarConfig,
} from 'kubeflow';
import { JWABackendService } from 'src/app/services/backend.service';
import { Subscription } from 'rxjs';
import { 
  defaultConfig,
  defaultAdvancedConfig, // Lance
} from './config';
import { isEqual } from 'lodash';
import { NotebookResponseObject, NotebookProcessedObject } from 'src/app/types';
import { Router } from '@angular/router';
import { ActionsService } from 'src/app/services/actions.service';
import { getDisableTemplateDialogConfig } from 'src/app/services//config';

/* Lance begin 20240906 */
import { AddPostDialogComponent } from './add-post-dialog/add-post-dialog.component';
import { MatDialog } from '@angular/material/dialog';
/* Lance end 20240906 */
// YCL 2023/12/03 start
import { AbstractControl } from '@angular/forms';
import { DialogSharing } from './dialog-sharing/dialog-sharing.component';
// YCL 2023/12/03 end

@Component({
  selector: 'app-index-default',
  templateUrl: './index-default.component.html',
  styleUrls: ['./index-default.component.scss'],
})
export class IndexDefaultComponent implements OnInit, OnDestroy {
  @Input()
  searchControl: AbstractControl;

  env = environment;

  nsSub = new Subscription();
  pollSub = new Subscription();

  /* Lance - begin 0906 */
  // currNamespace: string | string[];
  // config = defaultConfig;
  currNamespace = '';
  isBasic = false;
  configAdvance = defaultAdvancedConfig;
  config = defaultConfig;
  // config = defaultAdvancedConfig;
  rawData: NotebookResponseObject[] = [];
  currentName = '';
  currentField = '';
  /* lance - end 0906 */

  processedData: NotebookProcessedObject[] = [];
  dashboardDisconnectedState = DashboardState.Disconnected;

  private newNotebookButton = new ToolbarButton({
    text: $localize`New Notebook`,
    icon: 'add',
    stroked: true,
    fn: () => {
      this.router.navigate(['/new']);
    },
  });

  buttons: ToolbarButton[] = [this.newNotebookButton];

  constructor(
    public ns: NamespaceService,
    public backend: JWABackendService,
    public confirmDialog: ConfirmDialogService,
    public snackBar: SnackBarService,
    public router: Router,
    public poller: PollerService,
    public actions: ActionsService,
    public dialog: MatDialog, // Lance
  ) {}

  ngOnInit(): void {
    // Reset the poller whenever the selected namespace changes
    this.nsSub = this.ns.getSelectedNamespace2().subscribe(ns => {
      this.currNamespace = ns.toString();
      // alert("Lance 2-1 " + this.currNamespace);
      this.backend.getManager( this.currNamespace).subscribe(manager => {
        // alert("Lance 2 " + manager[0]);
        if( manager[0] === "manager" )
          this.isBasic = false;
        else
          this.isBasic = true;
      });
      this.poll(ns);
      this.newNotebookButton.namespaceChanged(ns, $localize`Notebook`);
    });

    this.backend.getUsername().subscribe(username => {

      if (Object.keys(username).length === 0) {
        // Don't fire on empty config
        //console.log("NO username")
        this.isBasic = true;
        return;
      }

      /*
      if( username.substring(0,1) === "D" || username.substring(0,1) === "d" )
        this.isBasic = false;
      else
        this.isBasic = true;
      */

      //this.isBasic = false;  
      // alert(username);
      //console.log("username", username)
    });

    
    // Poll for new data and reset the poller if different data is found
    /*
    this.nsSub.add(
      this.poller.start().subscribe(() => {
        if (!this.currNamespace) {
          return;
        }

        this.backend.getNotebooks(this.currNamespace).subscribe(notebooks => {
          if (!isEqual(this.rawData, notebooks)) {
            this.rawData = notebooks;

            // Update the frontend's state
            // this.processedData = this.processIncomingData(notebooks);
            this.processedData = this.processIncomingData(this.rawData.filter((notebook) => {
              console.log(notebook.name);
              return (
                notebook.name.includes(this.currentField) ||
                notebook.namespace.includes(this.currentField) ||
                notebook.image.includes(this.currentField)
              );
            }));
            this.poller.reset();
          }
        });
      }),
    );
    */

    // Reset the poller whenever the selected namespace changes
    /*
    this.nsSub.add(
      // this.ns.getSelectedNamespace().subscribe(ns => {
      this.ns.getSelectedNamespace2().subscribe(ns => {
        this.currNamespace = ns;
        // this.poller.reset();

        this.backend.getManager(this.currNamespace).subscribe(manager => {
            // alert(manager[0]);
            if( manager[0] === "manager" )
              this.isBasic = false;
            else
              this.isBasic = true;
        });
      }),
    );
    */
  }

  ngOnDestroy() {
    this.nsSub.unsubscribe();
    this.pollSub.unsubscribe();
  }

  public poll(ns: string | string[]) {
    this.pollSub.unsubscribe();
    this.processedData = [];

    const request = this.backend.getNotebooks(ns);

    this.pollSub = this.poller.exponential(request).subscribe(notebooks => {
      // Lance
      this.rawData = notebooks;
      this.processedData = this.processIncomingData(notebooks);
    });
  }

  // Event handling functions
  reactToAction(a: ActionEvent) {
    switch (a.action) {
      case 'delete':
        this.deleteNotebookClicked(a.data);
        break;
      case 'connect':
        this.connectClicked(a.data);
        break;
      case 'start-stop':
        this.startStopClicked(a.data);
        break;
      case 'name:link':
        if (a.data.status.phase === STATUS_TYPE.TERMINATING) {
          a.event.stopPropagation();
          a.event.preventDefault();
          const config: SnackBarConfig = {
            data: {
              msg: 'Notebook is being deleted, cannot show details.',
              snackType: SnackType.Info,
            },
            duration: 4000,
          };
          this.snackBar.open(config);
          return;
        }
        break;
      case 'template':
        this.templateClicked(a.data);
        break;
      case 'remove-template':
        this.templateClicked(a.data);
        break;
      case 'share':
        // this.shareClicked(a.data);
        const dialogRef =this.dialog.open(DialogSharing,{ data: { namespace: a.data.namespace, name: a.data.name }});  
        dialogRef.afterClosed().subscribe((result) => {
            //const jsyaml = require('js-yaml');
            if (result && result.useremail) {
              const useremail = result.useremail;
              console.log('User Email from Dialog:', useremail);
              const selected = result.selected;
              // if select "view" //
              if (selected =='option1'){
                const paths = `/notebook/${a.data.namespace}/${a.data.name}/view/*`;
                const namevalue = `notebook-${a.data.name}-authorizationpolicy-view`;

                this.backend.getAllAuthorizationPolicy(a.data.namespace).subscribe(aps => {
                  console.log(a.data.namespace);
                  var deletename = "notebook-" + a.data.name +"-authorizationpolicy-view";
                  var names = aps.map((ap) => { return ap.metadata.name });
                  var filteredNames = names.filter((name) => name.includes(deletename));
              
                if (filteredNames.length <= 0) {
                  this.backend.createAuthorization(this.currNamespace,namevalue,paths,useremail).subscribe(
                    (response) => {
                    console.log("Success");
                    console.log('currNamespace:', this.currNamespace);
                    console.log('namevalue:', namevalue);
                    console.log("paths:", paths);
                    console.log("useremail:", useremail);
                    console.log("selected-option:", selected);
                    },
                (error) => {
                  console.error('Error creating authorization policy:', error);
                });
                }else {
                  //2024/01/23 新增email功能 start
                  this.backend.modify_authorizaiton(this.currNamespace,namevalue,useremail).subscribe(
                    (response) => {
                    console.log("Success for adding");
                    console.log('currNamespace:', this.currNamespace);
                    console.log('namevalue:', namevalue);
                    console.log("useremail:", useremail);
                    console.log("selected-option:", selected);
                    },
                    (error) => {
                      console.log('filteredName != 0, existed');
                  });
              
                }
              });
              //2024/01/23 新增email功能 end
            }else{
              // if select "editable" //
              const paths = `/notebook/${a.data.namespace}/${a.data.name}/*`;
              const namevalue = `notebook-${a.data.name}-authorizationpolicy-editable`;
              this.backend.getAllAuthorizationPolicy(a.data.namespace).subscribe(aps => {
                console.log(a.data.namespace);
                var deletename = "notebook-" + a.data.name +"-authorizationpolicy-editable";
                var names = aps.map((ap) => { return ap.metadata.name });
                var filteredNames = names.filter((name) => name.includes(deletename));
              if (filteredNames.length <= 0) {
                this.backend.createAuthorization(this.currNamespace,namevalue,paths,useremail).subscribe(
                (response) => {
                  console.log("Success");
                  console.log('currNamespace:', this.currNamespace);
                  console.log('namevalue:', namevalue);
                  console.log("paths:", paths);
                  console.log("useremail:", useremail);
                  console.log("selected-option:", selected);
                },
                (error) => {
                  console.error('Error creating authorization policy:', error);
                });
              }else {
                //2024/01/23 新增email功能 start
                this.backend.modify_authorizaiton(this.currNamespace,namevalue,useremail).subscribe(
                  (response) => {
                  console.log("Success for adding");
                  console.log('currNamespace:', this.currNamespace);
                  console.log('namevalue:', namevalue);
                  console.log("useremail:", useremail);
                  console.log("selected-option:", selected);
                  },
                  (error) => {
                    console.log('filteredName != 0, existed');
                });
              }
            })};
            //2024/01/23 新增email功能 end
          }
        });
        // 2024/1/16 YC end //
        break;
      case 'view':
        // this.viewClicked(a.data);
        break;  
    }
  }

  deleteNotebookClicked(notebook: NotebookProcessedObject) {
    this.actions
      .deleteNotebook(notebook.namespace, notebook.name)
      .subscribe(result => {
        if (result !== DIALOG_RESP.ACCEPT) {
          return;
        }

        notebook.status.phase = STATUS_TYPE.TERMINATING;
        notebook.status.message = 'Preparing to delete the Notebook.';
        this.updateNotebookFields(notebook);
      });
  }

  public connectClicked(notebook: NotebookProcessedObject) {
    this.actions.connectToNotebook(notebook.namespace, notebook.name);
  }

  public startStopClicked(notebook: NotebookProcessedObject) {
    if (notebook.status.phase === STATUS_TYPE.STOPPED) {
      this.startNotebook(notebook);
    } else {
      this.stopNotebook(notebook);
    }
  }

  public startNotebook(notebook: NotebookProcessedObject) {
    this.actions
      .startNotebook(notebook.namespace, notebook.name)
      .subscribe(_ => {
        notebook.status.phase = STATUS_TYPE.WAITING;
        notebook.status.message = 'Starting the Notebook Server.';
        this.updateNotebookFields(notebook);
      });
  }

  public stopNotebook(notebook: NotebookProcessedObject) {
    this.actions
      .stopNotebook(notebook.namespace, notebook.name)
      .subscribe(result => {
        if (result !== DIALOG_RESP.ACCEPT) {
          return;
        }

        notebook.status.phase = STATUS_TYPE.WAITING;
        notebook.status.message = 'Preparing to stop the Notebook Server.';
        this.updateNotebookFields(notebook);
      });
  }

  // Data processing functions
  updateNotebookFields(notebook: NotebookProcessedObject) {
    /* Lance - Begin 0906 */
    notebook.setTemplateAction = this.processSetTemplateActionStatus(notebook);
    notebook.removeTemplateAction = this.processRemoveTemplateActionStatus(notebook);
    notebook.shareAction = STATUS_TYPE.READY;
    /* Lance - End 0906 */
    notebook.deleteAction = this.processDeletionActionStatus(notebook);
    notebook.connectAction = this.processConnectActionStatus(notebook);
    notebook.startStopAction = this.processStartStopActionStatus(notebook);
    notebook.link = {
      text: notebook.name,
      url: `/notebook/details/${notebook.namespace}/${notebook.name}`,
    };
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

  /* Lance - Begin 0906 */
  public templateClicked(notebook: NotebookProcessedObject) {
    if (notebook.isTemplate === 'yes') {
      this.disableTemplateNotebook(notebook);
    } else {
      this.enableTemplateNotebook(notebook);
    }
  }

  public enableTemplateNotebook(notebook: NotebookProcessedObject) {
    
    const config: SnackBarConfig = {
      data: {
        msg: $localize`Set Notebook as template '${notebook.name}'...`,
        snackType: SnackType.Info,
      },
      duration: 1000,
    };
    this.snackBar.open(config);

    /* Lance -0906 */
    /*
    this.snackBar.open(
      $localize`Set Notebook as template '${notebook.name}'...`,
      SnackType.Info,
      1000,
    );
    */
    notebook.status.phase = STATUS_TYPE.WAITING;
    notebook.status.message = 'Set Notebook as template...';
    this.updateNotebookFields(notebook);

    this.backend.enableTemplateNotebook(notebook).subscribe(() => {
      // this.poller.reset();
      // alert("enableTemplateNotebook");
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
          // Lance
          // this.poller.reset();
          // alert('disableTemplateNotebook');
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

        /* Lance - begin 20240906 */
        const config: SnackBarConfig = {
          data: {
            msg: $localize`Disable Notebook as template '${notebook.name}'...`,
            snackType: SnackType.Info,
          },
          duration: 1000,
        };
        this.snackBar.open(config);
        /*
        this.snackBar.open(
          $localize`Disable Notebook as template '${notebook.name}'...`,
          SnackType.Info,
          1000,
        );
        */
        /* Lance - end 20240906 */

        notebook.status.phase = STATUS_TYPE.TERMINATING;
        notebook.status.message = 'Preparing to disable the Notebook as template...';
        this.updateNotebookFields(notebook);
      });
    });
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

  processSetTemplateActionStatus(notebook: NotebookProcessedObject) {

    // if (notebook.jsonStr === null) 
    //  return STATUS_TYPE.TERMINATING;
    
    // alert(notebook.name + ' ' + notebook.isTemplate);

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
  /* Lance - End 0906 */

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

  public notebookTrackByFn(index: number, notebook: NotebookProcessedObject) {
    return `${notebook.name}/${notebook.image}`;
  }

  search(event: any) {
    
    this.currentField = event;
    // alert(this.currentField)
    this.processedData = this.processIncomingData(this.rawData.filter((notebook) => {
      console.log(notebook.name);
      return (
        notebook.name.includes(this.currentField) ||
        notebook.namespace.includes(this.currentField) ||
        notebook.image.includes(this.currentField)
      );
    }));
  
    // Lance, not sure what poller will do
    // this.poller.reset();
  };
}
