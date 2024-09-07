import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Config, NotebookFormObject } from 'src/app/types';
import { Subscription } from 'rxjs';
import {
  NamespaceService,
  SnackBarConfig,
  SnackBarService,
  SnackType,
} from 'kubeflow';
import { Router } from '@angular/router';
import { getFormDefaults, initFormControls } from './utils';
import { JWABackendService } from 'src/app/services/backend.service';

// Lance - begin - 20230817
import { isEqual } from 'lodash';
import { NotebookResponseObject, NotebookProcessedObject } from 'src/app/types';
import { MatDialog } from '@angular/material/dialog';
import { AddPostDialogComponent } from '../../index/index-default/add-post-dialog/add-post-dialog.component';

import {
  defaultAdvancedConfig,
  defaultConfig,
  // getDeleteDialogConfig,
  // getStopDialogConfig,
} from '../../index/index-default/config';
// Lance - end - 20230817


@Component({
  selector: 'app-form-new',
  templateUrl: './form-new.component.html',
  styleUrls: ['./form-new.component.scss'],
})
export class FormNewComponent implements OnInit, OnDestroy {
  /* Lance - begin - 20240907 */
  isBasic = true;
  isTeached = false;
  blockSubmit = false;
  // applying$ = new Subject <boolean>();
  configAdvance = defaultAdvancedConfig;
  /* Lance - end - 20240907 */

  // Lance - begin - 20230817
  rawData: NotebookResponseObject[] = [];
  processedData: NotebookProcessedObject[] = [];
  // Lance - end - 20230817

  currNamespace = '';
  formCtrl: FormGroup;
  config: Config;

  defaultStorageclass = false;

  subscriptions = new Subscription();

  constructor(
    public namespaceService: NamespaceService,
    public backend: JWABackendService,
    public router: Router,
    public popup: SnackBarService,
    /* Lance - begin - 20240907 */
    public dialog: MatDialog,
    /* Lance - end - 20240907 */
  ) {}

  ngOnInit(): void {
    // Initialize the form control
    this.formCtrl = this.getFormDefaults();

    // Update the form Values from the default ones
    this.backend.getConfig().subscribe(config => {
      if (Object.keys(config).length === 0) {
        // Don't fire on empty config
        return;
      }

      this.config = config;
      this.initFormControls(this.formCtrl, config);
    });

    // Keep track of the selected namespace
    this.subscriptions.add(
      this.namespaceService.getSelectedNamespace2().subscribe(namespace => {
        if (Array.isArray(namespace)) {
          this.goToNotebooks();
        } else {
          this.currNamespace = namespace;
          this.formCtrl.controls.namespace.setValue(this.currNamespace);
          this.isTeached = true;
          
          if (this.currNamespace) {
            // this.backend.getNotebooks(this.currNamespace).subscribe(notebooks => {
              this.backend.getAllNotebooks(this.currNamespace).subscribe(notebooks => {
              if (!isEqual(this.rawData, notebooks)) {
  
                /*
                for ( let nb of notebooks) {
                  if (nb.jsonStr === null) {
                    nb.isTemplate = 'no'
                  }
                }
                */
               
                this.rawData = notebooks;
  
                // Update the frontend's state
                this.processedData = this.processIncomingData(notebooks);
                // this.poller.reset();
              }
            });
          }
        }
      }),
    );

    // Check if a default StorageClass is set
    this.backend.getDefaultStorageClass().subscribe(defaultClass => {
      if (defaultClass.length === 0) {
        this.defaultStorageclass = false;
        const configWarning: SnackBarConfig = {
          data: {
            msg: $localize`No default Storage Class is set. Can't create new Disks for the new Notebook. Please use an Existing Disk.`,
            snackType: SnackType.Warning,
          },
          duration: 0,
        };
        this.popup.open(configWarning);
      } else {
        this.defaultStorageclass = true;
      }
    });
  }

  ngOnDestroy() {
    // Unsubscriptions
    this.subscriptions.unsubscribe();
  }

  // Functions for handling the Form Group of the entire Form
  getFormDefaults() {
    return getFormDefaults();
  }

  initFormControls(formCtrl: FormGroup, config: Config) {
    initFormControls(formCtrl, config);
  }

  // Form Actions
  getSubmitNotebook(): NotebookFormObject {
    const notebookCopy = this.formCtrl.value as NotebookFormObject;
    const notebook = JSON.parse(JSON.stringify(notebookCopy));

    // Use the custom image instead
    if (notebook.customImageCheck) {
      notebook.image = notebook.customImage;
    } else if (notebook.serverType === 'group-one') {
      // Set notebook image from imageGroupOne
      notebook.image = notebook.imageGroupOne;
    } else if (notebook.serverType === 'group-two') {
      // Set notebook image from imageGroupTwo
      notebook.image = notebook.imageGroupTwo;
    }

    // Remove unnecessary images from the request sent to the backend
    delete notebook.imageGroupOne;
    delete notebook.imageGroupTwo;

    // Ensure CPU input is a string
    if (typeof notebook.cpu === 'number') {
      notebook.cpu = notebook.cpu.toString();
    }

    // Ensure GPU input is a string
    if (notebook.gpus && typeof notebook.gpus.num === 'number') {
      notebook.gpus.num = notebook.gpus.num.toString();
    }

    // Remove cpuLimit from request if null
    if (notebook.cpuLimit == null) {
      delete notebook.cpuLimit;
      // Ensure CPU Limit input is a string
    } else if (typeof notebook.cpuLimit === 'number') {
      notebook.cpuLimit = notebook.cpuLimit.toString();
    }

    // Remove memoryLimit from request if null
    if (notebook.memoryLimit == null) {
      delete notebook.memoryLimit;
      // Add Gi to memoryLimit
    } else if (notebook.memoryLimit) {
      notebook.memoryLimit = notebook.memoryLimit.toString() + 'Gi';
    }

    // Add Gi to all sizes
    if (notebook.memory) {
      notebook.memory = notebook.memory.toString() + 'Gi';
    }

    for (const vol of notebook.datavols) {
      if (vol.size) {
        vol.size = vol.size + 'Gi';
      }
    }

    notebook.isTemplate = 'no';

    return notebook;
  }

  // Set the tooltip text based on form's validity
  setTooltipText(form: FormGroup): string {
    let text: string;
    if (!form.get('name').valid) {
      text = 'No value of the Notebook name was provided';
    } else if (!form.controls.valid) {
      text = 'The form contains invalid fields';
    }
    return text;
  }

  onSubmit() {
    const configInfo: SnackBarConfig = {
      data: {
        msg: 'Submitting new Notebook...',
        snackType: SnackType.Info,
      },
    };
    this.popup.open(configInfo);

    const notebook = this.getSubmitNotebook();
    this.backend.createNotebook(notebook).subscribe(() => {
      this.popup.close();
      const configSuccess: SnackBarConfig = {
        data: {
          msg: 'Notebook created successfully.',
          snackType: SnackType.Success,
        },
      };
      this.popup.open(configSuccess);
      this.goToNotebooks();
    });
  }

  onCancel() {
    this.goToNotebooks();
  }

  goToNotebooks() {
    this.router.navigate(['/']);
  }

  /* Lance - begin - 20240907 */
  onCreateNotebook(notebookCopy) {
    // alert(notebook);
    const notebookFormCopy = this.formCtrl.value as NotebookFormObject;
    const notebookForm = JSON.parse(JSON.stringify(notebookFormCopy));

    const notebook = JSON.parse(notebookCopy);
    notebook.name = notebookForm.name;
    notebook.origin_namespace = notebook.namespace
    notebook.namespace = this.currNamespace
    notebook.template = notebook.workspace.newPvc.metadata.name
    notebook.workspace.newPvc.metadata.name = notebookForm.name + "-volume";
    this.backend.createNotebook(notebook).subscribe(() => {
      this.popup.close();
      /* Lance */
      /*
      this.popup.open(
        'Notebook created successfully.',
        SnackType.Success,
        3000,
      );
      */
      const configSuccess: SnackBarConfig = {
        data: {
          msg: 'Notebook created successfully.',
          snackType: SnackType.Success,
        },
      };
      this.popup.open(configSuccess);
      this.router.navigate(['/']);
    });
  }

  showAddPostDialog(notebook: NotebookProcessedObject) {

    const ref = this.dialog.open(AddPostDialogComponent, {
      hasBackdrop: false,
      data: { notebook: notebook}
    });

    ref.afterClosed().subscribe(res => {
        window.location.reload();
        // alert("kkkkk");
    });

    
    //this.dialog.open(AddPostDialogComponent, {
    //  width: '600px',
    //  panelClass: 'form--dialog-padding',
    //});
  }

  onAdvanced() {
    this.isBasic = false;
    // Lance disable temp
    // this.applying$.next(true);
  }

  onEdit(notebook: NotebookProcessedObject) {
    this.showAddPostDialog(notebook);
  }

  processIncomingData(notebooks: NotebookResponseObject[]) {
    const notebooksCopy = JSON.parse(
      JSON.stringify(notebooks),
    ) as NotebookProcessedObject[];

    for (const nb of notebooksCopy) {
      // this.updateNotebookFields(nb);
      if (nb.jsonStr === null) {
      }
    }
    return notebooksCopy;
  }
  /* Lance - end - 20240907 */
}
