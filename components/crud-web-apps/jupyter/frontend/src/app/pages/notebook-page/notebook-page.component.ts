import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NamespaceService,
  STATUS_TYPE,
  ToolbarButton,
  PollerService,
} from 'kubeflow';
import { JWABackendService } from 'src/app/services/backend.service';
import { Subscription } from 'rxjs';
import { NotebookRawObject } from 'src/app/types';
import { ActivatedRoute, Router } from '@angular/router';
import { V1Pod } from '@kubernetes/client-node';

@Component({
  selector: 'app-notebook-page',
  templateUrl: './notebook-page.component.html',
  styleUrls: ['./notebook-page.component.scss'],
})
export class NotebookPageComponent implements OnInit, OnDestroy {
  public notebookName: string;
  public namespace: string;
  public notebook: NotebookRawObject;
  public notebookPod: V1Pod;
  public notebookInfoLoaded = false;
  public notebookStateChanging = false;
  public podRequestCompleted = false;
  public podRequestError = '';
  public buttonsConfig: ToolbarButton[] = [];

  pollSubNotebook = new Subscription();
  pollSubPod = new Subscription();

  constructor(
    public ns: NamespaceService,
    public backend: JWABackendService,
    public poller: PollerService,
    public router: Router,

    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ns.updateSelectedNamespace(params.namespace);

      this.notebookName = params.notebookName;
      this.namespace = params.namespace;

      this.poll(this.namespace, this.notebookName);
    });
  }

  ngOnDestroy() {
    this.pollSubNotebook.unsubscribe();
    this.pollSubPod.unsubscribe();
  }

  private poll(namespace: string, notebook: string) {
    this.pollSubNotebook.unsubscribe();

    const request = this.backend.getNotebook(namespace, notebook);

    this.pollSubNotebook = this.poller.exponential(request).subscribe(nb => {
      this.notebook = this.processIncomingData(nb);
      this.getNotebookPod(nb);
      this.notebookInfoLoaded = true;
    });
  }

  private processIncomingData(notebook: NotebookRawObject) {
    const notebookCopy = JSON.parse(
      JSON.stringify(notebook),
    ) as NotebookRawObject;

    return notebookCopy;
  }

  private getNotebookPod(notebook: NotebookRawObject) {
    this.pollSubPod.unsubscribe();

    const request = this.backend.getNotebookPod(notebook);

    this.pollSubPod = this.poller.exponential(request).subscribe(
      pod => {
        this.notebookPod = pod;
        this.podRequestCompleted = true;
      },
      error => {
        this.podRequestError = error;
        this.notebookPod = null;
        this.podRequestCompleted = true;
      },
    );
  }

  navigateBack() {
    this.router.navigate(['/']);
  }

  get status(): STATUS_TYPE {
    const [status, state] = this.getStatusAndState(this.notebook);
    this.notebookStateChanging = state;
    return status;
  }

  getStatusAndState(
    notebook: NotebookRawObject,
  ): [status: STATUS_TYPE, state: boolean] {
    if (!notebook) {
      console.warn('warning');
      return [STATUS_TYPE.WARNING, null];
    }
    // Although containerState has a field called terminated,
    // field Waiting is set even when the Notebook is stopped.
    // and we need to check in the .annotations too

    // Check if the Notebook is terminating right now
    if (
      'kubeflow-resource-stopped' in notebook.metadata.annotations &&
      notebook.status.readyReplicas > 0
    ) {
      this.notebookStateChanging = true;
      return [STATUS_TYPE.TERMINATING, true];
    }

    // Check if the Notebook is stopped
    if ('kubeflow-resource-stopped' in notebook.metadata.annotations) {
      this.notebookStateChanging = false;
      return [STATUS_TYPE.STOPPED, false];
    }

    // Check if the Notebook is running
    if (notebook.status?.containerState?.running) {
      this.notebookStateChanging = false;
      return [STATUS_TYPE.READY, false];
    }

    if (notebook.status?.containerState?.waiting) {
      this.notebookStateChanging = true;
      return [STATUS_TYPE.WAITING, true];
    }

    return [STATUS_TYPE.UNINITIALIZED, true];
  }

  get statusIcon(): string {
    return this.getStatusIcon(this.status);
  }

  getStatusIcon(status: STATUS_TYPE): string {
    if (status === STATUS_TYPE.WARNING) {
      return 'warning';
    }
    if (status === STATUS_TYPE.WAITING || status === STATUS_TYPE.TERMINATING) {
      return 'timelapse';
    } else if (status === STATUS_TYPE.READY) {
      return 'check_circle';
    } else if (status === STATUS_TYPE.STOPPED) {
      return 'stop_circle';
    } else {
      return STATUS_TYPE.UNINITIALIZED;
    }
  }
}
