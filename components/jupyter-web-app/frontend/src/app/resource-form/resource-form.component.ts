import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NamespaceService } from "../services/namespace.service";
import { KubernetesService } from "../services/kubernetes.service";
import { Router } from "@angular/router";
import { catchError, map } from "rxjs/operators";
import { Subscription, throwError, of } from "rxjs";
import { Volume, Config, ConfigVolume, SnackType } from "../utils/types";
import { SnackBarService } from "../services/snack-bar.service";
import { getFormDefaults, initFormControls } from "../utils/common";

@Component({
  selector: "app-resource-form",
  templateUrl: "./resource-form.component.html",
  styleUrls: ["./resource-form.component.scss"]
})
export class ResourceFormComponent implements OnInit, OnDestroy {
  currNamespace = "";
  formCtrl: FormGroup;
  config: Config;

  ephemeral = false;
  defaultStorageclass = false;
  formReady = false;
  pvcs: Volume[] = [];

  subscriptions = new Subscription();

  constructor(
    private namespaceService: NamespaceService,
    private k8s: KubernetesService,
    private router: Router,
    private popup: SnackBarService
  ) {
    // Init the form
  }

  ngOnInit() {
    // Initialize the form control
    this.formCtrl = getFormDefaults();

    // Update the form Values from the default ones
    this.k8s.getConfig().subscribe(config => {
      if (Object.keys(config).length === 0) {
        // Don't fire on empty config
        return;
      }

      this.config = config;
      initFormControls(this.formCtrl, config);
    });

    // Keep track of the selected namespace
    this.subscriptions.add(
      this.namespaceService.getSelectedNamespace().subscribe(namespace => {
        this.currNamespace = namespace;
        this.formCtrl.controls.namespace.setValue(this.currNamespace);

        this.updatePVCs(namespace);
      })
    );

    // Check if a default StorageClass is set
    this.k8s.getDefaultStorageClass().subscribe(defaultClass => {
      if (defaultClass.length === 0) {
        this.defaultStorageclass = false;
        this.popup.show(
          "No default Storage Class is set. Can't create new Disks for the " +
            "new Notebook. Please use an Existing Disk.",
          SnackType.Warning,
          0
        );
      } else {
        this.defaultStorageclass = true;
      }
    });
  }

  ngOnDestroy() {
    // Unsubscriptions
    this.subscriptions.unsubscribe();
  }

  public updatePVCs(namespace: string) {
    this.subscriptions.add(
      this.k8s.getVolumes(namespace).subscribe(pvcs => {
        this.pvcs = pvcs;
      })
    );
  }

  public onSubmit() {
    this.formCtrl.updateValueAndValidity();
    // Create a deep copy of the Form's Values
    const nb = JSON.parse(JSON.stringify(this.formCtrl.value));

    console.log(nb, this.formCtrl.valid);
    this.k8s
      .postResource(nb)
      .pipe(catchError(_ => of("failed")))
      .subscribe(resp => {
        console.log(resp);
        if (resp === "posted") {
          this.router.navigate(["/"]);
        } else if (resp === "failed") {
          this.updatePVCs(this.currNamespace);
        }
      });
  }
}
