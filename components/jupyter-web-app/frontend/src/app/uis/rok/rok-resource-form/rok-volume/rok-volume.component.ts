import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Volume } from "src/app/utils/types";
import { Subscription } from "rxjs";
import { RokService } from "../../services/rok.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-rok-volume",
  templateUrl: "./rok-volume.component.html",
  styleUrls: ["./rok-volume.component.scss"]
})
export class RokVolumeComponent implements OnInit, OnDestroy {
  private volumePrv: FormGroup;
  private nbName = "";

  newPVC: Volume;
  existingPVCs: Volume[] = [];
  readOnly = false;

  subscriptions = new Subscription();

  // ----- @Input Parameters -----
  @Input()
  get volume() {
    return this.volumePrv;
  }
  set volume(volume: FormGroup) {
    this.volumeCtrlChanged(volume);
  }

  @Input()
  get notebookName() {
    return this.nbName;
  }
  set notebookName(nm: string) {
    this.notebookNameChanged(nm);
  }

  @Input()
  set ephemeral(b: boolean) {
    this.storageOptionChanged(b);
  }

  @Input() pvcs: Volume[];
  @Input() readonly: boolean;
  @Input() namespace: string;
  @Input() storageClasses: string[] = [];
  @Input() token: string;

  // ----- Get macros -----
  get selectedVolume(): Volume {
    return this.newPVC;
  }

  get selectedVolIsExistingType(): boolean {
    return this.volume.value.type === "Existing";
  }

  get newVolName(): string {
    return this.renderVolName(this.newPVC ? this.newPVC.name : "");
  }

  get newVolIsSelected() {
    return this.volume.controls.name.value === this.newVolName;
  }

  // ----- utility functions -----
  renderVolName(name: string): string {
    return name.replace("{notebook-name}", this.notebookName);
  }

  updateVolType(type): void {
    if (type === "Existing") {
      // Enable rok-url
      this.volume
        .get("extraFields")
        .get("rok-url")
        .enable();
    } else {
      this.volume
        .get("extraFields")
        .get("rok-url")
        .disable();
    }
  }

  updateVolValueFields(): void {
    if (this.selectedVolume.extraFields) {
      this.volume.controls.extraFields.setValue(
        this.selectedVolume.extraFields
      );
    }
  }

  autofillVolume(pasteEvent: ClipboardEvent = null) {
    let url = "";
    if (pasteEvent) {
      // Get the data from the Paste event if the user used copy/paste
      url = pasteEvent.clipboardData.getData("text");
    } else {
      url = this.volume.value.extraFields["rok-url"];
    }

    this.rok
      .getVolume(url, this.token)
      .pipe(first())
      .subscribe(vol => {
        this.volume.get("name").setValue(vol.name);
        this.volume.get("size").setValue(vol.size);
        this.volume.get("path").setValue(vol.path);
      });
  }

  // ----- Component Functions -----
  constructor(private rok: RokService) {}

  initSubscriptions() {
    // Re initialize the subscriptions var
    this.subscriptions.unsubscribe();
    this.subscriptions = new Subscription();

    // type
    this.subscriptions.add(
      this.volume.get("type").valueChanges.subscribe((type: string) => {
        this.selectedVolume.type = type;
        this.updateVolType(type);
      })
    );

    // rok-url
    this.subscriptions.add(
      this.volume
        .get("extraFields")
        .get("rok-url")
        .valueChanges.subscribe((url: string) => {
          this.selectedVolume.extraFields["rok-url"] = url;
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
    if (!this.newPVC) {
      return;
    }

    this.nbName = nm;
    this.volume.controls.name.setValue(this.newVolName);

    this.updateVolValueFields();
  }

  volumeCtrlChanged(vol: FormGroup): void {
    this.newPVC = vol.value;
    this.volumePrv = vol;

    const name = this.renderVolName(vol.value.name);
    this.volume.controls.name.setValue(name);
    this.updateVolType(vol.value.type);

    // Re initialize the subscriptions
    this.initSubscriptions();
  }

  storageOptionChanged(ephemeral: boolean): void {
    if (ephemeral) {
      // Disable all fields
      this.volume.controls.type.disable();
      this.volume.controls.extraFields.get("rok-url").disable();
      this.volume.controls.name.disable();
      this.volume.controls.size.disable();
      this.volume.controls.mode.disable();
    } else if (!ephemeral && !this.selectedVolIsExistingType) {
      // New
      this.volume.controls.type.enable();
      this.volume.controls.name.enable();
      this.volume.controls.size.enable();
      this.volume.controls.mode.enable();
    } else {
      // Existing
      this.volume.controls.extraFields.get("rok-url").enable();
    }
  }
}
