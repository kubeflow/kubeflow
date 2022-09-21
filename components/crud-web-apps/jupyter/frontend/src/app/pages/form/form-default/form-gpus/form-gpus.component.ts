import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GPUVendor } from 'src/app/types';
import { JWABackendService } from 'src/app/services/backend.service';

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
  maxGPUs = 16;

  constructor(public backend: JWABackendService) {}

  ngOnInit() {
    this.gpuCtrl = this.parentForm.get('gpus') as FormGroup;

    // Vendor should not be empty if the user selects GPUs num
    this.parentForm
      .get('gpus')
      .get('vendor')
      .setValidators([this.vendorValidator()]);
    this.parentForm
      .get('gpus')
      .get('memoryVendor')
      .setValidators([this.memoryVendorValidator()]);

    this.parentForm.get('gpus').setValue(0);
    this.parentForm.get('memory').setValue(0);

    this.subscriptions.add(
      this.gpuCtrl.get('num').valueChanges.subscribe((n: number) => {
        if (n === 0) {
          this.gpuCtrl.get('vendor').disable();
        } else {
          this.gpuCtrl.get('vendor').enable();
        }
      }),
    );
    this.subscriptions.add(
      this.gpuCtrl.get('memory').valueChanges.subscribe((n: number) => {
        if (n === 0) {
          this.gpuCtrl.get('memoryVendor').disable();
        } else {
          this.gpuCtrl.get('memoryVendor').enable();
        }
      }),
    );

    this.backend.getGPUVendors().subscribe(vendors => {
      this.installedVendors = new Set(vendors);
    });
  }

  // Vendor handling
  public vendorTooltip(vendor: GPUVendor) {
    return !this.installedVendors.has(vendor.limitsKey)
      ? $localize`There are currently no ${vendor.uiName} GPUs/GPU memory in your cluster.`
      : '';
  }

  // Custom Validation
  public getVendorError() {
    const vendorCtrl = this.parentForm.get('gpus').get('vendor');

    if (vendorCtrl.hasError('vendorNullName')) {
      return $localize`You must also specify the GPU Vendor for the assigned GPUs`;
    }

    if (vendorCtrl.hasError('vendorNotEqual')) {
      return $localize`GPU vendor and memory vendor must have same prefix`;
    }
  }

  private vendorValidator(): ValidatorFn {
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

  private memoryVendorValidator(): ValidatorFn {
    // GPU memory and GPU memory vendor must be supplied together and,
    // vendor and memory vendor must have same prefix like:
    // "example.com/gpu-cores" and "example.com/gpu-memory"
    return (control: AbstractControl): { [key: string]: any } => {
      const mem = this.parentForm.get('gpus').get('memory').value;
      const vendor = this.parentForm.get('gpus').get('vendor').value;
      const memvendor = this.parentForm.get('gpus').get('memoryVendor').value;
      let valErrors : { [key: string]: any} = {};
      let hasError = false;

      if (Number(mem) !== 0 && memvendor === '') {
        valErrors['vendorNullName'] = true;
        hasError = true;
      }
      if (vendor.split('/')[0] !== memvendor.split('/')[0]) {
        valErrors['vendorNotEqual'] = true;
        hasError = true;
      }
      if (hasError) {
        return valErrors;
      } else {
        return null;
      }
    };
  }
}
