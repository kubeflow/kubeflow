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

  private gpuCtrl: FormGroup;
  public installedVendors = new Set<string>();

  subscriptions = new Subscription();
  maxGPUs = 16;
  gpusCount = ['1', '2', '4', '8'];

  constructor(public backend: JWABackendService) {}

  ngOnInit() {
    this.gpuCtrl = this.parentForm.get('gpus') as FormGroup;

    // Vendor should not be empty if the user selects GPUs num or fractional
    this.parentForm
      .get('gpus')
      .get('vendor')
      .setValidators([this.vendorWithGpuSelection()]);

    // Add validation for fractional GPU
    this.parentForm
      .get('gpus')
      .get('fractional')
      .setValidators([this.fractionalGpuValidator()]);

    // Add validation for fractional memory
    this.parentForm
      .get('gpus')
      .get('fractionalMemory')
      .setValidators([this.fractionalMemoryValidator()]);

    this.subscriptions.add(
      this.gpuCtrl.get('num').valueChanges.subscribe((n: string) => {
        this.updateGpuFieldsState();
      }),
    );

    this.subscriptions.add(
      this.gpuCtrl.get('fractionalType').valueChanges.subscribe((type: string) => {
        this.updateGpuFieldsState();
        this.clearFractionalFields(type);
      }),
    );

    this.subscriptions.add(
      this.gpuCtrl.get('fractional').valueChanges.subscribe(() => {
        this.updateGpuFieldsState();
      }),
    );

    this.subscriptions.add(
      this.gpuCtrl.get('fractionalMemory').valueChanges.subscribe(() => {
        this.updateGpuFieldsState();
      })
    );

    this.subscriptions.add(
      this.backend.getGPUVendors().subscribe(vendors => {
        this.installedVendors = new Set(vendors);
      })
    );
  }

  private clearFractionalFields(selectedType: string) {
    if (selectedType !== 'fraction') {
      this.gpuCtrl.get('fractional').setValue('');
    }
    if (selectedType !== 'memory') {
      this.gpuCtrl.get('fractionalMemory').setValue('');
    }
  }

  private updateGpuFieldsState() {
    const numValue = this.gpuCtrl.get('num').value;
    const fractionalType = this.gpuCtrl.get('fractionalType').value;
    const fractionalValue = this.gpuCtrl.get('fractional').value;
    const fractionalMemoryValue = this.gpuCtrl.get('fractionalMemory').value;

    const hasGpuSelection = numValue !== 'none' ||
      (fractionalType === 'fraction' && fractionalValue && fractionalValue > 0) ||
      (fractionalType === 'memory' && fractionalMemoryValue && fractionalMemoryValue > 0);

    if (hasGpuSelection) {
      this.gpuCtrl.get('vendor').enable();
    } else {
      this.gpuCtrl.get('vendor').disable();
    }
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

  public getFractionalError() {
    const fractionalCtrl = this.parentForm.get('gpus').get('fractional');

    if (fractionalCtrl.hasError('invalidRange')) {
      return $localize`Fractional GPU must be between 0.1 and 1.0`;
    }
    if (fractionalCtrl.hasError('conflictWithNum')) {
      return $localize`Cannot specify both whole number and fractional GPUs`;
    }
  }

  public getFractionalMemoryError() {
    const fractionalMemoryCtrl = this.parentForm.get('gpus').get('fractionalMemory');

    if (fractionalMemoryCtrl.hasError('invalidMemoryRange')) {
      return $localize`GPU memory must be at least 1024 MiB`;
    }
    if (fractionalMemoryCtrl.hasError('conflictWithNum')) {
      return $localize`Cannot specify both whole number and fractional GPUs`;
    }
  }

  private vendorWithGpuSelection(): ValidatorFn {
    // Make sure that if the user has specified a number of GPUs
    // that they also specify the GPU vendor
    return (control: AbstractControl): { [key: string]: any } => {
      const num = this.parentForm.get('gpus').get('num').value;
      const fractionalType = this.parentForm.get('gpus').get('fractionalType').value;
      const fractional = this.parentForm.get('gpus').get('fractional').value;
      const fractionalMemory = this.parentForm.get('gpus').get('fractionalMemory').value;
      const vendor = this.parentForm.get('gpus').get('vendor').value;

      const hasGpuSelection = num !== 'none' ||
        (fractionalType === 'fraction' && fractional && fractional > 0) ||
        (fractionalType === 'memory' && fractionalMemory && fractionalMemory > 0);

      if (hasGpuSelection && vendor === '') {
        return { vendorNullName: true };
      } else {
        return null;
      }
    };
  }

  private fractionalGpuValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const fractionalValue = control.value;
      const numValue = this.parentForm?.get('gpus')?.get('num')?.value;
      const fractionalType = this.parentForm?.get('gpus')?.get('fractionalType')?.value;

      // If fractional value is provided and type is fraction
      if (fractionalValue && fractionalValue > 0 && fractionalType === 'fraction') {
        // Check if value is in valid range
        if (fractionalValue < 0.1 || fractionalValue > 1.0) {
          return { invalidRange: true };
        }
        
        // Check if both num and fractional are specified
        if (numValue && numValue !== 'none') {
          return { conflictWithNum: true };
        }
      }

      return null;
    };
  }

  private fractionalMemoryValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const fractionalMemoryValue = control.value;
      const numValue = this.parentForm?.get('gpus')?.get('num')?.value;
      const fractionalType = this.parentForm?.get('gpus')?.get('fractionalType')?.value;

      // If fractional memory value is provided and type is memory
      if (fractionalMemoryValue && fractionalMemoryValue > 0 && fractionalType === 'memory') {
        // Check if value is in valid range (at least 1GB)
        if (fractionalMemoryValue < 1024) {
          return { invalidMemoryRange: true };
        }
        
        // Check if both num and fractional memory are specified
        if (numValue && numValue !== 'none') {
          return { conflictWithNum: true };
        }
      }

      return null;
    };
  }
}
