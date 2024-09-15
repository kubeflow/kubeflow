import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { environment } from '@app/environment';
import { V1PersistentVolumeClaim, V1Pod } from '@kubernetes/client-node';
import { ChipDescriptor, PollerService, UrlItem } from 'kubeflow';
import { Subscription } from 'rxjs';
import { VWABackendService } from 'src/app/services/backend.service';
import { LinkGroup } from './link-groups-table/types';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, OnDestroy {
  public accessModes: ChipDescriptor[];
  public ownerRefs: ChipDescriptor[];
  public podGroups: LinkGroup[] = [];
  public podGroupsLoaded = false;
  public env = environment;
  public podsMountedError: string;

  pollSub = new Subscription();

  private prvPvc: V1PersistentVolumeClaim;

  @Input()
  set pvc(pvc: V1PersistentVolumeClaim) {
    this.prvPvc = pvc;

    if (!pvc) {
      return;
    }

    this.pollPodGroups(pvc);
    this.accessModes = this.generateAccessModes(pvc);
    this.ownerRefs = this.generateOwnerRefs(pvc);
  }
  get pvc() {
    return this.prvPvc;
  }

  private pollPodGroups(pvc: V1PersistentVolumeClaim) {
    this.pollSub.unsubscribe();

    const request = this.backend.getPodsUsingPVC(pvc);

    this.pollSub = this.poller.exponential(request).subscribe(
      pods => {
        this.podGroupsLoaded = true;
        this.podGroups = this.generatePodGroups(pods, this.env.viewerUrl);
      },
      error => {
        this.podGroupsLoaded = true;
        this.podsMountedError = error;
      },
    );
  }

  private generatePodGroups(pods: V1Pod[], viewerUrl: string): LinkGroup[] {
    const podObjects = pods
      .map(pod => this.getPodDetails(pod))
      .filter(podObj => podObj !== null);
    const podGroups: LinkGroup[] = [];
    for (const podObj of podObjects) {
      const index = podGroups.findIndex(
        group => group.name === podObj.groupName,
      );
      const podLink = this.newPodLink(
        podObj.podName,
        podObj.namespace,
        podObj.groupName,
        viewerUrl,
      );
      if (index < 0) {
        podGroups.push(this.newPodGroup(podLink, podObj.groupName));
      } else {
        podGroups[index].links.push(podLink);
      }
    }
    return podGroups;
  }

  private getPodDetails(pod: V1Pod): {
    podName: string;
    groupName: string;
    namespace: string;
  } {
    const labels = pod.metadata.labels;
    const namespace = pod.metadata.namespace;
    if ('serving.kubeflow.org/inferenceservice' in labels) {
      const component = labels.component;
      const podName =
        labels['serving.kubeflow.org/inferenceservice'] +
        ' (' +
        component +
        ')';
      const groupName = 'InferenceService';
      return { podName, groupName, namespace };
    } else if ('notebook-name' in labels) {
      const podName = labels['notebook-name'];
      const groupName = 'Notebooks';
      return { podName, groupName, namespace };
    } else {
      return null;
    }
  }

  private newPodGroup(podLink: UrlItem, groupName: string): LinkGroup {
    const podsGroup: LinkGroup = {
      name: groupName,
      links: [podLink],
    };
    return podsGroup;
  }

  private newPodLink(
    podName: string,
    namespace: string,
    groupName: string,
    viewerUrl: string,
  ): UrlItem {
    let url = '';

    if (groupName === 'Notebooks') {
      url = `${viewerUrl}/jupyter/notebook/details/${namespace}/${podName}/`;
    } else if (groupName === 'InferenceService') {
      // Remove (component) from podName
      const serviceName = podName.replace(/ *\([^)]*\) */g, '');
      url = `${viewerUrl}/models/details/${namespace}/${serviceName}/`;
    }

    return { name: podName, url };
  }

  private generateAccessModes(pvc: V1PersistentVolumeClaim): ChipDescriptor[] {
    const modes = pvc?.status?.accessModes || pvc?.spec?.accessModes || [];
    const chips = [];
    for (const mode of modes) {
      if (mode) {
        chips.push({
          value: mode,
          color: 'primary',
        });
      }
    }
    return chips;
  }

  private generateOwnerRefs(pvc: V1PersistentVolumeClaim): ChipDescriptor[] {
    const chips = [];
    if (pvc?.metadata?.ownerReferences) {
      for (const ref of pvc.metadata.ownerReferences) {
        chips.push({
          value: `${ref.kind}: ${ref.name}`,
          color: 'primary',
        });
      }
    }
    return chips;
  }

  get size(): string {
    return this.getSize(this.pvc);
  }

  getSize(pvc: V1PersistentVolumeClaim): string {
    return (
      pvc?.status?.capacity?.storage ||
      pvc?.spec?.resources?.requests?.storage ||
      'null'
    );
  }

  get storageClass(): string {
    return this.getStorageClass(this.pvc);
  }

  getStorageClass(pvc: V1PersistentVolumeClaim): string {
    return pvc?.spec?.storageClassName || 'null';
  }

  get volumeMode(): string {
    return this.getVolumeMode(this.pvc);
  }

  getVolumeMode(pvc: V1PersistentVolumeClaim): string {
    return pvc?.spec?.volumeMode || 'null';
  }

  get volumeName(): string {
    return this.getVolumeName(this.pvc);
  }

  getVolumeName(pvc: V1PersistentVolumeClaim): string {
    return pvc?.spec?.volumeName || 'null';
  }

  get ownerReferencesNotEmpty(): boolean {
    return this.getOwnerReferencesNotEmpty(this.pvc);
  }

  getOwnerReferencesNotEmpty(pvc: V1PersistentVolumeClaim): boolean {
    if (!pvc?.metadata?.ownerReferences) {
      return false;
    }
    return pvc.metadata.ownerReferences.length > 0;
  }

  get podsMountedMessage(): string {
    return this.getPodsMountedMessage(this.podsMountedError);
  }

  getPodsMountedMessage(error: string): string {
    if (!error) {
      return 'No pods are using this PVC.';
    } else {
      return `Failed to fetch mounted pods with error: ${error}`;
    }
  }

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
}
