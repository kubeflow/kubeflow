import { Component, Input, OnInit } from '@angular/core';
import { Event } from '@angular/router';
import { V1Pod } from '@kubernetes/client-node';
import { dump } from 'js-yaml';
import { NotebookRawObject } from 'src/app/types';

@Component({
  selector: 'app-yaml',
  templateUrl: './yaml.component.html',
  styleUrls: ['./yaml.component.scss'],
})
export class YamlComponent implements OnInit {
  public yaml: string;
  public selection = 'notebook';
  public infoMessage = 'Show the full YAML of the ';
  private podYaml = 'Pod information is still being loaded.';
  private prvPod: V1Pod;

  @Input() podRequestCompleted = false;
  @Input() notebook: NotebookRawObject;
  @Input()
  set pod(pod: V1Pod) {
    this.prvPod = pod;

    if (!pod && !this.podRequestCompleted) {
      this.podYaml = 'Pod information is still being loaded.';
      return;
    }

    if (!pod) {
      this.podYaml = 'No pod available for this notebook.';
      if (this.selection === 'pod') {
        this.yaml = this.podYaml;
      }
      return;
    }

    this.podYaml = dump(this.pod);
    if (this.podYaml !== this.yaml && this.selection === 'pod') {
      this.yaml = this.podYaml;
    }
  }
  get pod() {
    return this.prvPod;
  }

  selectionChanged(option: Event) {
    const value = 'value';
    if (option[value] === 'notebook') {
      this.selection = 'notebook';
      this.yaml = this.notebookYaml;
    } else if (option[value] === 'pod') {
      this.selection = 'pod';
      this.yaml = this.podYaml;
    }
  }

  get notebookYaml() {
    if (!this.notebook) {
      return 'No data has been found...';
    }

    return dump(this.notebook);
  }

  ngOnInit() {
    this.yaml = this.notebookYaml;
  }
}
