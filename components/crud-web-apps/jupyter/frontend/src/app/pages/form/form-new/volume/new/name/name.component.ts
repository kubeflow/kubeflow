import { Component, Input, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

const NB_NAME_SUBST = '{notebook-name}';

@Component({
  selector: 'app-volume-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss'],
})
export class VolumeNameComponent implements OnDestroy {
  private templatedName = '';
  private subs = new Subscription();
  private group: FormGroup;
  private externalNamePrv = '';

  @Input()
  get metadataGroup(): FormGroup {
    return this.group;
  }
  set metadataGroup(meta: FormGroup) {
    this.group = meta;
    this.subs.unsubscribe();

    // substitute {notebook-name}
    const nameCtrl = this.getNameCtrl(this.metadataGroup);

    // update the templated path, with the new initial value
    this.templatedName = nameCtrl.value;

    // set the form's value based on the templated name
    setTimeout(() => {
      nameCtrl.setValue(
        this.templatedName.replace(NB_NAME_SUBST, this.externalName),
      );
    });
  }

  @Input()
  get externalName(): string {
    return this.externalNamePrv;
  }
  set externalName(name) {
    this.externalNamePrv = name;
    if (!name) {
      return;
    }

    const nameCtrl = this.getNameCtrl(this.metadataGroup);
    if (nameCtrl.dirty) {
      return;
    }

    // to avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      nameCtrl.setValue(this.templatedName.replace(NB_NAME_SUBST, name));
    });
  }

  constructor() {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private getNameCtrl(metadata: FormGroup): AbstractControl {
    if (metadata.contains('name')) {
      return metadata.get('name');
    }

    if (metadata.contains('generateName')) {
      return metadata.get('generateName');
    }
  }
}
