import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { V1EnvVar, V1Pod } from '@kubernetes/client-node';
import { ChipDescriptor, PollerService, STATUS_TYPE } from 'kubeflow';
import { Subscription } from 'rxjs';
import { JWABackendService } from 'src/app/services/backend.service';
import { NotebookRawObject, PodDefault } from 'src/app/types';
import { EnvironmentVariablesGroup } from '../../../types/environmentVariablesGroup';
import { Configuration } from 'src/app/types/configuration';
import { isEqual, get } from 'lodash-es';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, OnDestroy {
  public volumes: ChipDescriptor[];
  private notebookEnv: ChipDescriptor[];
  public configurations: Configuration[] = [];
  private podDefaults: PodDefault[];
  public envGroups: EnvironmentVariablesGroup[] = [];

  private prvNotebook: NotebookRawObject;
  private prvPod: V1Pod;
  private pollSub = new Subscription();

  @Input() notebookStatus: STATUS_TYPE;

  @Input()
  set notebook(nb: NotebookRawObject) {
    this.prvNotebook = nb;

    this.volumes = this.generateVolumes(nb);
    this.generatePodDefaults(nb);
    this.notebookEnv = this.generateEnv(nb);
  }
  get notebook(): NotebookRawObject {
    return this.prvNotebook;
  }

  @Input()
  set pod(pod: V1Pod) {
    if (!pod) {
      this.prvPod = pod;
      this.removePodEnvGroups();
      return;
    }

    this.prvPod = pod;
    this.generatePodEnv(pod);
  }
  get pod(): V1Pod {
    return this.prvPod;
  }

  @Input() podRequestCompleted = false;

  get podDefaultsMessage() {
    return this.getPodDefaultsMessage(
      this.podRequestCompleted,
      this.configurations,
    );
  }

  getPodDefaultsMessage(
    podRequestCompleted: boolean,
    configurations: Configuration[],
  ) {
    if (podRequestCompleted === true && configurations.length === 0) {
      return 'No configurations available for this notebook.';
    }
  }

  get notebookType(): string {
    return this.getNotebookType(this.notebook);
  }

  getNotebookType(notebook: NotebookRawObject): string {
    if (
      !notebook?.metadata?.annotations['notebooks.kubeflow.org/server-type']
    ) {
      return 'empty';
    }
    const type =
      notebook.metadata.annotations['notebooks.kubeflow.org/server-type'];
    if (type === 'group-two') {
      return 'RStudio';
    } else if (type === 'group-one') {
      return 'VSCode';
    } else if (type === 'jupyter') {
      return 'JupyterLab';
    } else {
      return type;
    }
  }

  get podDefaultsNotEmpty() {
    return this.getPodDefaultsNotEmpty(this.podDefaults);
  }

  getPodDefaultsNotEmpty(podDefaults: PodDefault[]) {
    if (podDefaults?.length === 0) {
      return false;
    }
    return true;
  }

  get sharedMemory(): string {
    return this.getSharedMemory(this.notebook);
  }

  getSharedMemory(notebook: NotebookRawObject): string {
    if (!notebook?.spec?.template?.spec?.volumes) {
      return 'null';
    }
    for (const volume of notebook.spec.template.spec.volumes) {
      if (volume.name === 'dshm') {
        return 'Yes';
      }
    }
    return 'No';
  }

  get cpuLimits(): string {
    return this.getCpuLimits(this.notebook);
  }

  getCpuLimits(notebook: NotebookRawObject): string {
    if (!notebook?.spec?.template?.spec?.containers) {
      return null;
    }
    for (const cn of notebook.spec.template.spec.containers) {
      if (cn.name !== notebook.metadata.name) {
        continue;
      }
      if (!cn.resources.limits) {
        return null;
      }
      return cn.resources.limits?.cpu;
    }
  }

  get cpuRequests(): string {
    return this.getCpuRequest(this.notebook);
  }

  getCpuRequest(notebook: NotebookRawObject): string {
    if (!notebook?.spec?.template?.spec?.containers) {
      return null;
    }
    for (const cn of notebook.spec.template.spec.containers) {
      if (cn.name !== notebook.metadata.name) {
        continue;
      }
      if (!cn.resources.requests) {
        return null;
      }
      return cn.resources.requests?.cpu;
    }
  }

  get memoryRequests(): string {
    return this.getMemoryRequests(this.notebook);
  }

  getMemoryRequests(notebook: NotebookRawObject): string {
    if (!notebook?.spec?.template?.spec?.containers) {
      return null;
    }
    for (const cn of notebook.spec.template.spec.containers) {
      if (cn.name !== notebook.metadata.name) {
        continue;
      }
      if (!cn.resources.requests) {
        return null;
      }
      return cn.resources.requests?.memory;
    }
  }

  get memoryLimits(): string {
    return this.getMemoryLimits(this.notebook);
  }

  getMemoryLimits(notebook: NotebookRawObject): string {
    if (!notebook?.spec?.template?.spec?.containers) {
      return null;
    }
    for (const cn of notebook.spec.template.spec.containers) {
      if (cn.name !== notebook.metadata.name) {
        continue;
      }
      if (!cn.resources.requests) {
        return null;
      }
      return cn.resources.limits?.memory;
    }
  }

  get dockerImage(): string {
    return this.getDockerImage(this.notebook);
  }

  getDockerImage(notebook: NotebookRawObject): string {
    if (!notebook?.spec?.template?.spec?.containers) {
      return null;
    }
    for (const container of notebook.spec.template.spec.containers) {
      if (container.name === notebook.metadata.name) {
        return container.image;
      }
    }
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

  private generatePodDefaults(nb: NotebookRawObject) {
    const configurations = [];

    this.pollSub.unsubscribe();

    const request = this.backend.getPodDefaults(nb.metadata.namespace);

    this.pollSub = this.poller.exponential(request).subscribe(podDefaults => {
      for (const pd of podDefaults) {
        for (const label in nb.metadata.labels) {
          if (label === Object.keys(pd.spec.selector.matchLabels)[0]) {
            configurations.push(this.getPodDefaultConfiguration(pd));
          }
        }
      }
      this.configurations = configurations;
      this.podDefaults = podDefaults;
      this.generatePodEnv(this.pod);
    });
  }

  private getPodDefaultConfiguration(pd: PodDefault) {
    const configuration = {
      name: pd.metadata.name,
      Description: pd.spec.desc,
      Selector: pd.spec.selector,
      Env: pd.spec.env,
      Volumes: pd.spec.volumes,
      VolumeMounts: pd.spec.volumeMounts,
      ServiceAccountName: pd.spec.serviceAccountName,
    };

    return configuration;
  }

  private generateVolumes(nb: NotebookRawObject): ChipDescriptor[] {
    const chips = [];
    for (const volume of nb.spec.template.spec.volumes) {
      if (volume.persistentVolumeClaim) {
        chips.push({
          value: volume.persistentVolumeClaim.claimName,
          color: 'primary',
        });
      }
    }
    return chips;
  }

  private generateEnv(nb: NotebookRawObject): ChipDescriptor[] {
    for (const cn of nb.spec.template.spec.containers) {
      if (cn.name !== nb.metadata.name) {
        continue;
      }

      if (!cn.env) {
        return null;
      }

      const envGroup: EnvironmentVariablesGroup = {
        name: 'Notebook CR',
        chipsList: [],
      };
      for (const envVar of cn.env) {
        envGroup.chipsList.push(this.getEnvVarChip(envVar));
      }

      this.addEnvGroup(envGroup);

      return envGroup.chipsList;
    }
  }

  private generatePodEnv(pod: V1Pod): ChipDescriptor[] {
    if (!this.podDefaults || !pod) {
      return;
    }
    for (const cn of pod.spec.containers) {
      if (cn.name !== pod.metadata.labels['notebook-name']) {
        continue;
      }

      if (!cn.env) {
        return null;
      }

      this.initializePodEnvGroups();

      envLoop: for (const envVar of cn.env) {
        // Skip EnvVars set from Notebook CR
        const envChip = `${envVar.name}: ${envVar.value}`;
        if (this.notebookEnv?.map(env => env.value).includes(envChip)) {
          continue envLoop;
        }

        // Classify Enviornment Variable according to Configurations - Pod Defaults
        for (const envGroup of this.envGroups) {
          if (!envGroup.configuration) {
            continue;
          }

          if (this.envExistsInGroupConfiguration(envVar, envGroup)) {
            this.addEnvToGroup(envVar, envGroup);
            continue envLoop;
          }
        }

        const other = this.envGroups.filter(
          envGroup => envGroup.name === 'Other',
        )[0];
        this.addEnvToGroup(envVar, other);
      }

      this.cleanEmptyEnvGroups();
    }
  }

  private initializePodEnvGroups() {
    // Initialize Environment Variables Groups
    for (const configuration of this.podDefaults) {
      const envVarGroup: EnvironmentVariablesGroup = {
        name: `${configuration.metadata.name} (Configuration)`,
        configuration,
        chipsList: [],
      };
      this.addEnvGroup(envVarGroup);
    }
    const envGroup: EnvironmentVariablesGroup = {
      name: 'Other',
      chipsList: [],
    };
    this.addEnvGroup(envGroup);
  }

  private removePodEnvGroups() {
    if (!this.podDefaults) {
      return;
    }
    for (const group of this.envGroups) {
      const name = group.name.replace(' (Configuration)', '');
      if (
        this.podDefaults.map(pd => pd.metadata.name).includes(name) ||
        name === 'Other'
      ) {
        this.envGroups = this.envGroups.filter(
          envGroup => envGroup.name !== group.name,
        );
      }
    }
  }

  private cleanEmptyEnvGroups() {
    this.envGroups = this.envGroups.filter(
      envGroup => envGroup.chipsList.length !== 0,
    );
  }

  private addEnvGroup(envGroup: EnvironmentVariablesGroup) {
    const index = this.envGroups.findIndex(
      group => group.name === envGroup.name,
    );
    if (index < 0) {
      this.envGroups.push(envGroup);
    } else if (isEqual(this.envGroups[index], envGroup)) {
      return;
    } else {
      this.envGroups[index] = envGroup;
    }
  }

  private envExistsInGroupConfiguration(
    envVar: V1EnvVar,
    envGroup: EnvironmentVariablesGroup,
  ): boolean {
    if (
      envGroup.configuration?.spec.env
        .map(env => env.name)
        .includes(envVar.name)
    ) {
      return true;
    }
    return false;
  }

  private addEnvToGroup(env: V1EnvVar, group: EnvironmentVariablesGroup) {
    const envValue = this.getEnvVarChip(env);
    if (group.chipsList.map(chip => chip.value).includes(envValue.value)) {
      return;
    } else {
      group.chipsList.push(envValue);
      return;
    }
  }

  private getEnvVarChip(envVar: V1EnvVar): ChipDescriptor {
    if (envVar.value) {
      return {
        value: `${envVar.name}: ${envVar.value}`,
        color: 'primary',
      };
    } else if (envVar.valueFrom) {
      const path = envVar.valueFrom.fieldRef.fieldPath;
      const envValue = get(this.pod, path);
      return {
        value: `${envVar.name}: ${envValue}`,
        color: 'primary',
      };
    }
  }
}
