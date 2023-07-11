import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { JWABackendService } from 'src/app/services/backend.service';
import { Subscription } from 'rxjs';
import { PollerService } from 'kubeflow';
import { V1Pod } from '@kubernetes/client-node';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent implements OnInit, OnDestroy {
  public goToBottom = true;
  public logs: string[];
  public logsRequestCompleted = false;
  public loadErrorMsg = '';

  private pollingSub: Subscription;
  private prvPod: V1Pod;

  @Input() podRequestCompleted = false;

  @Input()
  set pod(pod: V1Pod) {
    this.prvPod = pod;

    if (!pod) {
      this.logs = null;
      this.logsRequestCompleted = true;
      return;
    }

    this.poll(pod);
  }
  get pod() {
    return this.prvPod;
  }

  private poll(pod: V1Pod) {
    if (this.pollingSub) {
      this.pollingSub.unsubscribe();
    }

    const request = this.backend.getPodLogs(pod);
    this.pollingSub = this.poller.exponential(request).subscribe(
      logs => {
        this.logs = logs;
        this.logsRequestCompleted = true;
        this.loadErrorMsg = '';
      },
      error => {
        this.logs = null;
        this.logsRequestCompleted = true;
        this.loadErrorMsg = error;
      },
    );
  }

  get logsLoading(): boolean {
    if (!this.podRequestCompleted) {
      return true;
    } else if (this.podRequestCompleted && !this.logsRequestCompleted) {
      return true;
    } else {
      return false;
    }
  }

  get logsEmpty(): boolean {
    return this.logs ? false : true;
  }

  constructor(
    public backend: JWABackendService,
    public poller: PollerService,
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    if (this.pollingSub) {
      this.pollingSub.unsubscribe();
    }
  }
}
