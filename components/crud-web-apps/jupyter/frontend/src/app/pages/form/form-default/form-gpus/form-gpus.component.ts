import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GPUVendor } from 'src/app/types';
import { JWABackendService } from 'src/app/services/backend.service';
import { NotebookFormObject } from 'src/app/types';

@Component({
  selector: 'app-form-gpus',
  templateUrl: './form-gpus.component.html',
  styleUrls: ['./form-gpus.component.scss'],
})
export class FormGpusComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() vendors: GPUVendor[] = [];
  @Input() memoryVendors: GPUVendor[] = [];

  private gpuCtrl: FormGroup;
  public installedVendors = new Set<string>();

  subscriptions = new Subscription();

  constructor(public backend: JWABackendService) {}

  ngOnInit() {
    this.gpuCtrl = this.parentForm.get('gpus') as FormGroup;

    // Vendor should not be empty if the user selects GPUs num
    this.parentForm
      .get('gpus')
      .get('vendor')
      .setValidators([this.vendorWithNum()]);

    this.gpuCtrl.get('memory').disable();
    this.gpuCtrl.get('memoryVendor').disable();

    this.subscriptions.add(
      this.gpuCtrl.get('num').valueChanges.subscribe((n: number) => {
        if (n === 0) {
          this.gpuCtrl.get('vendor').disable();
        } else {
          this.gpuCtrl.get('vendor').enable();
        }
      }),
    );

    this.gpuCtrl.get('vendor').valueChanges.subscribe((v: string) => {
      if (this.installedVendors.has('tencent.com/vcuda-core') &&
          this.installedVendors.has('tencent.com/vcuda-memory')) {
        if (v === "tencent.com/vcuda-core") {
          this.gpuCtrl.get('memory').enable();
          this.gpuCtrl.get('memoryVendor').enable();
          this.gpuCtrl.get('memoryVendor').setValue('tencent.com/vcuda-memory');
        } else {
          this.gpuCtrl.get('memory').disable();
          this.gpuCtrl.get('memory').setValue(0);
          this.gpuCtrl.get('memoryVendor').disable();
          this.gpuCtrl.get('memoryVendor').setValue('');
        }
      }
    });

    this.backend.getGPUVendors().subscribe(vendors => {
      this.installedVendors = new Set(vendors);
    });
  }

  // Vendor handling
  public vendorTooltip(vendor: GPUVendor) {
    return !this.installedVendors.has(vendor.limitsKey)
      ? $localize`There are currently no ${vendor.uiName} GPUs in you cluster.`
      : '';
  }

  // Custom Validation
  public getVendorError() {
    const vendorCtrl = this.parentForm.get('gpus').get('vendor');

    if (vendorCtrl.hasError('vendorNullName')) {
      return $localize`You must also specify the GPU Vendor for the assigned GPUs`;
    }
  }

  private vendorWithNum(): ValidatorFn {
    // Make sure that if the user has specified a number of GPUs
    // that they also specify the GPU vendor
    return (control: AbstractControl): { [key: string]: any } => {
      const num = this.parentForm.get('gpus').get('num').value;
      const vendor = this.parentForm.get('gpus').get('vendor').value;

      if (Number(num) !== 0 && vendor === '') {
        return { vendorNullName: true };
      } else {
        return null;
      }
    };
  }
}
