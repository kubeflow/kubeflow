import { Component, Input, OnInit, TrackByFunction } from '@angular/core';
import { ChipDescriptor, UrlItem } from 'kubeflow';
import { VolumesGroup } from './types';
import { PVCS } from '../volumes.constants';

@Component({
  selector: 'app-volumes',
  templateUrl: './volumes.component.html',
  styleUrls: ['./volumes.component.scss'],
})
export class VolumesComponent implements OnInit {
  private prvVolGroups: VolumesGroup[];
  @Input()
  set volGroups(groups: VolumesGroup[]) {
    this.prvVolGroups = groups;
  }
  get volGroups() {
    return this.prvVolGroups;
  }
  @Input() loadErrorMsg = 'Resources not available';
  @Input() loadCompleted = false;

  volGroupsEmpty(): boolean {
    return this.volGroups?.length === 0;
  }

  isPVCs(group: VolumesGroup): boolean {
    return group.name === PVCS;
  }

  groupTrackByFn: TrackByFunction<VolumesGroup> = (
    id: number,
    group: VolumesGroup,
  ) => JSON.stringify(group);

  chipTrackByFn: TrackByFunction<ChipDescriptor> = (
    id: number,
    chip: ChipDescriptor,
  ) => chip.value;

  constructor() {}

  ngOnInit(): void {}
}
