import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { V1PersistentVolumeClaim } from '@kubernetes/client-node';
import { PollerService } from 'kubeflow';
import { Subscription } from 'rxjs';
import { VWABackendService } from 'src/app/services/backend.service';
import { EventObject } from 'src/app/types/event';
import { defaultConfig } from './config';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit, OnDestroy {
  public events: EventObject[] = [];
  private prvPvc: V1PersistentVolumeClaim;

  config = defaultConfig;
  pollSub = new Subscription();

  constructor(
    public backend: VWABackendService,
    public poller: PollerService,
  ) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    if (this.pollSub) {
      this.pollSub.unsubscribe();
    }
  }

  @Input()
  set pvc(pvc: V1PersistentVolumeClaim) {
    this.prvPvc = pvc;
    this.poll(pvc);
  }
  get pvc(): V1PersistentVolumeClaim {
    return this.prvPvc;
  }

  private poll(pvc: V1PersistentVolumeClaim) {
    this.pollSub.unsubscribe();

    const request = this.backend.getPVCEvents(pvc);

    this.pollSub = this.poller.exponential(request).subscribe(events => {
      this.events = events;
    });
  }
}
