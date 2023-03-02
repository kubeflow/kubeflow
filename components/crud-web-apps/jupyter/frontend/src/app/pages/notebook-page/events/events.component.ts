import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PollerService } from 'kubeflow';
import { Subscription } from 'rxjs';
import { JWABackendService } from 'src/app/services/backend.service';
import { NotebookRawObject } from 'src/app/types';
import { EventObject } from 'src/app/types/event';
import { defaultConfig } from './config';
import { isEqual } from 'lodash-es';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit, OnDestroy {
  private events: EventObject[] = [];
  public processedEvents: EventObject[] = [];
  public config = defaultConfig;
  private pollSub = new Subscription();

  private prvNotebook: NotebookRawObject;
  @Input()
  set notebook(nb: NotebookRawObject) {
    this.prvNotebook = nb;
    this.poll(nb);
  }
  get notebook(): NotebookRawObject {
    return this.prvNotebook;
  }

  constructor(
    public backend: JWABackendService,
    public poller: PollerService,
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.pollSub) {
      this.pollSub.unsubscribe();
    }
  }

  private poll(notebook: NotebookRawObject) {
    this.pollSub.unsubscribe();

    const request = this.backend.getNotebookEvents(notebook);

    this.pollSub = this.poller.exponential(request).subscribe(events => {
      this.events = events;
      this.processEvents(events);
    });
  }

  processEvents(events: EventObject[]) {
    const eventsCopy = Array.from(events);
    for (const event of eventsCopy) {
      event.message = event.message.replace('Reissued from ', '');
    }
    if (isEqual(eventsCopy, this.processedEvents)) {
      return;
    }
    this.processedEvents = eventsCopy;
  }
}
