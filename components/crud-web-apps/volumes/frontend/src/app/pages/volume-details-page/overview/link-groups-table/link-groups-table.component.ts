import { Component, Input, OnInit, TrackByFunction } from '@angular/core';
import { UrlItem } from 'kubeflow';
import { LinkGroup } from './types';

@Component({
  selector: 'app-link-groups-table',
  templateUrl: './link-groups-table.component.html',
  styleUrls: ['./link-groups-table.component.scss'],
})
export class LinkGroupsTableComponent implements OnInit {
  private prvLinkGroups: LinkGroup[];
  @Input()
  set linkGroups(groups: LinkGroup[]) {
    this.prvLinkGroups = groups;
  }
  get linkGroups() {
    return this.prvLinkGroups;
  }

  @Input() loadErrorMsg = 'Resources not available';
  @Input() loadCompleted = false;

  linkGroupsEmpty() {
    if (this.linkGroups?.length === 0) {
      return true;
    }
    return false;
  }

  buttonNavigate(url: string) {
    const directories = url.split('/');
    const pvcName = directories[directories.length - 2];
    window.open(url, `${pvcName}: Edit file contents`, 'height=600,width=800');
  }

  constructor() {}

  ngOnInit(): void {}

  groupTrackByFn(group: LinkGroup) {
    return JSON.stringify(group);
  }

  linkTrackByFn: TrackByFunction<UrlItem> = (id: number, link: UrlItem) =>
    link.name;
}
