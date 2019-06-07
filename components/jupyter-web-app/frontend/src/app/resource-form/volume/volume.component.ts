import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Volume } from "src/app/utils/types";
import { Subscription } from "rxjs";

@Component({
  selector: "app-volume",
  templateUrl: "./volume.component.html",
  styleUrls: ["./volume.component.scss"]
})
export class VolumeComponent implements OnInit, OnDestroy {
  private _volume: FormGroup;
  private _notebookName = "";
  private _defaultStorageClass: boolean;
  private _readonly = true;

  currentPVC: Volume;
  existingPVCs: Set<string> = new Set();

  subscriptions = new Subscription();

  // ----- @Input Parameters -----
  @Input()
  get volume() {
    return this._volume;
  }
  set volume(volume: FormGroup) {
    this.volumeCtrlChanged(volume);
  }

  @Input()
  get notebookName() {
    return this._notebookName;
  }
  set notebookName(nm: string) {
    if (!this.readonly) {
      this.notebookNameChanged(nm);
    }
  }

  @Input()
  set ephemeral(b: boolean) {
    if (!this.readonly) {
      this.storageOptionChanged(b);
    }
  }

  @Input()
  get readonly(): boolean {
    return this._readonly;
  }
  set readonly(b) {
    if (b === null) {
      return;
    }

    this._readonly = b;

    if (this._readonly) {
      // Enable and disable to show the latest values
      this.subscriptions.unsubscribe();
      this.volume.enable();
      this.volume.get("name").setValue(this.currentPVC.name);
      this.volume.disable();
    }
  }

  @Input()
  set pvcs(data) {
    if (!this.readonly) {
      this.pvcsChanged(data);
    }
  }

  @Input()
  get defaultStorageClass() {
    return this._defaultStorageClass;
  }
  set defaultStorageClass(s: boolean) {
    // Update the current pvc type
    this._defaultStorageClass = s;

    if (!this.readonly) {
      this.updateVolInputFields();
    }
  }

  @Input() namespace: string;

  // ----- Get macros -----
  get selectedVolIsExistingType(): boolean {
    return (
      this.existingPVCs.has(this.volume.value.name) || !this.defaultStorageClass
    );
  }

  get currentVolName(): string {
    return this.renderVolName(this.currentPVC ? this.currentPVC.name : "");
  }

  // ----- utility functions -----
  renderVolName(name: string): string {
    return name.replace("{notebook-name}", this.notebookName);
  }

  setVolumeType(type: string) {
    this.currentPVC.type = type;
    if (type === "Existing") {
      this.volume.controls.size.disable();
      this.volume.controls.mode.disable();
    } else {
      this.volume.controls.size.enable();
      this.volume.controls.mode.enable();
    }
  }

  updateVolInputFields(): void {
    // Disable input fields according to volume type
    if (this.selectedVolIsExistingType) {
      // Disable all fields
      this.volume.controls.size.disable();
      this.volume.controls.mode.disable();
      this.volume.controls.type.setValue("Existing");
    } else {
      this.volume.controls.size.enable();
      this.volume.controls.mode.enable();
      this.volume.controls.type.setValue("New");
    }
  }

  // ----- Component Functions -----
  constructor() {}

  initSubscriptions() {
    // Re initialize the subscriptions var
    this.subscriptions.unsubscribe();
    this.subscriptions = new Subscription();

    // type
    this.subscriptions.add(
      this.volume.get("type").valueChanges.subscribe((type: string) => {
        this.setVolumeType(type);
      })
    );

    // name
    this.subscriptions.add(
      this.volume.get("name").valueChanges.subscribe((name: string) => {
        // Update the fields if the volume is an existing one
        this.volume.get("name").setValue(name, { emitEvent: false });
        this.updateVolInputFields();
      })
    );

    // size
    this.subscriptions.add(
      this.volume.get("size").valueChanges.subscribe((size: string) => {
        this.currentPVC.size = size;
      })
    );

    // mode
    this.subscriptions.add(
      this.volume.get("mode").valueChanges.subscribe((mode: string) => {
        this.currentPVC.mode = mode;
      })
    );
  }

  ngOnInit() {
    this.initSubscriptions();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  // ----- @Input change handling functions -----
  notebookNameChanged(nm: string): void {
    if (!this.currentPVC || this.readonly) {
      return;
    }

    this._notebookName = nm;
    this.volume.controls.name.setValue(this.currentVolName);

    this.updateVolInputFields();
  }

  volumeCtrlChanged(vol: FormGroup): void {
    this.currentPVC = vol.value;
    this._volume = vol;

    if (this.readonly) {
      this.subscriptions.unsubscribe();
      const name = vol.value.name;
      this.volume.controls.name.setValue(name, { emitEvent: false });
      this.volume.disable();
    } else {
      const name = this.renderVolName(vol.value.name);
      this.volume.controls.name.setValue(name, { emitEvent: false });

      this.updateVolInputFields();
      this.initSubscriptions();
    }
  }

  storageOptionChanged(ephemeral: boolean): void {
    if (ephemeral) {
      // Disable all fields
      this.volume.controls.type.disable();
      this.volume.controls.name.disable();
      this.volume.controls.size.disable();
      this.volume.controls.mode.disable();
    } else {
      this.volume.controls.type.enable();
      this.volume.controls.name.enable();
      this.updateVolInputFields();
    }
  }

  pvcsChanged(pvcs: Volume[]) {
    this.existingPVCs.clear();
    for (let pvc of pvcs) {
      this.existingPVCs.add(pvc.name);
    }

    if (!this.existingPVCs.has(this.currentVolName)) {
      this.updateVolInputFields();
    } else {
      // Also set the selected volume
      this.volume.controls.name.setValue(this.currentVolName);
      this.updateVolInputFields();
    }
  }
}
