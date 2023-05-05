import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import {AllocatableGPU, GPUVendor} from 'src/app/types';
import { JWABackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-form-gpus',
  templateUrl: './form-gpus.component.html',
  styleUrls: ['./form-gpus.component.scss'],
})
export class FormGpusComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() vendors: GPUVendor[];
  private gpuCtrl: FormGroup;
  private allocatable: AllocatableGPU = {};
  private installedVendors = new Set<string>();
  subscriptions = new Subscription();
  gpusCount = [0];

  constructor(public backend: JWABackendService) {}

  ngOnInit() {
    this.gpuCtrl = this.parentForm.get('gpus') as FormGroup;

    // Vendor should not be empty if the user selects GPUs num
    this.parentForm
      .get('gpus')
      .get('vendor')
      .setValidators([this.vendorWithNum()]);

    this.subscriptions.add(
      this.gpuCtrl.get('vendor').valueChanges.subscribe((n: string) => {
        if (n === 'none') {
          this.gpusCount = [0];
        } else {
          this.gpusCount = Array(this.allocatable[n] || 0).fill(0).map((_, index) => index + 1);
        }
      }),
    );

    this.backend.getGPUAllocatable().subscribe(allocatableGPUs => {
      this.allocatable = allocatableGPUs;
      this.installedVendors = new Set(
        Object.entries(allocatableGPUs).filter((entry) => entry[1] > 0).map((entry) => entry[0])
      );
    });
  }

  // Vendor handling
  public vendorTooltip(vendor: GPUVendor) {
    return !this.installedVendors.has(vendor.limitsKey)
      ? $localize`There are currently no ${vendor.uiName} GPUs in your cluster.`
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

      if (num !== 'none' && vendor === '') {
        return { vendorNullName: true };
      } else {
        return null;
      }
    };
  }
}
