import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PodDefault } from 'src/app/types';
import { Subscription } from 'rxjs';
import { NamespaceService } from 'kubeflow';
import { TWABackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-form-configurations',
  templateUrl: './form-configurations.component.html',
  styleUrls: ['./form-configurations.component.scss'],
})
export class FormConfigurationsComponent implements OnInit, OnDestroy {
  podDefaults: PodDefault[];
  subscriptions = new Subscription();

  @Input() parentForm: FormGroup;

  constructor(public ns: NamespaceService, public backend: TWABackendService) {}

  ngOnInit() {
    // Keep track of the selected namespace
    const nsSub = this.ns.getSelectedNamespace().subscribe(namespace => {
      // Get the PodDefaults of the new Namespace
      this.backend.getPodDefaults(namespace).subscribe(pds => {
        this.podDefaults = pds;
      });
    });

    this.subscriptions.add(nsSub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
