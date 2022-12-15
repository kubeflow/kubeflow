import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {
  FormGroup,
  ValidatorFn,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { NamespaceService } from 'kubeflow';
import { Subscription } from 'rxjs';
import { JWABackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-form-name',
  templateUrl: './form-name.component.html',
  styleUrls: ['./form-name.component.scss'],
})
export class FormNameComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  existingNotebooks: Set<string> = new Set<string>();

  @Input() parentForm: FormGroup;

  constructor(
    private backend: JWABackendService,
    private ns: NamespaceService,
  ) {}

  ngOnInit() {
    // Keep track of the existing Notebooks in the selected Namespace
    // Use these names to check if the input name exists
    const nsSub = this.ns.getSelectedNamespace().subscribe(ns => {
      this.backend.getNotebooks(ns).subscribe(notebooks => {
        this.existingNotebooks.clear();
        notebooks.map(nb => this.existingNotebooks.add(nb.name));
      });
    });

    this.subscriptions.add(nsSub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
